import axios from "axios";
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

const Notifications = () => {
  const [deptId, setDeptId] = useState("5060");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem("deptId");
  const [deptName, setDepartmentName] = useState("");

  useEffect(() => {
    axios.get(`api/notifications/IT`).then((res) => {
      setData(res.data);
      if (id) setDeptId(id);
      console.log(res.data);
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
      <div className="course-container w-75 text-center m-5 mx-auto">
        <div className="header">
          <p className="display-1 my-5">Notifications</p>
        </div>
        <div className="body">
          <table className="table table-striped table-hover overflow-scroll">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Subject Name</th>
                <th scope="col">Date of Exam</th>
                <th scope="col">Session</th>
                <th scope="col">Created By</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((object, i) => (
                  <tr key={i + 1} className="alert alert-danger">
                    <th scope="row">{i + 1}</th>
                    <td>{object.subjectName}</td>
                    <td>{getDate(object.examDate)}</td>
                    <td>{object.session}</td>
                    <td>{object.createdBy}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};
export default Notifications;
