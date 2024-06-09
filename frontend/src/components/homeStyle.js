import React from "react";
import HomeBackground from "../dinner.jpg";
import Image from "react-bootstrap/Image";

export default function HomeStyle() {
  return (
    <div className="homeImage">
      <Image width="100%" src={HomeBackground} fluid />
    </div>
  );
}
