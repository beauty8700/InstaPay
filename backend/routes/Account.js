import express from "express";
import mongoose from "mongoose";
import { User, Account, Transaction } from "../models/user.js";
import { Notification } from "../models/notification.js";

import { auth } from "../middleware/auth.js";

const routers = express.Router();

routers.get("/balance", auth, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.user });

    return res.json({
      balance: account ? account.Balance : 0
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

routers.post("/deposit", auth, async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const account = await Account.findOne({ userId: req.user });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    account.Balance += amount;
    await account.save();

    await Notification.create({
  userId: req.user,
  title: "Money Added",
  message: `₹${amount} added to your wallet`,
  type: "deposit"
});


    res.json({
      message: "Money added successfully",
      balance: account.Balance
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


routers.post("/transfer", auth, async (req, res) => {
  console.log("TRANSFER REQUEST:", req.body);
  console.log("USER ID:", req.user);

  try {
    const amount = Number(req.body.amount);
    const to = req.body.to;

    console.log("Amount:", amount, "To:", to);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const fromAccount = await Account.findOne({ userId: req.user });
    console.log("From Account:", fromAccount);

    if (!fromAccount || fromAccount.Balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toUser = await User.findOne({ Username: to });
    console.log("To User:", toUser);

    if (!toUser) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    const fromUser = await User.findById(req.user);
    console.log("From User:", fromUser);

    const toAccount = await Account.findOne({ userId: toUser._id });
    console.log("To Account:", toAccount);

    if (!toAccount) {
      return res.status(404).json({ message: "Receiver account not found" });
    }

    fromAccount.Balance -= amount;
    toAccount.Balance += amount;

    await fromAccount.save();
    await toAccount.save();

    await Transaction.create({
      fromUserId: req.user,
      toUserId: toUser._id,
      amount: amount,
      type: "sent",
      description: `Sent to ${toUser.First_name} ${toUser.Last_name}`
    });

    await Transaction.create({
      fromUserId: toUser._id,
      toUserId: req.user,
      amount: amount,
      type: "received",
      description: `Received from ${fromUser.First_name} ${fromUser.Last_name}`
    });

    // Sender notification
await Notification.create({
  userId: req.user,
  title: "Money Sent",
  message: `₹${amount} sent to ${toUser.First_name}`,
  type: "sent"
});

// Receiver notification
await Notification.create({
  userId: toUser._id,
  title: "Money Received",
  message: `₹${amount} received from ${fromUser.First_name}`,
  type: "received"
});


    res.json({ message: "Transfer successful" });

  } catch (err) {
    console.error("Transfer error:", err);
    res.status(500).json({ message: "Transfer failed" });
  }


});

routers.get("/search", auth, async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || query.length < 2) {
      return res.json({ users: [] });
    }

    const users = await User.find({
      $and: [
        { _id: { $ne: req.user } }, 
        {
          $or: [
            { First_name: { $regex: query, $options: 'i' } },
            { Last_name: { $regex: query, $options: 'i' } },
            { Username: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    }).select('First_name Last_name Username').limit(10);

    const formattedUsers = users.map(user => ({
      id: user._id,
      name: `${user.First_name} ${user.Last_name}`,
      username: user.Username,
      type: 'user'
    }));

    res.json({ users: formattedUsers });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed" });
  }
});


routers.get("/transactions", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { fromUserId: req.user },
        { toUserId: req.user }
      ]
    })
    .populate('fromUserId', 'First_name Last_name Username')
    .populate('toUserId', 'First_name Last_name Username')
    .sort({ timestamp: -1 })
    .limit(50);

    console.log(`Found ${transactions.length} transactions for user ${req.user}`);

    const validTransactions = transactions.filter(transaction =>
      transaction.fromUserId && transaction.toUserId
    );

    console.log(`Valid transactions after filtering: ${validTransactions.length}`);

    const formattedTransactions = validTransactions.map(transaction => ({
      id: transaction._id,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      timestamp: transaction.timestamp,
      otherParty: transaction.fromUserId._id.toString() === req.user.toString()
        ? {
            name: `${transaction.toUserId.First_name} ${transaction.toUserId.Last_name}`,
            username: transaction.toUserId.Username
          }
        : {
            name: `${transaction.fromUserId.First_name} ${transaction.fromUserId.Last_name}`,
            username: transaction.fromUserId.Username
          }
    }));

    res.json({ transactions: formattedTransactions });
  } catch (err) {
    console.error("Transaction history error:", err);
    res.status(500).json({ message: "Failed to fetch transaction history" });
  }
});

routers.get("/notifications", auth, async (req, res) => {
  const notifications = await Notification.find({ userId: req.user })
    .sort({ createdAt: -1 });

  res.json({ notifications });
});


export { routers };
