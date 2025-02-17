import express from "express";
import { json } from "body-parser";
import { createConnection } from "typeorm";
import session from "express-session";
import passport from "./config/auth";
import authRoutes from "./router/auth";
import depositRoutes from "./router/deposit";
import loanRoutes from "./router/loan";

const app = express();
const port = process.env.PORT || 3030;

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

// Database connection
createConnection().then(() => {
  console.log("Connected to PostgreSQL");
}).catch((error) => {
  console.error("Error connecting to PostgreSQL", error);
});

// Routes
app.use("/auth", authRoutes);
app.use("/api/deposit", depositRoutes);
app.use("/api/loan", loanRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
