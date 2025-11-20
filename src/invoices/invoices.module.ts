import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice } from './entities/invoice.entity';
import { Exchange } from '../exchanges/entities/exchange.entity';
import { InvoicesRepository } from './invoices.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Exchange])],
  providers: [InvoicesService,InvoicesRepository],
  controllers: [InvoicesController],
  exports: [InvoicesService,InvoicesRepository,TypeOrmModule],
})
export class InvoicesModule {}
