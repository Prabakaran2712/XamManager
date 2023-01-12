const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    staffID: {
      type: String,
      unique: true,
      required: [true, "Required Field"],
    },
    email: {
      type: String,
      required: [true, "Required Field"],
    },
    name: {
      type: String,
      required: [true, "Required Field"],
    },
    deptID: {
      type: String,
      required: [true, "Required Field"],
    },
    courses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "course",
    },
    password: {
      type: String,
      required: [true, "Required Field"],
    },
    exams: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "exams",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = schema;
