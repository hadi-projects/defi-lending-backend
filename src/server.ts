import express from "express";
import { json } from "body-parser";
import session from "express-session";
import passport from "./config/auth";
import authRoutes from "./router/auth";
import depositRoutes from "./router/deposit";
import loanRoutes from "./router/loan";
import userRoutes from "./router/user"; // FIXED: Import dari user, bukan loan
import { AppDataSource } from "./data-source";

const app = express();
const port = process.env.PORT || 3030; // FIXED: Default ke 3030 jika tidak ada .env

// Middleware
app.use(json());
app.use(
  session({
    secret: process.env.JWT_SECRET || "default_secret", // FIXED: Tambahkan fallback jika .env tidak diatur
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Inisialisasi Database
AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected successfully!");

    // Routes
    app.use("/auth", authRoutes);
    app.use("/api/deposit", depositRoutes);
    app.use("/api/loan", loanRoutes);
    app.use("/api/users", userRoutes);

    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  })
  .catch((error) => console.error("❌ Database connection error:", error));
