const exams=require('../db/examModel');
const students=require('../db/studentModel');
const notifications=require('../db/notifyModel');
const fs=require('fs');
const staffs = require('../db/staffModel');

exports.createExam=async (req,res)=>{
    try{
        const data=await exams.create(req.body);
        await staffs.updateOne({staffID:req.body.staffID},{$push:{exams:req.body.examID}});
        await notifications.create({
            subjectName:req.body.subjectName,
            examDate:req.body.examDate,
            session:req.body.session,
            createdBy:req.body.staffName,
            deptID:req.body.deptID
        });
        if(data!=null){
            // const list=await students.find({},{_id:0,__v:0});
            // list.forEach((student)=>{
            //     if(student.deptID===req.body.deptID)
            //     {
            //         console.log("hallticket creating...");
            //         updateHalltickets(student,req.body);
            //     }
            // });
            res.status(200).json(data);
        }
        else{
            res.status(200).json({
                message:"no data"
            });
        }
    }
    catch(err){
        res.status(404).json({
            status:"fail",
            message:err
        })
    }
}

//hallticket creation
const updateHalltickets=async (student,data)=>{
    try{
        var htmlTopdf=require('html-pdf-node');
        let options={format:'A4'};
        let content=`<style>
            table{
                width:100%
            }
            th, td, tr {
            border-bottom: 1px solid #ddd;
            padding: 7px;
            text-align: center;
        }
        </style>`;
        content+="<h1>HallTicket</h1><hr/>";
        content+="<h3>Name:&emsp;&emsp;"+student.name+"</h3>";
        content+="<h3>Roll Number:&emsp;&emsp;"+student.rollNo+"</h3>";
        content+="<h3>Department:&emsp;&emsp;"+student.deptName+"</h3><hr/>";
        content+=`<table class="myOtherTable"><thead><tr><th>Subject Name</th><th>Subject Code</th><th>Date of Exam</th><th>Session</th><th>Signature</th></tr></thead><tbody>`;

        const list=await exams.find({},{_id:0,__v:0});
        list.forEach((exam)=>{
            if(exam.deptID===student.deptID){
                content+="<tr><td>"+exam.subjectName+"</td><td>"+exam.subjectCode+"</td><td>"
                +getDate(exam.examDate)+"</td><td>"+exam.session+"</td><td></td></tr>";
            }
        });
        content+="</tbody></table></hr/>"
        console.log(content);
        let file={content:content};
        htmlTopdf.generatePdf(file,options).then(async (pdfBuffer)=>{
            console.log(pdfBuffer);
            const a=await students.findOneAndUpdate({rollNo:student.rollNo},{hallTicket:pdfBuffer},{
                new:true,
                runValidators:true
            });
            //test file for pdf file generation
            var buffer=Buffer.from(pdfBuffer,'base64');
            fs.writeFileSync('./file.pdf',buffer);
        });
    }
    catch(err){
        console.log(err);
    }
}

//dd-mm-yyyy format change
const getDate = (str) => {
    if (str !== undefined) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [day,mnth,date.getFullYear()].join("-");
    } else {
      return "";
    }
  }

//update exam details
exports.updateExam=async (req,res)=>{
    try{
        const upExam=await exams.findOneAndUpdate({examID:req.params.id1},req.body,{
            new:true,
            runValidators:true
        });
        if(upExam!=null){
            res.status(200).json({
                status:"success"
            });
        }
        else{
            res.status(200).json({
                status:"no record to update"
            });
        }
    }
    catch(err){
        res.status(404).json({
            status:"failed",
            message:err
        });
    }
}

//delete exam
exports.deleteExam=async (req,res)=>{
    try{
        console.log("deleting...");
        const delExam=await exams.findOneAndDelete({examID:req.params.id});
        if(delExam!=null){
            res.status(200).json({
                status:"success"
            });
        }
        else{
            res.status(200).json({
                status:"no record to delete"
            });
        }
    }
    catch(err){
        res.status(404).json({
            status:"failed",
            message:err
        });
    }
}
