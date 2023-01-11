const staffs = require("../db/staffModel");
const otps = require("../db/otpModel");
const nodemailer = require("nodemailer");
const exams = require("../db/examModel");
const bcrypt = require("bcryptjs");

//get courses taken
exports.getStaffCourses = async (req, res) => {
  try {
    const data = await staffs
      .findOne({ staffID: req.params.id })
      .populate("courses");
    console.log(data);
    if (data != null) {
      res.status(200).json({
        data: data.courses,
      });
    } else {
      res.status(400).json({
        message: "Error in getting Courses ",
      });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

//staff

exports.signup = async (req, res) => {
  try {
    console.log("staff signing up");
    //password hashing-bcrypt
    const gensalt = bcrypt.genSaltSync(10);
    const hpass = await bcrypt.hashSync(req.body.password, gensalt);
    req.body.password = hpass;
    const newUser = await staffs.create(req.body);
    if (newUser != null) {
      console.log("new user added but not verified!");
      let otp = Math.floor(Math.random() * 9000);
      console.log("OTP creation...");
      let verifyUser = await otps.create({
        otpID: req.body.staffID,
        otp: otp,
      });
      if (verifyUser != null) {
        main = async () => {
          // SMTP config
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "fastridezapp@gmail.com", // Your Ethereal Email address
              pass: "pmpe uuwx atgd ujoy", // Your Ethereal Email password
            },
          });
          // Send the email
          let info = await transporter.sendMail({
            from: "Project_X",
            to: req.body.email, // Test email address
            subject: "Verification",
            text: "Email Verification",
            html: `
                        <div>
                            <h1>${otp}</h1>
                        </div>
                    `,
          });
        };
        main();
      }
      res.status(200).json({
        message: "signed up",
        staffID: newUser.staffID,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "not signed up",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await staffs.find({}, { _id: 0, __v: 0 });
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(200).json({
        message: "no data",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // const data=await staffs.findOne({email:req.body.email,password:req.body.password},{_id:0,v__:0});
    const user = await staffs.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "No such user" });
    }
    //comparing hashing password with entered password
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        return res.status(200).json({
          auth: 1,
          staffID: user.staffID,
        });
      } else {
        return res.status(200).json({
          auth: 0,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const upstaff = await staffs.findOneAndUpdate(
      { staffID: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (upstaff != null) {
      res.status(200).json({
        status: "success",
        result: upstaff.length,
        data: { upstaff },
      });
    } else {
      res.status(200).json({
        status: "failed",
        data: "no record updated!",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const delStaff = await staffs.deleteOne({ staffId: req.params.id });
    if (delStaff !== 0) {
      res.status(200).json({
        status: "success",
        result: `stafff with ID ${req.params.id} is deleted`,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//email verification
exports.verifyEmailConfirmation = async (req, res) => {
  try {
    console.log(req.body);
    const verified = await otps.findOne({
      otpID: req.body.staffID,
      otp: req.body.otp,
    });
    console.log(verified);
    if (verified != null) {
      const verstaff = await staffs.findOneAndUpdate(
        { staffID: req.body.staffID },
        { verified: true },
        {
          new: true,
          runValidators: true,
        }
      );
      if (verstaff != null) {
        res.status(200).json({
          verified: 1,
        });
      }
    } else {
      res.status(200).json({
        verified: 0,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

//getting created exams
exports.getExams = async (req, res) => {
  try {
    const list = await exams.find({
      staffName: req.params.id1,
      deptID: req.params.id2,
    });
    if (list != null) {
      res.status(200).json(list);
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//pdf files
// exports.file=async (req,res)=>{
//     try{
//         var htmlTopdf=require('html-pdf-node');
//         let options={format:'A4'};
//         let file={content:"<h1>hello world</h1>"};
//         htmlTopdf.generatePdf(file,options).then(async (pdfBuffer)=>{
//             console.log(pdfBuffer);
//             await staffs.findOneAndUpdate({staffID:8},{file:pdfBuffer},{
//                 new:true,
//                 runValidators:true
//             });
//         });
//         const fs=require('fs');
//         const d=await staffs.findOne({staffID:8});
//         res.set("Content-Type",d.file.contentType);
//         var buffer=Buffer.from(d.file,'base64');
//         fs.writeFileSync('./file.pdf',buffer);
//         res.send(d.file);
//     }
//     catch(err){
//         console.log(err);
//     }
// }
