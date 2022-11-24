import React from "react";

import "./Actions.css";
import SignInButton from '../Buttons/SignInButton';
import SignUpButton from '../Buttons/SignUpButton';

import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Actions() {
  return (
    <div className="actions">
      <SignUpButton/>
      <SignInButton/>
      <div className="profile">
        <PersonIcon className="hoverable" />
        <ArrowDropDownIcon className="hoverable" />
      </div>
    </div>
  );
}
