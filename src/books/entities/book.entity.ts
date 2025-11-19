import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Exchange } from '../../exchanges/entities/exchange.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  isbn: string;

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => User, (user) => user.books, { eager: true })
  owner: User;

  @OneToMany(() => Review, (r) => r.book)
  reviews: Review[];

  @OneToMany(() => Exchange, (e) => e.requestedBook)
  exchanges: Exchange[];
}
