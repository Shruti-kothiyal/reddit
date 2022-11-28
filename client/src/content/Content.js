import React from "react";

import "./Content.css";
import MainBar from "./main-bar/MainBar";
import SideBar from "./side-bar/SideBar";

export default function Content() {
  return (
    <div className="content">
      {/* <TrendingToday /> */}
      <div className="bars-wrapper">
        <div className="bars-wrapper-inside">
            <SideBar />
            <MainBar />
        </div>
      </div>
    </div>
  );
}
