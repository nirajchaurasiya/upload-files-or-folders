import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const FileContext = createContext();

const FileContextProvider = ({ children }) => {
  const [allFiles, setAllFiles] = useState([]);
  const getAllFiles = async () => {
    try {
      await axios
        .get("/backend-url/api/v1/get-files")
        .then((data) => {
          setAllFiles(data.data.data);
        })
        .catch((err) => {
          console.log(
            `Something went wrong while getting all the files `,
            err?.message
          );
        });
    } catch (error) {
      console.log(
        `Something went wrong while getting all the files `,
        error?.message
      );
    }
  };

  useEffect(() => {
    getAllFiles();
  }, []);

  return (
    <FileContext.Provider value={{ allFiles, setAllFiles, getAllFiles }}>
      {children}
    </FileContext.Provider>
  );
};
export default FileContextProvider;
