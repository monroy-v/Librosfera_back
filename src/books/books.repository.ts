import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';


@Injectable()
export class BooksRepository {
constructor(
@InjectRepository(Book)
private readonly repo: Repository<Book>,
) {}


create(data: Partial<Book>) {
return this.repo.create(data);
}


save(book: Book) {
return this.repo.save(book);
}


findAll() {
return this.repo.find({ relations: ['owner'] });
}


findById(id: string) {
return this.repo.findOne({ where: { id }, relations: ['owner'] });
}


delete(id: string) {
return this.repo.delete(id);
}
}