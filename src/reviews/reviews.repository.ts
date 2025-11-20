import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';


@Injectable()
export class ReviewsRepository {
constructor(
@InjectRepository(Review)
private readonly repo: Repository<Review>,
) {}


create(data: Partial<Review>) {
return this.repo.create(data);
}


save(review: Review) {
return this.repo.save(review);
}


findByBook(bookId: number) {
return this.repo.find({
where: { book: { id: bookId.toString() } },
relations: ['user', 'book'],
});
}
}