import axios from "axios";
import { useEffect, useState } from "react";

const Courses = () => {
  const [deptId, setDeptId] = useState("5060");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const student=JSON.parse(localStorage.getItem("stuser"));
  console.log(student);
  const [deptName, setDepartmentName] = useState("");

  useEffect(() => {
    axios.get(`api/courses/${student.deptID}`).then((res) => {
      if (student.deptID) setDeptId(student.deptID);
      console.log(res);
      setData(res.data.data);
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
          <p className="display-1 my-5">Courses</p>
        </div>
        <div className="body">
          <table className="table table-striped table-hover overflow-scroll">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">subject Code</th>
                <th scope="col">subject Name</th>
                <th scope="col">Department ID</th>
                <th scope="col">Regulation</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((object, i) => (
                  <tr key={i + 1}>
                    <th scope="row">{i + 1}</th>
                    <td>{object.subjectCode}</td>
                    <td>{object.subjectName}</td>
                    <td>{object.deptID}</td>
                    <td>{object.regulation}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};
export default Courses;
