import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User, Account } from "../models/user.js";
import { auth, Sec } from "../middleware/auth.js";
import { z } from "zod";

const router = express.Router();

const SignUpSchema = z.object({
  First_name: z.string().min(3),
  Last_name: z.string().min(3),
  Username: z.string().email(),
  password: z.string().min(8)
});


const LoginSchema = z.object({
  Username: z.string().email(),
  password: z.string().min(8)
});


router.post("/signUp", async (req, res) => {
  const validation = SignUpSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid signup data",
      errors: validation.error.errors
    });
  }

  const { First_name, Last_name, Username, password } = req.body;

  const existingUser = await User.findOne({ Username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    First_name,
    Last_name,
    Username,
    password: hashedPassword
  });

  await Account.create({
    userId: user._id,
    Balance: 0
  });

  const token = jwt.sign({ id: user._id }, Sec, { expiresIn: "1h" });

  res.json({ message: "Signup successful", token });
});

router.post("/login", async (req, res) => {
  console.log("LOGIN HIT");
  console.log(req.body);
  const validation = LoginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid login data",
      errors: validation.error.errors
    });
  }

  const { Username, password } = req.body;

  const user = await User.findOne({ Username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, Sec, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});

router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password are required" });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long" });
  }

  const user = await User.findOne({ Username: email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(user._id, { password: hashedPassword });

  res.json({ message: "Password reset successful" });
});

export { router };
