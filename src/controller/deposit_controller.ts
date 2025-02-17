import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Deposit } from "../model/deposit";
import { User } from "../model/user";

export class DepositController {
  static async createDeposit(req: Request, res: Response, next: NextFunction) : Promise<void> {
    const { userId } = req.params;
    const { amount } = req.body;

    try {
      const user = await getRepository(User).findOne({ where: { id: Number(userId) } });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const deposit = new Deposit();
      deposit.amount = amount;
      deposit.user = user;
      deposit.date = new Date();

      await getRepository(Deposit).save(deposit);
      user.deposits.push(deposit);
      await getRepository(User).save(user);

      res.status(201).json({ message: "Deposit successful", deposit });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      res.status(500).json({ message: "Error making deposit", error: errorMessage });
    }
  }
}
