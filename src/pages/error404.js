import React from "react";
import "./pages.css";
import ErrorPage from "../components/errorPage";

export default function Error() {
  return (
    <>
      <div className="intro">
        <h1>404</h1>
        <p>Page Not Found</p>
      </div>
      <div>
        <ErrorPage />
      </div>
    </>
  );
}
