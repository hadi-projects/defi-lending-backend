import express from "express";
import passport from "../config/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    res.redirect(`http://localhost:3030/auth/success?token=${token}`);
  }
);

// Endpoint to check authentication status
router.get("/success", (req, res) => {
  res.json({ message: "Authentication successful!", token: req.query.token });
});

export default router;
