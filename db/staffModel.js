const schema=require('./staffSchema');
const mongoose=require('mongoose');

const staffs=mongoose.model("staffs",schema);

module.exports=staffs;