import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Exchange } from '../../exchanges/entities/exchange.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (u) => u.invoices, { eager: true })
  payer: User;

  @OneToOne(() => Exchange, (e) => e.invoice)
  exchange: Exchange;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  amount: number;

  @Column({ default: false })
  paid: boolean;
}
