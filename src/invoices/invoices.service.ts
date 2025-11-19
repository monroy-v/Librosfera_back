import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(@InjectRepository(Invoice) private invRepo: Repository<Invoice>) {}

  create(invoice: Partial<Invoice>) {
    const i = this.invRepo.create(invoice);
    return this.invRepo.save(i);
  }

  findAll() {
    return this.invRepo.find();
  }
}
