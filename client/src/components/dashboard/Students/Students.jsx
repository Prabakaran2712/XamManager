import axios from "axios";
import { useEffect, useState } from "react";

const Students = () => {
  const [deptId, setDeptId] = useState("5060");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const staff=JSON.parse(localStorage.getItem("sfuser"));
  console.log(staff);
  
  const [deptName, setDepartmentName] = useState("");

  useEffect(() => {
    axios.get(`api/studentslist/${staff.deptID}`).then((res) => {
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
      <div className="course-container w-75 m-5 mx-auto">
        <div className="header">
          <p className="display-1 my-5">Students List</p>
        </div>
        <div className="body">
          <table className="table table-striped table-hover overflow-scroll">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Roll Number</th>
                <th scope="col">Department ID</th>
                <th scope="col">Year Of Passout</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((object, i) => (
                  <tr key={i + 1}>
                    <th scope="row">{i + 1}</th>
                    <td>{object.name}</td>
                    <td>{object.rollNo}</td>
                    <td>{object.deptID}</td>
                    <td>{object.yearOfPO}</td>
                    <td>{object.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};
export default Students;
