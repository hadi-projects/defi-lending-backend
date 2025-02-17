import express from "express";
import { json } from "body-parser";
import { createConnection } from "typeorm";
import session from "express-session";
import passport from "./config/auth";
import authRoutes from "./router/auth";
import depositRoutes from "./router/deposit";
import loanRoutes from "./router/loan";
import { AppDataSource } from "./data-source";

const app = express();
const port = process.env.PORT;

// Middleware
app.use(json());
app.use(
  session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use("/auth", authRoutes);
app.use("/api/deposit", depositRoutes);
app.use("/api/loan", loanRoutes);


AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, () => console.log("Server running on port 3030"));
  })
  .catch((error) => console.log("Database connection error:", error));
