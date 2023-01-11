import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputWithLabel from "../../../components/form/InputWithLabel";
import axios from "axios";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    setError("");
    if (email === "" || password === "") {
      setError("Fill all the required fields");
      return;
    }
    axios
      .post("/api/studentlogin", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.auth === 1) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              rollNo: res.data.rollNo,
              userType: "student",
              verified: true,
            })
          );
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="container">
      <div className={`mx-auto border rounded p-3 my-3 w-50`}>
        <div className="display-6 my-3">Student Login</div>
        <form>
          <InputWithLabel
            label="Email"
            val={email}
            toUpdate={setEmail}
            inputType="text"
            required={true}
          />
          <InputWithLabel
            label="Password"
            val={password}
            toUpdate={setPassword}
            inputType="password"
            required={true}
          />
          {error !== "" && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          <div className="text-center">
            <button onClick={(e) => submitForm(e)} className="btn btn-primary">
              Login
            </button>
          </div>
          <div>
            <div className="small">
              Don't have an account yet?{" "}
              <Link to="/auth/signup/student">Sign Up</Link>
            </div>
            <div className="small">
              Staff? <Link to="/auth/login/staff">Staff login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default StudentLogin;
