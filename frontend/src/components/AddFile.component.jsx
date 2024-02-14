import React, { useContext, useState } from "react";
import "../styles/add-file.style.css";
import { createFile } from "../utils/addFile";
import { useParams } from "react-router-dom";
import { FileContext } from "../context/files.context";
export default function AddFile() {
  const [title, setTitle] = useState("");
  const { allFiles, setAllFiles, getAllFiles } = useContext(FileContext);
  const { folderName } = useParams();
  async function addFile(e) {
    e.preventDefault();
    const newTitle = title?.name?.replace(" ", "-");
    console.log(newTitle);
    if (!newTitle) return alert("File is empty");
    else
      await createFile(newTitle, folderName)
        .then((data) => {
          if (!data) {
            console.log(`data is null`);
          } else setAllFiles(data?.data);
        })
        .catch((err) => {
          console.log(err.message || err);
        })
        .finally(() => {
          console.log(`Done`);
        });
  }
  return (
    <div className="add-file-container">
      <form onSubmit={addFile}>
        <input
          onChange={(e) => {
            console.log(e.target.files[0]);
            setTitle(e.target.files[0]);
          }}
          type="file"
          name="title"
          id="name"
          placeholder="Enter title"
        />
        <button>Add File</button>
      </form>
    </div>
  );
}
