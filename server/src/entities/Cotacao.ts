import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity('cotacoes')
export class Cotacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  productName: string;

  @Column('float')
  productPrice: number;

  @Column()
  paymentType: 'mensal' | 'trimestral' | 'anual';

  @Column('float')
  portionPrice: number;
}