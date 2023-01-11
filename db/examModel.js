const schema=require('./examSchema');
const mongoose=require('mongoose');

const exams=mongoose.model("exams",schema);

module.exports=exams;