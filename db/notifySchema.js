const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    deptID:{
        type:String,
        required:[true,'Required Field']
    },
    subjectName:{
        type:String,
        required:[true,'Required Field']
    },
    examDate:{
        type:Date,
        required:[true,'Required Field']
    },
    session:{
        type:String,
        required:[true,'Required Field']
    },
    createdBy:{
        type:String,
        required:[true,'Required Field']
    },
    createdAt:{
        type:Date,
        expires:'1440m',
        default:Date.now
    }
});

module.exports=schema;