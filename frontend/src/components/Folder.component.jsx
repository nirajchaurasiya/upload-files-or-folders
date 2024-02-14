import React from "react";
import { Link } from "react-router-dom";
export default function Folder({ data, home }) {
  if (home && data && data.type > 0) return null;
  return (
    <Link to={`/folder/${data?.title}`}>
      <div key={data} className="folder">
        <div className="folder-icon-arrow">
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            viewBox="0 0 12 12"
            width="12"
            height="12"
            fill="currentColor"
          >
            <path d="M4.7 10c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1L6.9 6 4.2 3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l3.3 3.2c.3.3.3.8 0 1.1L5.3 9.7c-.2.2-.4.3-.6.3Z"></path>
          </svg>
        </div>
        <div className="folder-icon">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z"></path>
          </svg>
        </div>
        <div className="folder-name">{data?.title}</div>
      </div>
    </Link>
  );
}
