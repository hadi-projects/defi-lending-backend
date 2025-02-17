import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../model/user";
import { Loan } from "../model/loan";

const userRepo = AppDataSource.getRepository(User);
const loanRepo = AppDataSource.getRepository(Loan);

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const users = await userRepo.find();
    res.json(users);
  }

  static async getUserById(req: Request, res: Response): Promise<void>  {
    const user = await userRepo.findOneBy({ id: parseInt(req.params.id) });
    
    if (!user) 
    {
      res.status(404).json({ message: "User not found" });
      return 
    }
    
    res.json(user);
  }

  static async createUser(req: Request, res: Response) {
    const { email, name, googleId, role } = req.body;
    const user = await userRepo.findOne({
      where: {email: email},
    });
    if (user) {
      res.status(404).json({ message: "User already exist." });
      return 
    } 
    const newUser = userRepo.create({ email, name, googleId, role });
    await userRepo.save(newUser);
    res.status(201).json(newUser);
  }
  
  static async deleteUser(req: Request, res: Response) {
    const user = await userRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return 
    } 
    await userRepo.remove(user)
    res.status(404).json({ message: "User deleted." });
  }
}
