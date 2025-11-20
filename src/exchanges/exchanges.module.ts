import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangesService } from './exchanges.service';
import { ExchangesController } from './exchanges.controller';
import { Exchange } from './entities/exchange.entity';
import { Book } from '../books/entities/book.entity';
import { ExchangesRepository } from './exchanges.repository';
import { InvoicesModule } from '../invoices/invoices.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exchange, Book]),InvoicesModule],
  providers: [ExchangesService,ExchangesRepository],
  controllers: [ExchangesController],
  exports: [ExchangesService,ExchangesRepository,TypeOrmModule],
})
export class ExchangesModule {}
