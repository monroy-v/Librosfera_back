import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';


@Injectable()
export class InvoicesRepository {
constructor(
@InjectRepository(Invoice)
private readonly repo: Repository<Invoice>,
) {}


create(data: Partial<Invoice>) {
return this.repo.create(data);
}


save(invoice: Invoice) {
return this.repo.save(invoice);
}


findAll() {
return this.repo.find({ relations: ['user', 'exchange'] });
}


findById(id: number) {
return this.repo.findOne({
where: { id : id.toString() },
relations: ['user', 'exchange'],
});
}
}