import React from "react";
import AddFile from "./AddFile.component";
import AddFolder from "./AddFolder.component";
import FoldersAndFiles from "./FoldersAndFiles.component";
import OpenFile from "./OpenFile.component";
import OpenFolder from "./OpenFolder.component";
import { useLocation, useParams } from "react-router-dom";
export default function HomeElem() {
  const { fileName } = useParams();
  const location = useLocation();
  const fileValue = location.search.slice(6);
  return (
    <div>
      <div
        className="body-container"
        style={{
          display: "flex",
          justifyContent: "center",
          borderBottom: `1px solid rgb(77, 75, 75)`,
        }}
      >
        <AddFile />
        <AddFolder />
      </div>
      <div className="folders-container" style={{ display: "flex" }}>
        <FoldersAndFiles />
        {fileValue || fileName ? <OpenFile /> : <OpenFolder />}
      </div>
    </div>
  );
}
