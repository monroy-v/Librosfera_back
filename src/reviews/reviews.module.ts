import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { Book } from '../books/entities/book.entity';
import { ReviewsRepository } from './reviews.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Book])],
  providers: [ReviewsService,ReviewsRepository],
  controllers: [ReviewsController],
  exports: [ReviewsService,ReviewsRepository,TypeOrmModule],
})
export class ReviewsModule {}
