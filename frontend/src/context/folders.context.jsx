import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const FolderContext = createContext();

const FolderContextProvider = ({ children }) => {
  const [allFolders, setAllFolders] = useState([]);

  const getAllFolders = async () => {
    try {
      await axios
        .get("/backend-url/api/v1/get-folders")
        .then((data) => {
          setAllFolders(data.data.data);
        })
        .catch((err) => {
          console.log(`Err `, err.message);
        });
    } catch (error) {
      console.log(
        `Something went wrong while getting all the folders `,
        error?.message
      );
    }
  };

  useEffect(() => {
    getAllFolders();
  }, []);

  return (
    <FolderContext.Provider
      value={{ allFolders, setAllFolders, getAllFolders }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export default FolderContextProvider;
