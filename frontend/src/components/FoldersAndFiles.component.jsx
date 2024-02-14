import React, { useContext, useEffect, useState } from "react";
import "../styles/folder.style.css";
import { FolderContext } from "../context/folders.context";
import { FileContext } from "../context/files.context";
import Folder from "./Folder.component";
import File from "./Files.component";
import { useParams } from "react-router-dom";
import { getFolderData } from "../utils/getFolderWithName";
export default function FoldersAndFiles() {
  const [subFolders, setSubFolders] = useState({});
  const { allFolders, setAllFolders, getAllFolders } =
    useContext(FolderContext);
  const { fileName, folderName } = useParams();
  const { allFiles, setAllFiles, getAllFiles } = useContext(FileContext);
  const [doesnotExist, setDoesnotExist] = useState(false);
  useEffect(() => {
    async function getFilesAndFolders(folderName) {
      if (folderName) {
        const folder = await getFolderData(folderName);
        !folder && setDoesnotExist(!doesnotExist);
        if (folder && folder.data) {
          setSubFolders(folder.data);
        }
      }
    }
    getFilesAndFolders(folderName);
    setDoesnotExist(false);
  }, [fileName, folderName, allFolders?.length, allFiles?.length]);

  return (
    <div className="folder-container">
      {allFiles.length === 0 && allFolders.length === 0 && (
        <p>No Folder or File</p>
      )}
      {folderName &&
        subFolders?.folders?.length === 0 &&
        subFolders?.files?.length === 0 && (
          <div className="folders">No Folder or File found</div>
        )}
      {!folderName ? (
        <>
          <div className="folders">
            {allFolders?.map((e, _index) => (
              <Folder key={_index} home data={e} />
            ))}
          </div>
          <div className="files">
            {allFiles?.map((e, _index) => (
              <File key={_index} home data={e} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="folders">
            {subFolders?.folders?.map((e, _index) => (
              <Folder key={_index} data={e} />
            ))}
          </div>
          <div className="files">
            {subFolders?.files?.map((e, _index) => (
              <File key={_index} data={e} />
            ))}
          </div>
        </>
      )}
      {doesnotExist && <p>Doesn't exists</p>}
    </div>
  );
}
