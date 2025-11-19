import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepo: Repository<Book>) {}

  create(dto: CreateBookDto, owner) {
    const book = this.booksRepo.create({ ...dto, owner });
    return this.booksRepo.save(book);
  }

  findAll() {
    return this.booksRepo.find();
  }

  async findOne(id: string) {
    const b = await this.booksRepo.findOne({ where: { id } });
    if (!b) throw new NotFoundException('Book not found');
    return b;
  }

  async remove(id: string, user) {
    const book = await this.findOne(id);
    if (book.owner.id !== user.id) throw new ForbiddenException('Not owner');
    return this.booksRepo.remove(book);
  }
}
