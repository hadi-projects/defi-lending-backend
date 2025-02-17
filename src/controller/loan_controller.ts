import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Loan } from "../model/loan";
import { User } from "../model/user";
import { AppDataSource } from "../data-source";

const userRepo = AppDataSource.getRepository(User);
const loanRepo = AppDataSource.getRepository(Loan);

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
  static async getAllLoans(req: Request, res: Response) :Promise<void>  {
    const loans = await loanRepo.find({ relations: ["borrower"] });
    res.json(loans);
  }

  static async requestLoan(req: Request, res: Response): Promise<void>  {
    const { borrowerId, amount, interestRate, durationDays } = req.body;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + durationDays);
    const borrower = await userRepo.findOneBy({ id: borrowerId });

    if (!borrower) return 
    res.status(404).json({ message: "User not found" });

    const newLoan = loanRepo.create({
      borrower,
      amount,
      interestRate,
      dueDate,
      status: "pending",
    });

    await loanRepo.save(newLoan);
    res.status(201).json(newLoan);
  }

  static async approveLoan(req: Request, res: Response) : Promise<void> {
    const loan = await loanRepo.findOneBy({ id: parseInt(req.params.id) });

    if (!loan) return
     res.status(404).json({ message: "Loan not found" });

    loan.status = "approved";
    await loanRepo.save(loan);
    res.json({ message: "Loan approved", loan });
  }

  static async repayLoan(req: Request, res: Response) : Promise<void> {
    const loan = await loanRepo.findOneBy({ id: parseInt(req.params.id) });

    if (!loan) return 
    res.status(404).json({ message: "Loan not found" });

    loan.status = "repaid";
    await loanRepo.save(loan);
    res.json({ message: "Loan repaid", loan });
  }
}
