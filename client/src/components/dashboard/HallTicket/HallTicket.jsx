import axios from "axios";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

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

const HallTicket = () => {
  var studentInfo = null;
  console.log("hello");
  const [pdfSource, setPdfSource] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [encodedUri, setEncodedUri] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("stuser"));
    const rollNo = student.rollNo;

    axios
      .get(`api/studentinfo/${rollNo}`)
      .then((res) => {
        const pdf = new jsPDF({
          unit: "px",
          hotfixes: ["px_scaling"],
        });
        console.log(res.data[0].name);
        let htmlContent = "";
        htmlContent +=
          "<div className='text-center'><h1>Hall Ticket</h1></div>";
        htmlContent +=
          "<div className='container'><table><tr><td><b className='me-5'>Name:</b></td><td>" +
          res.data[0].name +
          "</td></tr>";
        htmlContent +=
          "<tr><td><b className='me-5'>Roll Number:</b></td><td>" +
          res.data[0].rollNo +
          "</td></tr>";
        htmlContent +=
          "<tr><td><b className='me-5'>Department:</b></td><td>" +
          res.data[0].deptID +
          `</td></tr></table><div style='height: 50px'></div><table style='border: 1px solid black; border-collapse: collapse; margin: 0 auto; width: 80%;border-collapse: collapse'><thead><tr>`;
        htmlContent += `<th style='border: 1px solid grey'>Subject Name</th><th style='border: 1px solid grey'>Subject Code</th><th style='border: 1px solid grey'>Date</th>`;
        htmlContent += `<th style='border: 1px solid grey'>Session</th></tr></thead><tbody>`;

        axios.get(`api/examslist/${student.deptID}`).then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            htmlContent +=
              "<tr><td style='border: 1px solid grey'>" +
              res.data[i].subjectName +
              "</td><td style='border: 1px solid grey'>" +
              res.data[i].subjectCode +
              "</td><td style='border: 1px solid grey'>" +
              getDate(res.data[i].examDate) +
              "</td><td style='border: 1px solid grey'>" +
              res.data[i].session +
              "</td></tr>";
          }
          htmlContent += "</tbody></table></div>";
          // htmlContent =
          //   "<div style='background-color:red' className='text-center text-light'>Hello world</div>";
          pdf
            .html(htmlContent, {
              width: 800,
              windowWidth: 800,
            })
            .then(() => {
              setPdfSource(pdf.output("datauristring"));
              setLoading(false);
            });
        });
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }, []);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  if (!loading) {
    return (
      <div className="container">
        <div className="header">
          <p className="display-5 my-5 text-center">HallTicket</p>
        </div>
        <div className="mx-auto">
          <embed
            type="application/pdf"
            src={pdfSource}
            width="100%"
            height="500px"
          ></embed>
        </div>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};
export default HallTicket;
