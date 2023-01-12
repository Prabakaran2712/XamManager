import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../../../components/form/InputWithLabel";

const VerifyStaff = () => {
  const [staffID, setStaffID] = useState(null);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("sfuser"));
    if (!user) {
      navigate("/auth/signup/staff");
      return;
    }
    // const { staffID } = JSON.parse(user);
    setStaffID(user.staffID);
  }, []);
  const verify = (e) => {
    e.preventDefault();
    axios
      .post("/api/verifysf", { staffID, otp })
      .then((res) => {
        if (res.data.verified === 1) {
          navigate("/choose-courses");
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
export default VerifyStaff;
