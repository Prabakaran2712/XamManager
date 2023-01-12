import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckboxTree from "react-checkbox-tree";

const ChooseCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [staffID, setStaffID] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const submit = (e) => {
    e.preventDefault();
    console.log(selectedCourses);
    axios
      .post("/api/choosecourse", {
        courses: selectedCourses,
        staffID,
      })
      .then(() => {
        navigate("/dashboard/staff");
      });
  };
  useEffect(() => {
    const staff=JSON.parse(localStorage.getItem("sfuser"));
    const staffDept = staff.deptID;
    const staffID = staff.staffID;
    if (!staffDept || !staffID) {
      navigate("/");
    }
    setStaffID(staffID);
    axios.get("/api/deptcourse/" + staffDept).then((res) => {
      setCourses(() => {
        return res.data.map((course) => {
          return {
            value: course._id,
            label: " " + course.subjectName + " " + course.subjectCode,
          };
        });
      });
    });
  }, []);
  return (
    <div className="container">
      <div className="mx-auto border rounded p-3 my-3 w-75">
        <h1 className="display-6 my-3">Choose the courses</h1>
        <p className="lead">Choose the courses you wish to take</p>
        <h3>Available Courses</h3>

        {courses.length > 0 && (
          <CheckboxTree
            nodes={courses}
            checked={selectedCourses}
            onCheck={(checked) => {
              setSelectedCourses(checked);
            }}
          />
        )}

        <button onClick={(e) => submit(e)} className="btn btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
};
export default ChooseCourses;
