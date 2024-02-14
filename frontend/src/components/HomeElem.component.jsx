import React from "react";
import AddFile from "./AddFile.component";
import AddFolder from "./AddFolder.component";
import FoldersAndFiles from "./FoldersAndFiles.component";
import OpenFile from "./OpenFile.component";
import OpenFolder from "./OpenFolder.component";

export default function HomeElem() {
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
        <OpenFile />
        <OpenFolder />
      </div>
    </div>
  );
}
