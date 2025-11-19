import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangesService } from './exchanges.service';
import { ExchangesController } from './exchanges.controller';
import { Exchange } from './entities/exchange.entity';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exchange, Book])],
  providers: [ExchangesService],
  controllers: [ExchangesController],
})
export class ExchangesModule {}
