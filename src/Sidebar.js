import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ComputerIcon from "@mui/icons-material/Computer";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { Modal } from "@mui/material";
import { db, storage } from "./firebase";
import firebase from "firebase";
import "./sidebar.css";

function Sidebar({ email }) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  //function to set files so that we can upload
  const handleChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  //function to upload file to db
  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);

    //uploading file to storage and then to the db
    storage
      .ref(`files/${file.name}`)
      .put(file)
      .then((snapshot) => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("uploads").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              fileName: file.name,
              fileURL: url,
              size: snapshot._delegate.bytesTransferred,
              submittedBy: email,
            });

            setUploading(false);
            setFile(null);
            setOpen(false);
          });
      });
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3> Select the file you want to upload </h3>
          </div>
          <div className="form-body">
            {uploading ? (
              <p className="uploading"> Uploading </p>
            ) : (
              <>
                <input type="file" onChange={handleChange} />
                <button type="submit" className="submit-btn">
                  SUBMIT
                </button>
              </>
            )}
          </div>
        </form>
      </Modal>
      <div className="sidebar">
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{ background: "white", color: "black" }}
          startIcon={<AddIcon />}
        >
          <span> Add </span>
        </Button>
        <Button
          variant="contained"
          sx={{ background: "white", color: "black" }}
          startIcon={<ComputerIcon />}
        >
          <span> Computers </span>
        </Button>
        <Button
          sx={{ background: "white", color: "black" }}
          variant="contained"
          startIcon={<InsertDriveFileIcon />}
        >
          <span> My Drive </span>
        </Button>
        <Button
          variant="contained"
          sx={{ background: "white", color: "black" }}
          startIcon={<DeleteSweepIcon />}
        >
          <span> Trash </span>
        </Button>
        <Button
          variant="contained"
          sx={{ background: "white", color: "black" }}
          startIcon={<RecentActorsIcon />}
        >
          <span> Recent </span>
        </Button>
        <hr></hr>
      </div>
    </>
  );
}

export default Sidebar;
