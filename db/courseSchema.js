const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: [true, "Required Field"],
  },
  deptID: {
    type: String,
    required: [true, "Required Field"],
  },
  subjectCode: {
    type: String,
    unique: true,
    required: [true, "Required Field"],
  },
  regulation: {
    type: String,
    required: [true, "Required Field"],
  },
  taken:{
    type:Boolean,
    default:false
  }
});

module.exports = schema;
