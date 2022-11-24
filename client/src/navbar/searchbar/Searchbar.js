import React from "react";

import "./Searchbar.css";

import SearchIcon from '@mui/icons-material/Search';

export default function Searchbar() {
  return (
    <div className="searchbar">
      <label htmlFor="searchbar">
        <SearchIcon />
      </label>
      <input id="searchbar" placeholder="Search Reddit" />
    </div>
  );
}
