import styles from "./StudentDashboard.module.css";
import { useEffect, useState } from "react";
import StudentProfile from "../../../components/dashboard/StudentProfile/StudentProfile";
import Courses from "../../../components/dashboard/Courses/Courses";
import HallTicket from "../../../components/dashboard/HallTicket/HallTicket";
import Notifications from "../../../components/dashboard/Notifications/Notifications";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = localStorage.getItem("stuser");
    if (!user) {
      navigate("/auth/login/student");
    }
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
            switchpage("notifications");
          }}
        >
          Notifications
        </div>

        <div
          className={"p-4 m-2 display " + styles["element"]}
          onClick={() => {
            navigate("/auth/logout");
          }}
        >
          Logout
        </div>
      </div>
      <div className={"w-100 " + styles["main-content"]}>
        {page === "profile" ? <StudentProfile /> : null}
        {page === "course" ? <Courses /> : null}
        {page === "hallticket" ? <HallTicket /> : null}
        {page === "notifications" ? <Notifications /> : null}
      </div>
    </div>
  );
};
export default StudentDashboard;
