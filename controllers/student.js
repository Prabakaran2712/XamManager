const students = require("../db/studentModel");
const otps = require("../db/otpModel");
const notifications = require("../db/notifyModel");
const nodemailer = require("nodemailer");
const exams = require("../db/examModel");
const bcrypt = require("bcryptjs");

//student

exports.signup = async (req, res) => {
  try {
    console.log("student signing up");
    //password hashing-bcrypt
    const gensalt = bcrypt.genSaltSync(10);
    const hpass = await bcrypt.hashSync(req.body.password, gensalt);
    req.body.password = hpass;
    const newUser = await students.create(req.body);
    if (newUser != null) {
      console.log("new user added but not verified!");
      let otp = Math.floor(Math.random() * 9000);
      console.log("OTP creation...");
      let verifyUser = await otps.create({
        otpID: req.body.rollNo,
        otp: otp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 360000,
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
            subject: "Email Verification",
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
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "not signed up",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await students.find({}, { _id: 0, __v: 0 });
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

//student detail getting
exports.studentInfo = async (req, res) => {
  try {
    console.log(req.params.id);
    const student = await students.find(
      { rollNo: req.params.id },
      { _id: 0, __v: 0 }
    );
    if (student != null) {
      res.status(200).json(student);
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//examslist of a department
exports.examsList = async (req, res) => {
  try {
    const data = await exams.find(
      { deptID: req.params.id },
      { _id: 0, __v: 0 }
    );
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(200).json({
        message: "no exams",
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
    // const data=await students.findOne({email:req.body.email,password:req.body.password},{_id:0,v__:0});
    const users = await students
      .findOne({ email: req.body.email })
      .then((user) => {
        //comparing hashing password with entered password
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            return res.status(200).json({
              auth: 1,
              rollNo: user.rollNo,
            });
          } else {
            return res.status(200).json({
              auth: 0,
            });
          }
        });
      });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    console.log("updating...");
    console.log(req.body);
    const pass = req.body.password;
    if (pass.length === 0) {
      const pass = await students
        .findOne({ rollNo: req.params.id })
        .select("password");
      var upstudent = await students.findOneAndUpdate(
        { rollNo: req.params.id },
        { ...req.body, password: pass.password, deptName: "IT" },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      console.log(req.body.deptName);
      const gensalt = bcrypt.genSaltSync(10);
      const hpass = await bcrypt.hashSync(pass, gensalt);
      var upstudent = await students.findOneAndUpdate(
        { rollNo: req.params.id },
        { ...req.body, password: hpass, deptName: req.body.deptName },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    console.log("success");
    if (upstudent != null) {
      res.status(200).json({
        status: "success",
        result: upstudent.length,
        data: { upstudent },
      });
    } else {
      res.status(200).json({
        status: "failed",
        data: "no record updated!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const delStudent = await students.deleteOne({ rollNo: req.params.id });
    if (delStudent !== 0) {
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

//hallTicket retrieval
exports.getHallticket = async (req, res) => {
  try {
    const student = await students.findOne(
      { rollNo: req.params.id },
      { hallTicket: 1 }
    );
    if (student != null) {
      console.log("retrieving...");
      res.set("Content-Type", student.hallTicket.contentType);
      res.send(Buffer.from(student.hallTicket.data, "binary"));
    } else {
      res.send("not created");
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

//notifications
exports.getNotifications = async (req, res) => {
  try {
    const list = await notifications.find(
      { deptID: req.body.deptID },
      { _id: 0, __v: 0 }
    );
    if (list != null) {
      res.status(200).json(list);
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

//email verification
exports.verifyEmailConfirmation = async (req, res) => {
  try {
    console.log(req.body);
    const verified = await otps.findOne({
      otpID: req.body.rollNo,
      otp: req.body.otp,
    });
    console.log(verified);
    if (verified != null) {
      const verstudent = await students.findOneAndUpdate(
        { rollNo: req.body.rollNo },
        { verified: true },
        {
          new: true,
          runValidators: true,
        }
      );
      if (verstudent != null) {
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
