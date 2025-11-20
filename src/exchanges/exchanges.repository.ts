import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exchange } from './entities/exchange.entity';


@Injectable()
export class ExchangesRepository {
constructor(
@InjectRepository(Exchange)
private readonly repo: Repository<Exchange>,
) {}


create(data: Partial<Exchange>) {
return this.repo.create(data);
}


save(exchange: Exchange) {
return this.repo.save(exchange);
}


findAll() {
return this.repo.find({ relations: ['requester', 'owner', 'book'] });
}


findById(id: number) {
return this.repo.findOne({
where: { id: id.toString() },
relations: ['requester', 'owner', 'book'],
});
}
}