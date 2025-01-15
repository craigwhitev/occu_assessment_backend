import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatus } from '../enums/product-status.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productName: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: 'Draft',
  })
  status: ProductStatus;

  @Column()
  category: string;

  @Column()
  type: string;

  @Column()
  vendor: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
