const schema=require('./otpSchema');
const mongoose=require('mongoose');

const otps=mongoose.model("otps",schema);

module.exports=otps;