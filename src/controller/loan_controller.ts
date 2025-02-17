import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Loan } from "../model/loan";
import { User } from "../model/user";

export class LoanController {
    public static async createLoan(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const { amount, collateralAmount, interestRate, dueDate } = req.body;

    try {
      const user = await getRepository(User).findOne({ where: { id: Number(userId) } });
      if (!user) {
         res.status(404).json({ message: "User not found" });
         return;
      }

      const loan = new Loan();
      loan.amount = amount;
      loan.collateralAmount = collateralAmount;
      loan.user = user;
      loan.interestRate = interestRate;
      loan.dueDate = new Date(dueDate);
      loan.status = "active";

      await getRepository(Loan).save(loan);
      user.loans.push(loan);
      await getRepository(User).save(user);

      res.status(201).json({ message: "Loan created successfully", loan });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      res.status(500).json({ message: "Error creating loan", error: errorMessage });
    }
  }
}
