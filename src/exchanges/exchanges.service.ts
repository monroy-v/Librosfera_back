import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exchange, ExchangeStatus } from './entities/exchange.entity';
import { Book } from '../books/entities/book.entity';
import { Invoice } from '../invoices/entities/invoice.entity';

@Injectable()
export class ExchangesService {
  constructor(
    @InjectRepository(Exchange) private exRepo: Repository<Exchange>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Invoice) private invRepo: Repository<Invoice>,
  ) {}

  async requestExchange(requester, bookId: string) {
    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Book not found');
    if (!book.available) throw new BadRequestException('Book not available');
    const ex = this.exRepo.create({ requester, owner: book.owner, requestedBook: book, status: ExchangeStatus.PENDING });
    return this.exRepo.save(ex);
  }

  findAll() {
    return this.exRepo.find();
  }

  async respond(id: string, accept: boolean) {
    const ex = await this.exRepo.findOne({ where: { id } });
    if (!ex) throw new NotFoundException('Exchange not found');
    ex.status = accept ? ExchangeStatus.ACCEPTED : ExchangeStatus.REJECTED;
    if (accept) {
      ex.requestedBook.available = false;
      await this.bookRepo.save(ex.requestedBook);
      // generate invoice minimal
      const inv = this.invRepo.create({ payer: ex.requester, exchange: ex, amount: 0, paid: false });
      ex.invoice = await this.invRepo.save(inv);
    }
    return this.exRepo.save(ex);
  }
}
