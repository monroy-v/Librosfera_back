import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => User, (u) => u.reviews, { eager: true })
  user: User;

  @ManyToOne(() => Book, (b) => b.reviews, { eager: true })
  book: Book;
}
