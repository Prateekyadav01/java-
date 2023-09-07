const mongoose = require("mongoose");


const userInfo = new mongoose.Schema(
    {
        firstName : {
            type:String,
            required:true,
            trim:true,
        },
        lastName:{
            type:String,
            required:true,
            trim:true,
        },
        Street:{
            type:String,
            trim:true,
        },
        Address:{
            type:String,
            trim:true,
        },
        City:{
            type:String,
            trim:true,
        },
        State:{
            type:String,
            trim:true,
        },
        email:{
            type:String,
            trim:true,
        },
        phoneNumber:{
            type:Number,
        },
        password:{
            type:String,
            required:true,
        },
    }
)

module.exports = mongoose.model("User", userInfo);