import React from "react";
import "./pages.css";
import ErrorPage from "../components/errorPage";

export default function Error404() {
  return (
    <>
      <div className="intro">
        <h1></h1>
        <p>Page Not Found</p>
      </div>
      <div>
        <ErrorPage />
      </div>
    </>
  );
}
