import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { Exchange } from '../../exchanges/entities/exchange.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
import { Review } from '../../reviews/entities/review.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Book, (book) => book.owner)
  books: Book[];

  @OneToMany(() => Review, (r) => r.user)
  reviews: Review[];

  @OneToMany(() => Exchange, (ex) => ex.requester)
  requests: Exchange[];

  @OneToMany(() => Invoice, (i) => i.payer)
  invoices: Invoice[];
}
