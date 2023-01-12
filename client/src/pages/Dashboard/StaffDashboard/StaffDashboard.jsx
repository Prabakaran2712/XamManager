import styles from "./StaffDashboard.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentProfile from "../../../components/dashboard/StudentProfile/StudentProfile";
import Courses from "../../../components/dashboard/Courses/Courses";
import HallTicket from "../../../components/dashboard/HallTicket/HallTicket";
import Exam from "../../../components/dashboard/Exam/Exam";
import Students from "../../../components/dashboard/Students/Students";
import ExamList from "../../../components/dashboard/ExamList/ExamList";
import StaffProfile from "../../../components/StaffProfile/StaffProfile";
const StaffDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = localStorage.getItem("sfuser");
    // if (!user) {
    //   navigate("/auth/login/staff");
    // }
    setLoading(false);
  }, []);
  const [page, setPage] = useState("profile");
  const switchpage = (page) => {
    setPage(page);
  };
  if (loading) {
    return <div>Just a sec...</div>;
  }
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
            switchpage("exam");
          }}
        >
          Create Exam
        </div>

        <div
          className={"p-4 m-2 display " + styles["element"]}
          onClick={() => {
            switchpage("examlist");
          }}
        >
          Exams List
        </div>
        <div
          className={"p-4 m-2 display " + styles["element"]}
          onClick={() => {
            switchpage("students");
          }}
        >
          View Students
        </div>
      </div>
      <div className={"w-100 " + styles["main-content"]}>
        {page === "profile" ? <StaffProfile /> : null}
        {page === "exam" ? <Exam /> : null}
        {page === "students" ? <Students /> : null}
        {page === "examlist" ? <ExamList /> : null}
      </div>
    </div>
  );
};
export default StaffDashboard;
