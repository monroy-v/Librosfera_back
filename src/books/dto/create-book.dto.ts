import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  isbn?: string;
}
