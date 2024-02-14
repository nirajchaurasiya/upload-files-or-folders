import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import FoldersContextProvider from "./context/folders.context.jsx";
import FilesContextProvider from "./context/files.context.jsx";
import { LoaderContextProvider } from "./context/Loader.context.jsx";

const rootDOM = document.getElementById("root");

const createRoot = ReactDOM.createRoot(rootDOM);

createRoot.render(
  <React.StrictMode>
    <FoldersContextProvider>
      <FilesContextProvider>
        <LoaderContextProvider>
          <App />
        </LoaderContextProvider>
      </FilesContextProvider>
    </FoldersContextProvider>
  </React.StrictMode>
);
