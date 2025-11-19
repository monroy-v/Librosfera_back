import { IsInt, IsNotEmpty, Min, Max, IsOptional, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  bookId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  comment?: string;
}
