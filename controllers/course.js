const course = require("../db/courseModel");
const notifications = require("../db/notifyModel");
const fs = require("fs");
const staffs = require("../db/staffModel");

//get All Courses List
exports.getCourses = async (req, res) => {
  try {
    data = await course.find();
    if (data != null) {
      res.status(200).json({
        data: data,
      });
    } else {
      res.status(400).json({
        message: "Error in getting Courses ",
      });
    }
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

//get course bt department
exports.getCourse = async (req, res) => {
  try {
    data = await course.find({ deptID: req.params.id, taken: false });
    if (data != null) {
      res.status(200).json(data);
    } else {
      res.status(400).json({
        message: "Error in getting Course ",
      });
    }
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

//choosing course
exports.chooseCourse = async (req, res) => {
  try {
    const courses = req.body.courses;
    for (let i = 0; i < req.body.courses.length; i++) {
      await course.findByIdAndUpdate(courses[i], { taken: true });
      await staffs.updateOne(
        { staffID: req.body.staffID },
        { $push: { courses: courses[i] } }
      );
    }
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

//create new course
exports.createCourse = async (req, res) => {
  try {
    data = await course.create({
      subjectName: req.body.subjectName,
      deptID: req.body.deptID,
      subjectCode: req.body.subjectCode,
      regulation: req.body.regulation,
    });
    if (data != null) {
      res.status(201).json({
        message: "New Course Created",
      });
    } else {
      res.status(400).json({
        message: "Error in creating Course ",
      });
    }
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

//dd-mm-yyyy format change
const getDate = (str) => {
  if (str !== undefined) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  } else {
    return "";
  }
};

//update Course details
exports.updateCourse = async (req, res) => {
  await course
    .findOneAndUpdate({ subjectCode: req.params.subjectCode }, req.body)
    .then((data) => {
      console.log(data);
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
};

//delete course
exports.deleteCourse = async (req, res) => {
  try {
    console.log(req.params.subjectCode);
    const delCourse = await course.findOneAndDelete({
      subjectCode: req.params.subjectCode,
    });
    if (delCourse != null) {
      res.status(200).json({
        status: "success",
        message: `Course with subjectCode ${req.params.subjectCode} is deleted`,
      });
    } else {
      res.status(404).json({
        message: "record not found",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "record not found",
      message: err,
    });
  }
};
