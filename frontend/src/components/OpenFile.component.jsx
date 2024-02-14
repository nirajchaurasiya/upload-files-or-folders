import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFileData } from "../utils/getFileWithName";
export default function OpenFile() {
  const { fileName } = useParams();
  const [file, setFile] = useState({});
  useEffect(() => {
    async function getFile(fileName) {
      const file = await getFileData(fileName);
      if (file?.data) {
        setFile(file.data);
      }
    }
    getFile(fileName);
  }, [fileName]);

  if (!fileName) {
    return null;
  }
  return (
    <div>
      <p>{file?.title}</p>
    </div>
  );
}
