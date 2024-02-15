import React, { useEffect, useState } from "react";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import { getFileData } from "../utils/getFileWithName";
import Loader from "./Loader.component";
export default function OpenFile() {
  const { fileName } = useParams();
  const [filedata, setFile] = useState({});
  const [loader, setLoader] = useState(true);
  const location = useLocation();
  const fileValue = location.search.slice(6);
  useEffect(() => {
    async function getFile(fileName, fileValue) {
      if (fileValue) {
        const file = await getFileData(fileValue);
        const fileData = file?.data;
        if (fileData) {
          setFile(file.data);
        }
        setLoader(false);
      } else {
        const file = await getFileData(fileName);
        const fileData = file?.data;
        if (fileData) {
          setFile(file.data);
        }
        setLoader(false);
      }
    }
    setLoader(true);
    getFile(fileName, fileValue);
  }, [fileName, fileValue]);

  if (!(fileName || fileValue)) {
    return null;
  }

  return loader ? (
    <Loader />
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      {filedata?.title?.split(".").map((file) => {
        if (
          !(
            file === "png" ||
            file === "mp3" ||
            file === "mp4" ||
            file === "jpg" ||
            file === "mkv"
          )
        )
          return null;
        console.log(file);
        return (
          <div key={file}>
            {(file === "png" || file === "jpg" || file === "jpeg") && (
              <img
                style={{
                  width: "600px",
                  maxWidth: "80%",
                  backgroundColor: "gray",
                }}
                src={filedata?.url}
                alt="Image"
              />
            )}
            {file === "mp3" && <audio src={filedata?.url} controls></audio>}
            {file === "mp4" ||
              (file === "mkv" && (
                <video
                  style={{ width: "600px" }}
                  src={filedata?.url}
                  controls
                  autoPlay
                ></video>
              ))}
          </div>
        );
      })}
    </div>
  );
}
