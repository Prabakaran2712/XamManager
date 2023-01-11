import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputWithLabel from "../../../components/form/InputWithLabel";
import Select from "react-select";
import axios from "axios";

const StudentSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [yearOfPO, setYearofPO] = useState("");
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
      rollNo === "" ||
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
      .post("/api/studentsignup", {
        name,
        rollNo,
        yearOfPO,
        email,
        deptID: department["value"],
        password,
      })
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            rollNo: rollNo,
            userType: "student",
            verified: false,
          })
        );
        navigate("/auth/verify/student");
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
        <div className="display-6 my-3">Student Sign Up</div>
        <form>
          <InputWithLabel
            label="Name"
            inputType="text"
            val={name}
            toUpdate={setName}
            required={true}
          />
          <InputWithLabel
            label="Roll no."
            val={rollNo}
            toUpdate={setRollNo}
            inputType="text"
            required={true}
          />
          <InputWithLabel
            label="Year of Pass out (YYYY)"
            val={yearOfPO}
            toUpdate={setYearofPO}
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
              Already have an account?{" "}
              <Link to="/auth/login/student">Login</Link>
            </div>
            <div className="small">
              Staff? <Link to="/auth/signup/staff">Staff sign up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default StudentSignup;
