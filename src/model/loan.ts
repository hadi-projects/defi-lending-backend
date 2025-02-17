import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { CreateDateColumn as TypeOrmCreateDateColumn } from "typeorm";

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("decimal")
  amount!: number;

  @ManyToOne(() => User)
  borrower!: User;

  @Column("decimal")
  collateralAmount!: number;

  @ManyToOne(() => User, user => user.loans)
  user!: User;

  @Column()
  interestRate!: number;

  @Column({ default: "pending" }) // "pending", "approved", "repaid", "liquidated"
  status!: string;

  @Column()
  dueDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

}
function CreateDateColumn(): PropertyDecorator {
    return TypeOrmCreateDateColumn();
}

