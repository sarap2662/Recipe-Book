import React from "react";
import ErrorBackground from "../images/error404.jpg";
import { Image } from "react-bootstrap";
import "../views/pages.css";

function ErrorPage() {
  return (
    <div className="errorImage">
      <Image width="100%" src={ErrorBackground} fluid />
    </div>
  );
}

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
