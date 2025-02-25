import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {User,Account} from "../models/user.js";
import { auth, Sec } from "../middleware/auth.js";
import { z } from "zod";

const routers = express.Router();
routers.get("/balance",async(req,res)=>{
    const account=await Account.findOne({userId:req.user});
    if(account){
        res.json({balance:account.Balance});
    }
    else{
        res.json({message:"Account not found"});
    }
});
routers.post("/deposit",async(req,res)=>{
    const account=await Account.findOne({userId:req.user});
    if(account){
        account.Balance+=req.body.amount;
        await account.save();
        res.json({message:"Amount deposited successfully"});
    }
    else{
        res.json({message:"Account not found"});
    }
});

async function transfer(req) {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        console.log("Insufficient balance")
        return;
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        console.log("Invalid account")
        return;
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    console.log("done")
}
export {routers};