import React from "react";
import AddBackground from "../spices.jpg";
import Image from "react-bootstrap/Image";

export default function AddStyle() {
  return (
    <div className="addImage">
      <Image width="100%" src={AddBackground} fluid />
    </div>
  );
}
