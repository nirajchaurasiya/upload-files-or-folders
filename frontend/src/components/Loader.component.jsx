import React from "react";
import "../styles/loader.style.css";
export default function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner">
        <div className="spinner-bg">
          <div className="rotate"></div>
        </div>
      </div>
    </div>
  );
}
