import axios from "axios";
import styles from "./ExamUpdate.module.css";
import { useEffect, useState } from "react";

const getDate = (str) => {
  if (str !== undefined) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  } else {
    return "";
  }
};

const ExamUpdate = ({ examId }) => {
  const [deptId, setDeptId] = useState("5060");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const student = JSON.parse(localStorage.getItem("stuser"));
  console.log(student);
  const [deptName, setDepartmentName] = useState("");

  const updateDetails = (e) => {
    e.preventDefault();
    console.log(data);
    axios.put(`api/updateexam/${examId}`, data).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    axios.get(`api/examinfo/${examId}`).then((res) => {
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  } else
    return (
      <div className="container w-75">
        <div className="row">
          <div className="col-md-12 border-right">
            <div className="p-3 py-5">
              <div className="header">
                <p className="display-1 my-5">Exam Update</p>
              </div>
              <div className="row mt-2 mx-auto">
                <div className="col-md-10">
                  <label className="labels my-3">Staff Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Staff Name"
                    value={data.staffName}
                    onChange={(e) => {
                      setData({ ...data, staffName: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="row mt-3 mx-1">
                <div className="col-md-10">
                  <label className="labels my-3">Subject Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject Name"
                    value={data.subjectName}
                    onChange={(e) => {
                      setData({ ...data, subjectName: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-10">
                  <label className="labels my-3">Subject Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject Code"
                    value={data.subjectCode}
                    onChange={(e) => {
                      setdata({ ...data, subjectCode: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-10">
                  <label className="labels my-3">Exam Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Exam Date"
                    value={getDate(data.examDate)}
                    onChange={(e) => {
                      setdata({ ...data, examDate: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-10">
                  <label className="labels my-3">Venue</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Venue"
                    value={data.venue}
                    onChange={(e) => {
                      setData({ ...data, venue: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-10">
                  <label className="labels my-3">Timing</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Timing"
                    value={data.timing}
                    onChange={(e) => {
                      setData({ ...data, timing: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-10">
                  <label className="labels my-3">Session</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Session"
                    value={data.session}
                    onChange={(e) => {
                      setData({ ...data, session: e.target.value });
                    }}
                  />
                </div>
                <div className="col-md-10">
                  <label className="labels my-3">Mode</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mode"
                    value={data.mode}
                    onChange={(e) => {
                      setData({ ...data, mode: e.target.value });
                    }}
                  />
                </div>
                <div className="mt-5 text-center">
                  <button
                    className={" display-5 p-3 " + styles["btn"]}
                    type="button"
                    onClick={(e) => updateDetails(e)}
                  >
                    Update Exam
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
export default ExamUpdate;
