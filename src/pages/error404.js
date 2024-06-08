import React from "react";
import "./pages.css";
import ErrorPage from "../components/errorPage";

export default function Error404() {
  return (
    <>
      <div className="intro">
        <p>Page Not Found</p>
      </div>
      <div>
        <ErrorPage />
      </div>
    </>
  );
}
