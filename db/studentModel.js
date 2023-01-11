const schema=require('./studentSchema');
const mongoose=require('mongoose');

const students=mongoose.model("students",schema);

module.exports=students;