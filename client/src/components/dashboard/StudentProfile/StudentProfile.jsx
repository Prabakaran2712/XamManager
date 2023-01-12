import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./StudentProfile.module.css";
const StudentProfile = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [deptData, setDeptData] = useState(null);
  const student=JSON.parse(localStorage.getItem("stuser"));
  const rollNo = student.rollNo;
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
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
  const updateDept = (selectionDept) => {
    setDepartment(selectionDept);
  };
  const updateDetails = (e) => {};
  useEffect(() => {
    axios
      .get(`api/studentinfo/${rollNo}`)
      .then((res) => {
        setFormData(res.data[0]);

        axios
          .get("api/departments")
          .then((res) => {
            console.log(res.data.data);
            res.data.data.forEach((res) => {
              setDepartment([
                ...department,
                { value: res.deptID, name: res.departmentName },
              ]);
            });
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }, []);

  if (!loading) {
    return (
      <div className={styles["profile-container"]}>
        <div className="container w-75">
        <div className="row">
          <div className="col-md-12 border-right">
            <div className="p-3 py-5">
            <div className="header">
              <p className="display-1 my-5">Profile</p>
            </div>
              <div className="row mt-2 mx-auto">
                <div className="col-md-10">
                  <label className="labels my-3">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="row mt-3 mx-1">
                <div className="col-md-10">
                  <label className="labels my-3">Roll Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Roll Number"
                    value={formData.rollNo}
                    onChange={(e) => {
                      setFormData({ ...formData, rollNo: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-10">
                  <label className="labels my-3">College Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="College Name"
                    value={formData.college}
                    onChange={(e) => {
                      setFormData({ ...formData, college: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-10">
                  <label className="labels my-3">Department</label>
                  <Select
                    value={department}
                    onChange={updateDept}
                    options={departmentOptions}
                    defaultValue={departmentOptions[0]}
                  />
                </div>
                <div className="col-md-10">
                  <label className="labels my-3">Year of Passing</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Year of Passing"
                    value={formData.yearOfPO}
                    onChange={(e) => {
                      setFormData({ ...formData, yearOfPO: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-10">
                  <label className="labels my-3">CGPA</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                    value={formData.cgpa}
                    onChange={(e) => {
                      setFormData({ ...formData, cgpa: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-10">
                  <label className="labels my-3">Email ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-10">
                  <label className="labels my-3">New Password </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(password);
                      setFormData({ ...formData, password: e.target.value });
                    }}
                  />
                </div>

                <div className="mt-5 text-center">
                  <button
                    className={" display-5 p-3 " + styles["btn"]}
                    type="button"
                    onClick={updateDetails()}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};
export default StudentProfile;
