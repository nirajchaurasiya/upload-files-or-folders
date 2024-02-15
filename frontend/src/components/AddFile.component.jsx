import React, { useContext, useState } from "react";
import "../styles/add-file.style.css";
import { createFile } from "../utils/addFile";
import { useParams } from "react-router-dom";
import { FileContext } from "../context/files.context";
import LoadingBar from "react-top-loading-bar";
import { FolderContext } from "../context/folders.context";
export default function AddFile() {
  const [title, setTitle] = useState("");
  const { allFolders, setAllFolders, getAllFolders } =
    useContext(FolderContext);
  const { allFiles, setAllFiles, getAllFiles } = useContext(FileContext);
  const [progress, setProgress] = useState(0);
  const { folderName } = useParams();
  async function addFile(e) {
    setProgress(20);
    e.preventDefault();
    setProgress(30);
    if (!title) return alert("File is empty");
    else setProgress(50);
    await createFile(title, folderName)
      .then((data) => {
        setProgress(70);
        if (!data) {
          console.log(`data is null`);
          setProgress(80);
        } else setAllFiles(data?.data);
        setProgress(90);
      })
      .catch((err) => {
        console.log(err.message || err);
      })
      .finally(() => {
        console.log(`Done`);
        setProgress(100);
      });
  }
  return (
    <>
      <LoadingBar
        progress={progress}
        background={progress > 0 && progress !== 100 && "green"}
      />
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
          <button disabled={!title}>Add File</button>
        </form>
      </div>
    </>
  );
}
