import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Deposit } from "./deposit";
import { Loan } from "./loan";
import { CreateDateColumn as TypeOrmCreateDateColumn, UpdateDateColumn as TypeOrmUpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ unique: true, nullable: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  googleId!: string;

  @Column({ nullable: true })
  walletAddress!: string;

  @Column({ default: "borrower" }) // "borrower" or "lender"
  role!: string;

  @OneToMany(() => Deposit, deposit => deposit.user)
  deposits!: Deposit[];

  @OneToMany(() => Loan, loan => loan.user)
  loans!: Loan[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
function CreateDateColumn(): PropertyDecorator {
  return TypeOrmCreateDateColumn();
}

function UpdateDateColumn(): PropertyDecorator {
  return TypeOrmUpdateDateColumn();
}

