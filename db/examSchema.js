const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    examID:{
        type:String,
        unique:true,
        required:[true,'Required Field']
    },
    staffName:{
        type:String,
        required:[true,'Required Field']
    },
    staffID:{
        type:String,
        required:[true,'Required Field']
    },
    deptID:{
        type:String,
        required:[true,'Required Field']
    },
    subjectName:{
        type:String,
        required:[true,"Required Field"]
    },
    subjectCode:{
        type:String,
        required:[true,"Required Field"]
    },
    examDate:{
        type:Date,
        required:[true,'Required Field']
    },
    venue:{
        type:String,
        required:[true,'Required Field']
    },
    timing:{
        type:String,
        required:[true,'Required Field']
    },
    session:{
        type:String,
        required:[true,'Required Field']
    },
    mode:{
        type:String,
        required:[true,'Required Field']
    }
});

module.exports=schema;