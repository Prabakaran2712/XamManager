import styles from "./StudentDashboard.module.css";
const StudentDashboard = () => {
  const [page, setPage] = useState("profile");

  return (
    <div className="dashboard">
      <div className="sidebar py-5 text-center">
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
            switchpage("enroll");
          }}
        >
          Enroll Courses
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
      <div className={styles.main - content}></div>
    </div>
  );
};
export default StudentDashboard;
