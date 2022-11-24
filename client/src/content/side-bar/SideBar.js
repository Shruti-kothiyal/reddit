import React from "react";
import "./SideBar.css";
import HomeIcon from '@mui/icons-material/Home';
import CallMadeIcon from '@mui/icons-material/CallMade';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SportsBaseballOutlinedIcon from '@mui/icons-material/SportsBaseballOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

export default function SideBar() {
  return (
    <div className="side-bar">
        <div>Feeds
            <p><HomeIcon/>Home</p>
            <p><CallMadeIcon/>Popular</p>
        </div>
        <div>
            Topics
            <p><SportsEsportsOutlinedIcon/>Gaming</p>
            <p><SportsBaseballOutlinedIcon/>Sports</p>
            <p><TrendingUpOutlinedIcon/>Buisness, Economics,...</p>
            <p><SportsSoccerOutlinedIcon/>Crypto</p>
            <p><TvOutlinedIcon/>Television</p>
            <p><StarBorderOutlinedIcon/>Celebrity</p>
        </div>
    </div>
  );
}
