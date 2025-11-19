import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private revRepo: Repository<Review>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
  ) {}

  async create(dto, user) {
    const book = await this.bookRepo.findOne({ where: { id: dto.bookId } });
    if (!book) throw new NotFoundException('Book not found');
    const r = this.revRepo.create({ rating: dto.rating, comment: dto.comment, user, book });
    return this.revRepo.save(r);
  }

  findByBook(bookId: string) {
    return this.revRepo.find({ where: { book: { id: bookId } } });
  }
}
