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

const ExamList = () => {
  const [deptId, setDeptId] = useState("5060");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const staff=JSON.parse(localStorage.getItem("sfuser"));
  console.log(staff);

  const deleteExam=(id)=>{
    console.log(id);  
    axios.delete(`api/deleteexam/${id}`).then((res) => {
        console.log(res);
        axios.get(`api/exams/${staff.staffID}`).then((res) => {
            console.log(res.data);
            setData(res.data);
          });
      });
  }

  useEffect(() => {
    axios.get(`api/exams/${staff.staffID}`).then((res) => {
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
      <div className="course-container w-75 text-center m-5 mx-auto">
        <div className="header">
          <p className="display-1 my-5">Created Exams</p>
        </div>
        <div className="body">
          <table className="table table-striped table-hover overflow-scroll">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Exam ID</th>
                <th scope="col">Name</th>
                <th scope="col">Code</th>
                <th scope="col">Date</th>
                <th scope="col">Venue</th>
                <th scope="col">Timing</th>
                <th scope="col">Session</th>
                <th scope="col">Mode</th>
                <th scope="col">Remove</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((object, i) => (
                  <tr key={i + 1}>
                    <th scope="row">{i + 1}</th>
                    <td>{object.examID}</td>
                    <td>{object.subjectName}</td>
                    <td>{object.subjectCode}</td>
                    <td>{getDate(object.examDate)}</td>
                    <td>{object.venue}</td>
                    <td>{object.timing}</td>
                    <td>{object.session}</td>
                    <td>{object.mode}</td>
                    <td><button className="btn btn-danger" onClick={(e)=>deleteExam(object.examID)}>
                    <i class="fa fa-times"></i></button></td>
                    <td><button className="btn btn-secondary" onClick={(e)=>deleteExam(object.examID)}>
                    <i class="fa fa-pencil-square-o"></i></button></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};
export default ExamList;
