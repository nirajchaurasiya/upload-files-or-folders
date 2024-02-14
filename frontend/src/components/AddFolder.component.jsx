import React, { useContext, useState } from "react";
import "../styles/add-folder.style.css";
import { addFolder } from "../utils/addFolder";
import { useParams } from "react-router-dom";
import { FolderContext } from "../context/folders.context";
import Loader from "./Loader.component";
import { LoaderContext } from "../context/Loader.context";
export default function AddFolder() {
  const { allFolders, setAllFolders, getAllFolders } =
    useContext(FolderContext);
  const { loader, setLoader } = useContext(LoaderContext);
  const [title, setTitle] = useState("");
  const { folderName } = useParams();
  async function handleAddFolder(e) {
    e.preventDefault();

    const checkIfFileExists = allFolders?.find(
      (folder) =>
        folder?.title?.toLowerCase()?.trim() === title?.toLowerCase()?.trim()
    );

    if (checkIfFileExists) {
      alert(`File exists`);
    }

    if (title && !checkIfFileExists) {
      setLoader(!loader);
      await addFolder(title, folderName)
        .then((data) => {
          if (data) {
            setAllFolders(data.data);
          }
        })
        .catch((err) => {
          console.log(err.message || "Something went wrong");
        })
        .finally(() => {
          setLoader(false);
          setTitle("");
        });
    }
  }
  return (
    <>
      <div className="add-folder-container">
        <form onSubmit={handleAddFolder}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            id="name"
            placeholder="Enter folder name"
          />
          <button disabled={!title || loader}>Add Folder</button>
        </form>
      </div>

      <div>{loader && <Loader />}</div>
    </>
  );
}
