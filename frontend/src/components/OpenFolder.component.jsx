import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getFolderData } from "../utils/getFolderWithName";
export default function OpenFolder() {
  const { folderName } = useParams();
  const [folder, setFolder] = useState({});
  const location = useLocation();
  const fileValue = location.search.slice(6);
  useEffect(() => {
    const getFolder = async (folderName) => {
      if (folderName) {
        const folder = await getFolderData(folderName);
        if (folder && folder.data) {
          setFolder(folder.data);
        }
      }
    };
    getFolder(folderName);
  }, [folderName, fileValue]);

  if (folderName && fileValue) {
    return null;
  }

  return (
    <div>
      {fileValue || folderName ? (
        <p
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          {folder?.title}
        </p>
      ) : (
        <p
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Please click on a file to see!
        </p>
      )}
    </div>
  );
}
