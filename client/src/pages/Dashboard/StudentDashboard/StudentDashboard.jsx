import styles from "./StudentDashboard.module.css";
import { useState } from "react";
import StudentProfile from "../../../components/dashboard/StudentProfile/StudentProfile";
import Courses from "../../../components/dashboard/Courses/Courses";
import HallTicket from "../../../components/dashboard/HallTicket/HallTicket";
const StudentDashboard = () => {
  const [page, setPage] = useState("profile");
  const switchpage = (page) => {
    setPage(page);
  };
  return (
    <div className={styles.dashboard}>
      <div className={" py-5 text-center " + styles["sidebar"]}>
        <div
          className={"p-4 m-2 display " + styles["element"]}
          onClick={() => {
            switchpage("profile");
          }}
        >
          Profile
        </div>
        <div
          className={"p-4 m-2 display " + styles["element"]}
          onClick={() => {
            switchpage("course");
          }}
        >
          Courses
        </div>
        <div
          className={"p-4 m-2 display " + styles["element"]}
          onClick={() => {
            switchpage("hallticket");
          }}
        >
          View HallTicket
        </div>
        <div
          className={"p-4 m-2 display " + styles["element"]}
          onClick={() => {
            switchpage("marks");
          }}
        >
          view Marks
        </div>
        <div
          className={"p-4 m-2 display " + styles["element"]}
          onClick={() => {
            switchpage("attendence");
          }}
        >
          view Attendance
        </div>
      </div>
      <div className={"w-100 " + styles["main-content"]}>
        {page === "profile" ? <StudentProfile /> : null}
        {page === "course" ? <Courses /> : null}
        {page === "hallticket" ? <HallTicket /> : null}
      </div>
    </div>
  );
};
export default StudentDashboard;
