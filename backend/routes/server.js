import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {User,Account} from "../models/user.js";
import { auth, Sec } from "../middleware/auth.js";
import { z } from "zod";

const router = express.Router();

const UserSc = z.object({
  First_name: z.string().min(4),
  Last_name: z.string().min(3),
  password: z.string().min(8).max(20),
  Username: z.string().email(), 
});

router.post("/signUp", async (req, res) => {
  try {
    const body = req.body;
    const validation = UserSc.safeParse(body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid data", errors: validation.error.errors });
    }

    const existingUser = await User.findOne({ Username: body.Username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;

    const dbUser = await User.create(body);
    const userid=dbUser.id;
    await Account.create({userId:userid,Balance:0});// create new account for user 


    const token = jwt.sign({ id: dbUser._id }, Sec, { expiresIn: "1h" });

    res.json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const validation = UserSc.safeParse(body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid data", errors: validation.error.errors });
    }

    const user = await User.findOne({ Username: body.Username });
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, Sec, { expiresIn: "1h" });

    res.json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const UserUp = z.object({
  First_name: z.string().min(4),
  Last_name: z.string().min(3),
  password: z.string().min(8).max(20),
});

router.post("/update", auth, async (req, res) => {
  try {
    const body = req.body;
    const validation = UserUp.safeParse(body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid data", errors: validation.error.errors });
    }

    // Hash new password
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    await User.updateOne({ _id: req.user }, { $set: body });

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/bulk", auth, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      $or: [
        { First_name: { $regex: filter, $options: "i" } },
        { Last_name: { $regex: filter, $options: "i" } },
      ],
    });

    res.json({
      users: users.map(user => ({
        username: user.Username,
        firstName: user.First_name,
        lastName: user.Last_name,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export { router };
