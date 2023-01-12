import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputWithLabel from "../../../components/form/InputWithLabel";
import Select from "react-select";
import axios from "axios";

const StaffSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const updateDept = (selectionDept) => {
    setDepartment(selectionDept);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setError("");
    if (
      name === "" ||
      staffId === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      department === ""
    ) {
      setError("Fill all the required fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }
    axios
      .post("/api/staffsignup", {
        name,
        staffID: staffId,
        email,
        deptID: department["value"],
        password,
      })
      .then((res) => {
        localStorage.setItem(
          "sfuser",
          JSON.stringify({
            staffID: staffId,
            deptID:department["value"],
            userType: "staff",
          })
        );
        localStorage.setItem("staffID", res.data.staffID);
        localStorage.setItem("staffDept", department["value"]);
        navigate("/auth/verify/staff");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const departmentOptions = [
    { value: "AERO", label: "AERO" },
    { value: "AUTO", label: "AUTO" },
    { value: "ECE", label: "ECE" },
    { value: "EIE", label: "EIE" },
    { value: "CT", label: "CT" },
    { value: "IT", label: "IT" },
    { value: "PT", label: "PT" },
    { value: "RPT", label: "RPT" },
  ];
  return (
    <div className="container">
      <div className="mx-auto border rounded p-3 my-3 w-50">
        <div className="display-6 my-3">Staff Sign Up</div>
        <form>
          <InputWithLabel
            label="Name"
            inputType="text"
            val={name}
            toUpdate={setName}
            required={true}
          />
          <InputWithLabel
            label="Staff ID"
            val={staffId}
            toUpdate={setStaffId}
            inputType="text"
            required={true}
          />
          <div className="mb-3">
            <label className="form-label">Department</label>
            <Select
              value={department}
              onChange={updateDept}
              options={departmentOptions}
            />
          </div>
          <InputWithLabel
            label="Email"
            val={email}
            toUpdate={setEmail}
            inputType="email"
            required={true}
          />
          <InputWithLabel
            label="Password"
            val={password}
            toUpdate={setPassword}
            inputType="password"
            required={true}
          />
          <InputWithLabel
            label="Confirm Password"
            val={confirmPassword}
            toUpdate={setConfirmPassword}
            inputType="password"
            required={true}
          />
          {error !== "" && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          <div className="mb-3">
            <button onClick={(e) => submitForm(e)} className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <div>
            <div className="small">
              Already have an account? <Link to="/auth/login/staff">Login</Link>
            </div>
            <div className="small">
              Not a staff?{" "}
              <Link to="/auth/signup/student">Student sign up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default StaffSignup;
