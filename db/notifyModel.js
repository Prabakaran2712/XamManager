const schema=require('./notifySchema');
const mongoose=require('mongoose');

const notifications=mongoose.model("notifications",schema);

module.exports=notifications;