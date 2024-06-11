import React from "react";
import HomeBackground from "../images/dinner.jpg";
import "../views/pages.css";
import { Image } from "react-bootstrap";

function HomeStyle() {
  return (
    <div className="homeImage">
      <Image width="100%" src={HomeBackground} fluid />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="intro">
        <h1>Welcome to your Recipe Book</h1>
      </div>
      <div>
        <HomeStyle />
      </div>
    </>
  );
}
