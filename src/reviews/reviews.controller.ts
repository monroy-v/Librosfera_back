import { Controller, Post, Body, UseGuards, Req, Get, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: any, @Req() req: any) {
    return this.reviewsService.create(dto, req.user);
  }

  @Get('book/:id')
  findByBook(@Param('id') id: string) {
    return this.reviewsService.findByBook(id);
  }
}
