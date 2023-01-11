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
  var htmlContent = "";
  useEffect(() => {
    axios
      .get("api/studentinfo/202099")
      .then((res) => {
        console.log(res.data[0].name);
        htmlContent += "<div class='hall-ticket'>";
        htmlContent += "<div class='text-center'>";
        htmlContent += "<h1 class='display-5 '>HallTicket</h1>";
        htmlContent += "</div>";
        htmlContent += "<h1>Name:" + res.data[0].name + "</h1>";
        htmlContent += "<h1>RollNumber:" + res.data[0].rollNo + "</h1>";
        htmlContent +=
          "<h1>DepartmentID:" +
          res.data[0].deptID +
          `</h1><table class="table table-striped-columns"><tbody>`;

        axios.get("api/examslist/it").then((res) => {
          console.log(res.data);
          for (let i = 0; i < res.data.length; i++) {
            htmlContent +=
              "<tr><td>" +
              res.data[i].subjectName +
              "</td><td>" +
              res.data[i].subjectCode +
              "</td><td>" +
              getDate(res.data[i].examDate) +
              "</td><td>" +
              res.data[i].session +
              "</td><td></td></tr>";
          }
          htmlContent += "</tbody></table>";
          htmlContent += "</div>";
          const pdf = new jsPDF({
            orientation: "p",
            unit: "pt",
            format: "a4",
          });
          pdf
            .html(htmlContent, {
              windowWidth: 794,
              html2canvas: { scale: 0.57 },
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
      <div>
        <h1 className="display-1">Hall Ticket</h1>
        <embed
          type="application/pdf"
          src={pdfSource}
          width="1200px"
          height="400px"
        ></embed>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};
export default HallTicket;
