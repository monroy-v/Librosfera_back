import { Controller, Get, Post, Body, UseGuards, Req, Patch, Param } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('exchanges')
export class ExchangesController {
  constructor(private exService: ExchangesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  request(@Req() req: any, @Body() dto: any) {
    return this.exService.requestExchange(req.user, dto.bookId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.exService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/respond')
  respond(@Param('id') id: string, @Body('accept') accept: boolean) {
    return this.exService.respond(id, accept);
  }
}
