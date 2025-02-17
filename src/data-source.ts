import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true, // Set false in production
  logging: false,
  entities: [path.join(__dirname, "model", "*.ts")], // FIXED: Path absolut untuk entitas
//   migrations: [path.join(__dirname, "migrations", "*.ts")], // FIXED: Path absolut untuk migrasi
  subscribers: [],
});
