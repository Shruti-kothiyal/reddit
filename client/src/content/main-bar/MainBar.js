import React, {useState,useEffect} from "react";
import LeftBar from "./LeftBar";

export default function MainBar() {
    return(
        <div className="main-bar">
            <LeftBar/>
            {/* <RightBar/> */}
        </div>
    )
}