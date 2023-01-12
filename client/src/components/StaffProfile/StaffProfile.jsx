import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputWithLabel from "../form/InputWithLabel";
import Select from "react-select";
import axios from "axios";
import styles from "./StaffProfile.module.css";

const StaffProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [options, setOptions] = useState([]);
  const [curItem, setCurItem] = useState("");
  const [allCourses, setAllCourses] = useState(null);
  // const id = localStorage.getItem("staffID") || "Praba2712";
  const id = "100";
  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const updateDept = (selectionDept) => {
    setDepartment(selectionDept);
  };

  useEffect(() => {
    setStaffId(id);
    axios
      .get(`api/staff/${id}`)
      .then((res) => {
        const data = res.data.data;
        setName(data.name);
        setStaffId(data.staffID);
        setDepartment(data.deptID);
        setEmail(data.email);
        axios.get("/api/courses").then((dat) => {
          const course = dat.data.data;
          setAllCourses(course);
          var opt_temp = [];
          var course_temp = [];
          data.courses.forEach((element) => {
            course_temp.push(element._id);
          });
          course.forEach((element) => {
            if (element.deptID == data.deptID) {
              opt_temp.push(element);
            }
          });
          setCourses(course_temp);
          setOptions(opt_temp);
          console.log(course_temp);
          console.log(opt_temp);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }, []);
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
          "user",
          JSON.stringify({
            staffID: staffId,
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
  if (!loading) {
    return (
      <div className={"m-5 " + styles["profile-container"]}>
        <div className="mx-auto  rounded p-3 my-3 w-50">
          <div className="display-6 my-3 text-center">Profile</div>
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
                defaultValue={department}
              />
            </div>
            <InputWithLabel
              label="Email"
              val={email}
              toUpdate={setEmail}
              inputType="email"
              required={true}
            />

            <div className="form-group">
              <h3>Course</h3>
              <div>
                <div>
                  <select
                    className="form-select border border-dark m-3"
                    value={curItem}
                    onChange={(e) => setCurItem(e.target.value)}
                  >
                    <option value="">Choose an item to add</option>
                    {options &&
                      options.map((item) => {
                        if (!courses.includes(item._id)) {
                          return (
                            <option key={item._id + "a"} value={item._id}>
                              {item.subjectName}
                            </option>
                          );
                        }
                      })}
                  </select>
                  <div
                    className="btn btn-secondary mx-3"
                    onClick={() => {
                      if (curItem) {
                        setCourses([...courses, curItem]);
                        setCurItem("");
                      }
                    }}
                  >
                    Add Course
                  </div>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Subject Name</th>
                    <th scope="col">Subject Code</th>
                    <th scope="col">Regulation</th>
                  </tr>
                </thead>
                <tbody>
                  {courses &&
                    courses.map((id, idx) => {
                      var item = allCourses.find((item) => item._id == id);
                      return (
                        <tr key={item._id + "b"}>
                          <td>{idx + 1}</td>
                          <td>{item.subjectName}</td>
                          <td>{item.subjectCode}</td>
                          <td>{item.regulation}</td>
                          <td>
                            <button
                              className="btn btn-outline-danger"
                              onClick={(e) => {
                                setCourses(
                                  courses.filter((id) => {
                                    return id !== item._id;
                                  })
                                );
                              }}
                            >
                              {" "}
                              remove{" "}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
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
              <button
                onClick={(e) => submitForm(e)}
                className="btn btn-primary"
              >
                Sign Up
              </button>
            </div>
            <div>
              <div className="small">
                Already have an account?{" "}
                <Link to="/auth/login/staff">Login</Link>
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
  } else return <div>Loading </div>;
};
export default StaffProfile;
