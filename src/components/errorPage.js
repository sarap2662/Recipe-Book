import React from "react";
import HomeBackground from "../error404.jpg";
import Image from "react-bootstrap/Image";

export default function errorPage() {
  return (
    <div className="errorImage">
      <Image width="100%" src={HomeBackground} fluid />
    </div>
  );
}
