import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Deposit } from "./deposit";
import { Loan } from "./loan";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  username!: string;

  @Column({ unique: true, nullable: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  googleId!: string;

  @Column({ nullable: true })
  walletAddress!: string;

  @OneToMany(() => Deposit, deposit => deposit.user)
  deposits!: Deposit[];

  @OneToMany(() => Loan, loan => loan.user)
  loans!: Loan[];
}
