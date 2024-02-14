import React, { useContext } from "react";
import "../styles/navbar.style.css";
import { FolderContext } from "../context/folders.context";
import { FileContext } from "../context/files.context";
export default function Navbar() {
  const { allFolders } = useContext(FolderContext);
  const { allFiles } = useContext(FileContext);
  return (
    <div className="navbar-container">
      <div className="navbar-midcontainer">
        <p>Total Files: {allFiles?.length}</p>
        <p>Total Folders: {allFolders?.length}</p>
      </div>
    </div>
  );
}
