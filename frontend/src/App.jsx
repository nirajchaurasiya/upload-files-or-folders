import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeElem from "./components/HomeElem.component";
import { LoaderContext } from "./context/Loader.context";
export default function App() {
  const { loader, setLoader } = useContext(LoaderContext);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<HomeElem />} />
          <Route path="/file/:fileName" exact element={<HomeElem />} />
          <Route path="/folder/:folderName" exact element={<HomeElem />} />
        </Routes>
      </Router>
    </div>
  );
}
