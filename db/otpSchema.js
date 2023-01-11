const mongoose=require('mongoose');

const otp=new mongoose.Schema({
    otpID:{
        type:String,
        required:[true,'Required Field']
    },
    otp:{
        type:Number,
        required:[true,'Required Field']
    },
    createdAt: {
        type: Date, 
        expires: '5m', 
        default: Date.now 
    }
    }
);

module.exports=otp;