import express from "express";
import { json } from "body-parser";
import { createConnection } from "typeorm";
import depositRoutes from "./router/deposit";
import loanRoutes from "./router/loan";

const app = express();
const port = 3000;

// Middleware
app.use(json());

// Database connection
createConnection().then(() => {
  console.log("Connected to PostgreSQL");
}).catch((error) => {
  console.error("Error connecting to PostgreSQL", error);
});

// Routes
app.use("/api/deposit", depositRoutes);
app.use("/api/loan", loanRoutes);

// Basic endpoint to check server
app.get("/", (req, res) => {
  res.send("Lending Protocol API is running");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
