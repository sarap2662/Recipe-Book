import React from "react";
import ErrorBackground from "../error404.jpg";
import Image from "react-bootstrap/Image";

export default function ErrorPage() {
  return (
    <div className="errorImage">
      <Image width="100%" src={ErrorBackground} fluid />
    </div>
  );
}
