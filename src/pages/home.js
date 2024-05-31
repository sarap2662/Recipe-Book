import React from "react";
import "./pages.css";
import HomeStyle from "../components/homeStyle";

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
