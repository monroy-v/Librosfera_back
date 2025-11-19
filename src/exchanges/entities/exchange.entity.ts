import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';

export enum ExchangeStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  SENT = 'sent',
  COMPLETED = 'completed'
}

@Entity()
export class Exchange {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true })
  requester: User;

  @ManyToOne(() => User, { eager: true })
  owner: User;

  @ManyToOne(() => Book, { eager: true })
  requestedBook: Book;

  @Column({ type: 'enum', enum: ExchangeStatus, default: ExchangeStatus.PENDING })
  status: ExchangeStatus;

  @OneToOne(() => Invoice, (i) => i.exchange, { cascade: true })
  @JoinColumn()
  invoice: Invoice;
}
