import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFolderData } from "../utils/getFolderWithName";
export default function OpenFolder() {
  const { folderName } = useParams();

  const [folder, setFolder] = useState({});

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
  }, [folderName]);

  if (!folderName) {
    return null;
  }

  return (
    <div>
      <p>{folder?.title}</p>
    </div>
  );
}
