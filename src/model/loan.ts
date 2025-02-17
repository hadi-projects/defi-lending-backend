import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("decimal")
  amount!: number;

  @Column("decimal")
  collateralAmount!: number;

  @ManyToOne(() => User, user => user.loans)
  user!: User;

  @Column()
  interestRate!: number;

  @Column()
  dueDate!: Date;

  @Column()
  status!: string;  // active, repaid, defaulted
}
