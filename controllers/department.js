const department = require("../db/departmentModel");
const notifications = require("../db/notifyModel");
const fs = require("fs");

//get departments
exports.getdepartments = async (req, res) => {
  try {
    data = await department.find();
    if (data != null) {
      res.status(200).json({
        data: data,
      });
    } else {
      res.status(400).json({
        message: "Error in getting departments ",
      });
    }
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

//create new department
exports.createdepartment = async (req, res) => {
  try {
    data = await department.create({
      departmentName: req.body.departmentName,
      deptID: req.body.deptID,
    });
    if (data != null) {
      res.status(201).json({
        message: "New department Created",
      });
    } else {
      res.status(400).json({
        message: "Error in creating department ",
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

//update department details
exports.updatedepartment = async (req, res) => {
  await department
    .findOneAndUpdate({ deptID: req.params.deptID }, req.body)
    .then((data) => {
      console.log(data);
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
};

//delete department
exports.deletedepartment = async (req, res) => {
  try {
    const deldepartment = await department.findOneAndDelete({
      deptID: req.params.deptID,
    });
    if (deldepartment != null) {
      res.status(200).json({
        status: "success",
        message: `department with subjectCode ${req.params.deptID} is deleted`,
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
