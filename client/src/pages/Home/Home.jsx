import { useNavigate, useParams } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const routeTo = (url) => {
    navigate(url);
  };
  return (
    <div className="main-container">
      <div className="header-container">
        <p className="display-3 text-center m-5">Choose your Category</p>
      </div>
      <div
        className={
          "d-flex flex-row justify-content-center m-5 " +
          styles["body-container"]
        }
      >
        <div
          className={
            "student-section  d-flex flex-column justify-content-center m-5 " +
            styles["sub-container"]
          }
          onClick={() => {
            routeTo("/auth/login/student");
          }}
        >
          <div className="display-6">Student</div>
          <span></span>
        </div>
        <div
          className={
            "staff-section  d-flex flex-column justify-content-center m-5 " +
            styles["sub-container"]
          }
          onClick={() => {
            routeTo("/auth/login/staff");
          }}
        >
          <div className="display-6">Staff</div>
          <span></span>
        </div>
      </div>
    </div>
  );
};
export default Home;
