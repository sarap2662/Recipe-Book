import React from "react";
import "./pages.css";
import HomeStyle from "./homeStyle";

export default function Home() {
  return (
    <>
      <div className="intro">
        <h1>Welcome to the Recipe Book</h1>
      </div>
      <div>
        <HomeStyle />
      </div>
    </>
  );
}
