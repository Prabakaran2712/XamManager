import axios from "axios";
import React, { useState, useEffect } from "react";

import { renderToString } from "react-dom/server";
import { Document, Page } from "react-pdf";
import FileSaver from "file-saver";
import jsPDF from 'jspdf';

const getDate=(str)=>{
  if (str !== undefined) {
    var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  } else {
    return "";
  }
}

const HallTicket = () => {
  var studentInfo=null;
  console.log("hello");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [encodedUri, setEncodedUri] = useState(null);
  const [loading, setLoading] = useState(true);
  var htmlContent=
  `<style>
            table{
                width:100%
            }
            th, td, tr {
            border-bottom: 1px solid #ddd;
            padding: 7px;
            text-align: center;
        }
        </style>`;
  useEffect(() => {
    axios
      .get("api/studentinfo/202099")
      .then((res) => {
        console.log(res.data[0].name);
        htmlContent+="<h1>HallTicket</h1>";
        htmlContent+="<h1>Name:"+res.data[0].name+"</h1>";
        htmlContent+="<h1>RollNumber:"+res.data[0].rollNo+"</h1>";
        htmlContent+="<h1>DepartmentID:"+res.data[0].deptID+`</h1><table style='width:100%'>`;

        axios.get("api/examslist/it")
        .then((res)=>{
          console.log(res.data);
          for(let i=0;i<res.data.length;i++){
            htmlContent+="<tr><td>"+res.data[i].subjectName+"</td><td>"+res.data[i].subjectCode+"</td><td>"
            +getDate(res.data[i].examDate)+"</td><td>"+res.data[i].session+"</td><td></td></tr>"
          }
          htmlContent+="</table>";
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
              pdf.save('./test.pdf');
            });
        })
        
        setLoading(false);
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
        <h1>hello</h1>
        <embed
          type="application/pdf"
          src={"./test.pdf"}
          width="100%"
          height="100%"
        ></embed>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};
export default HallTicket;

// const pdf = new jsPDF({
//   orientation: "p",
//   unit: "pt",
//   format: "a4",
// });
// pdf
//   .html(htmlContent, {
//     windowWidth: 794,
//     html2canvas: { scale: 0.57 },
//   })
//   .then(() => { 
//     pdf.save('test.pdf');
//   });
// useEffect(() => {
//   axios
//     .post("api/hallticket", { rollNo: "202099" })
//     .then((res) => {
//       //   console.log("success");
//       //   console.log(res);

//       // const data = Uint8Array.from(res.data);
//       //   const content = new Blob(res.data, {
//       //     type: "application/pdf",
//       //   });
//       //   setEncodedUri(window.URL.createObjectURL(content));
//       //   console.log(encodedUri);
//       //   setLoading(false);
//       // }

//       // var blob = new Blob([data], { type: "application/pdf" });
//       // FileSaver.saveAs(blob, "filename.pdf");
//     })
//     .catch((err) => {
//       console.log("err" + err);
//     });
// }, []);