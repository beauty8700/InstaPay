import express from "express";
import mongoose from "mongoose";
const conn=async()=>{
try{
    const url="mongodb://localhost:27017/paytm";
    const con=await mongoose.connect(url);
    if(con){
        console.log("Database connected");
    }
    else{
        console.log("error in connection");
    }

}
catch(err){
    console.log(err);

}}
export default conn;