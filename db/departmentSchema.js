const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: [true, "Required Field"],
  },
  deptID: {
    type: String,
    unique: true,
    required: [true, "Required Field"],
  },
});

module.exports = schema;
