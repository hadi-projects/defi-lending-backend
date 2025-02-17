import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Deposit } from "./deposit";
import { Loan } from "./loan";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column({ unique: true })
  walletAddress!: string;

  @OneToMany(() => Deposit, deposit => deposit.user)
  deposits!: Deposit[];

  @OneToMany(() => Loan, loan => loan.user)
  loans!: Loan[];
}
