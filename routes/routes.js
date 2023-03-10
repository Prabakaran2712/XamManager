const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staff");
const examController = require("../controllers/exam");
const studentController = require("../controllers/student");
const courseController = require("../controllers/course");
const departmentController = require("../controllers/department");
//staff

//get details of a staff id
router.get("/staff/:id", staffController.getStaff);

//get courses for a staff
router.get("/getStaffCourses/:id", staffController.getStaffCourses);

//sign up
router.post("/staffsignup", staffController.signup);

//login
router.post("/stafflogin", staffController.login);

//update
router.put("/staffupdate/:id", staffController.update);

//delete
router.delete("/staffdelete/:id", staffController.delete);

//getcreated exams
//id-staffID
router.get("/exams/:id", staffController.getExams);

//verify email for staff
router.post("/verifysf", staffController.verifyEmailConfirmation);

//students
//id-deptID
router.get("/studentslist/:id", studentController.list);

//student
//sign up
router.post("/studentsignup", studentController.signup);

//login
router.post("/studentlogin", studentController.login);

//info
//id-rollNo
router.get("/studentinfo/:id", studentController.studentInfo);

//examslist for a department
//id-deptID
router.get("/examslist/:id", studentController.examsList);

//update
//id-rollNo
router.put("/studentupdate/:id", studentController.update);

//delete
//id-rollNo
router.delete("/studentdelete/:id", studentController.delete);

//verify email for student
router.post("/verifyst", studentController.verifyEmailConfirmation);

//hallticket retrieval
//id-rollNo
router.get("/hallticket/:id", studentController.getHallticket);

//exam notifications
router.get("/notifications/:id", studentController.getNotifications);

//exam
//create
router.post("/createexam", examController.createExam);

//get exam
router.get("/examinfo/:id", examController.getExam);

//update
//id-examID
router.put("/updateexam/:id", examController.updateExam);

//delete
//id-examID
router.delete("/deleteexam/:id", examController.deleteExam);

//file
// router.all("/file",staffController.file);

//Course

//get all courses

router.get("/deptcourses/:id", courseController.getdeptCourses);

//get Courses

router.get("/courses", courseController.getCourses);

//id-deptID
router.get("/courses/:id", courseController.getCourses);

//dept specific course for staff to select
//id1-deptID
router.get("/deptcourse/:id", courseController.getCourse);

//selected course adding it to staff
router.post("/choosecourse", courseController.chooseCourse);

//create Course
router.post("/createcourse", courseController.createCourse);

//update Course
router.post("/updatecourse/:subjectCode", courseController.updateCourse);

//delete Course
router.post("/deletecourse/:subjectCode", courseController.deleteCourse);

//department

//get departments
router.get("/departments", departmentController.getdepartments);

//create department
router.post("/createdepartment", departmentController.createdepartment);

//update department
router.post(
  "/updatedepartment/:subjectCode",
  departmentController.updatedepartment
);

//delete department
router.post(
  "/deletedepartment/:subjectCode",
  departmentController.deletedepartment
);

module.exports = router;
