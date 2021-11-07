import React, { useState, useEffect } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import "./Data.css";
import ListIcon from "@mui/icons-material/List";
import InfoIcon from "@mui/icons-material/Info";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { db } from "./firebase";

function Data({ user }) {
  const [files, setFiles] = useState([]);

  //getting files from db firestore
  useEffect(() => {
    let documents = [];
    db.collection("uploads").onSnapshot((snapshot) => {
      documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      //console.log(documents);
      documents = documents.filter((docs) => {
        return docs.data.submittedBy === user.email;
      });
      setFiles(documents);
    });
    // eslint-disable-next-line
  }, []);

  //function to convert bytes into Mb
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <>
      <div className="data">
        <div className="data-header">
          <div className="data-header-left">
            <span>My Drive </span> <FileCopyIcon />
          </div>
          <div className="data-header-right">
            <ListIcon />
            <InfoIcon />
          </div>
        </div>
        <div className="data-content-container">
          <div className="data-content-container-file">
            {/* displaying files getting from firestore db */}
            {files.map((file) => {
              return (
                <div className="data-content-file">
                  <FilePresentIcon />
                  <p> {file.data.fileName}</p>
                </div>
              );
            })}
          </div>

          <div className="data-content-container-list">
            <div className="details">
              <p>
                Name <ArrowDownwardIcon />
              </p>
              <p>Owner</p>
              <p>Last Modified</p>
              <p>File Size</p>
            </div>

            {/* showing file details we are getting from firestore db */}
            {files.map((file) => {
              return (
                <div className="details">
                  <a href={file.data.fileURL} target="_blank" rel="noreferrer">
                    <p>
                      {file.data.fileName} <FileCopyIcon />
                    </p>
                  </a>
                  <p>Me</p>
                  <p>
                    {new Date(
                      file.data.timestamp?.seconds * 1000
                    ).toUTCString()}
                  </p>
                  <p>{formatBytes(file.data.size)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Data;
