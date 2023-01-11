import axios from "axios";
import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import FileSaver from "file-saver";
const HallTicket = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [encodedUri, setEncodedUri] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .post("api/hallticket", { rollNo: "202099" })
      .then((res) => {
        //   console.log("success");
        //   console.log(res);

        const data = Uint8Array.from(res.data);
        //   const content = new Blob(res.data, {
        //     type: "application/pdf",
        //   });
        //   setEncodedUri(window.URL.createObjectURL(content));
        //   console.log(encodedUri);
        //   setLoading(false);
        // }

        var blob = new Blob([data], { type: "application/pdf" });
        FileSaver.saveAs(blob, "filename.pdf");
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
        <embed
          type="application/pdf"
          src={encodedUri}
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
