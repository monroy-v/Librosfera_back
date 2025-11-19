import { IsUUID } from 'class-validator';

export class CreateExchangeDto {
  @IsUUID()
  bookId: string;
}
