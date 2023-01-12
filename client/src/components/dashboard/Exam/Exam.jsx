import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputWithLabel from "../../../components/form/InputWithLabel";
import Select from "react-select";
import axios from "axios";

const Exam = () => {
  const navigate = useNavigate();
  const staff = JSON.parse(localStorage.getItem("sfuser"));
  const [examID, setexamID] = useState("");
  const [staffName, setstaffName] = useState("");
  const [subjectName, setsubjectName] = useState("");
  const [subjectCode, setsubjectCode] = useState("");
  const [examDate, setexamDate] = useState("");
  const [venue, setVenue] = useState("");
  const [timing, setTiming] = useState("");
  const [mode, setMode] = useState("");
  const [session, setSession] = useState("");

  const [error, setError] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    setError("");
    if (
      examID === "" ||
      staffName === "" ||
      subjectName === "" ||
      subjectCode === "" ||
      examDate === "" ||
      venue === "" ||
      timing === "" ||
      mode === "" ||
      session === ""
    ) {
      setError("Fill all the required fields");
      return;
    }
    console.log({
      examID: examID,
      staffName: staffName,
      subjectName: subjectName,
      subjectCode: subjectCode,
      examDate: examDate,
      venue: venue,
      timing: timing,
      mode: mode,
      deptID: staff.deptID,
      session: session,
      staffID: staff.staffID,
    });
    axios
      .post("/api/createexam", {
        examID: examID,
        staffName: staffName,
        subjectName: subjectName,
        subjectCode: subjectCode,
        examDate: examDate,
        venue: venue,
        timing: timing,
        mode: mode,
        deptID: staff.deptID,
        session: session,
        staffID: staff.staffID,
      })
      .then((res) => {
        console.log("exam created");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="mx-auto border rounded p-3 my-3 w-50">
        <div className="display-6 my-3">Exam</div>
        <form>
          <InputWithLabel
            label="Exam ID"
            inputType="text"
            val={examID}
            toUpdate={setexamID}
            required={true}
          />
          <InputWithLabel
            label="Staff Name"
            val={staffName}
            toUpdate={setstaffName}
            inputType="text"
            required={true}
          />
          <InputWithLabel
            label="Subject Name"
            val={subjectName}
            toUpdate={setsubjectName}
            inputType="text"
            required={true}
          />
          <InputWithLabel
            label="Subject Code"
            val={subjectCode}
            toUpdate={setsubjectCode}
            inputType="text"
            required={true}
          />
          <InputWithLabel
            label="Exam Date(DD/MM/YYYY)"
            val={examDate}
            toUpdate={setexamDate}
            inputType="text"
            required={true}
          />
          <InputWithLabel
            label="Venue"
            val={venue}
            toUpdate={setVenue}
            inputType="text"
            required={true}
          />
          <InputWithLabel
            label="Session"
            val={session}
            toUpdate={setSession}
            inputType="text"
            required={true}
          />
          <InputWithLabel
            label="Timing"
            val={timing}
            toUpdate={setTiming}
            inputType="text"
            required={true}
          />
          <InputWithLabel
            label="Mode"
            val={mode}
            toUpdate={setMode}
            inputType="text"
            required={true}
          />
          {error !== "" && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          <div className="mb-3">
            <button onClick={(e) => submitForm(e)} className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Exam;
