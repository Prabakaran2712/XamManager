import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../../../components/form/InputWithLabel";

const VerifyStudent = () => {
  const [rollNo, setRollNo] = useState(null);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("stuser"));
    if (!user) {
      navigate("/auth/signup/student");
      return;
    }
    // const { rollNo } = JSON.parse(user);
    setRollNo(user.rollNo);
  }, []);
  const verify = (e) => {
    e.preventDefault();
    axios
      .post("/api/verifyst", { rollNo, otp })
      .then((res) => {
        if (res.data.verified === 1) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              rollNo,
              userType: "student",
              verified: true,
            })
          );
          navigate("/");
        } else {
          setError("Invalid OTP entered");
        }
      })
      .catch(() => {
        setError("Invalid OTP entered");
      });
  };
  return (
    <div className="container">
      <div className="mx-auto border rounder p-3 my-3 w-75">
        <div className="display-6">Verify your email</div>
        <div className="my-3">
          <form>
            <InputWithLabel
              label="Enter the OTP sent to your email"
              inputType="text"
              val={otp}
              toUpdate={setOtp}
            />
            {error && <div className="alert alert-danger">{error}</div>}
            <button onClick={(e) => verify(e)} className="btn btn-primary">
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default VerifyStudent;
