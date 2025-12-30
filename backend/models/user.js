import mongoose, { Mongoose }  from "mongoose";
const UserSchema=new mongoose.Schema({
    First_name:{type:String,required:true},
    Last_name:{type:String,required:true},
    password:{type:String, required:true},
    Username:{type:String,required:true}

});
const AccountSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    Balance:{type:Number,required:true}
})

const TransactionSchema = new mongoose.Schema({
    fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["sent", "received"], required: true },
    timestamp: { type: Date, default: Date.now },
    description: { type: String, default: "" }
});

const User=mongoose.model("User",UserSchema);
const Account=mongoose.model("Account",AccountSchema);
const Transaction = mongoose.model("Transaction", TransactionSchema);

export {User, Account, Transaction};