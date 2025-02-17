import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Deposit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("decimal")
  amount!: number;

  @ManyToOne(() => User, user => user.deposits)
  user!: User;

  @Column()
  date!: Date;
}
