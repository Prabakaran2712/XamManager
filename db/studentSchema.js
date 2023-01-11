const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Required Field']
    },
    rollNo:{
        type:String,
        required:[true,'Required Field']
    },
    deptID:{
        type:String,
        required:[true,'Required Field']
    },
    yearOfPO:{
        type:Number,
        required:[true,'Required Field']
    },
    cgpa:{
        type:Number,
        default:0
    },
    hallTicket:{
        type:Buffer,
        default:null
    },
    verified:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:[true,'Required Field']
    },
    password:{
        type:String,
        required:[true,'Required Field']
    }
});

module.exports=schema;