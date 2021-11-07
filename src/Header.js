import React from "react";
import "./header.css";
import SearchIcon from "@mui/icons-material/Search";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, Button } from "@mui/material";

function Header({ photoURL, signOut }) {
  return (
    <div className="header">
      <div className="header-left">
        <img
          src="https://icons.iconarchive.com/icons/marcus-roberto/google-play/512/Google-Drive-icon.png"
          alt="google icon"
        />
        <span>Drive</span>
      </div>
      <div className="header-middle">
        <SearchIcon />
        <input type="text" placeholder="search in drive" />
        <FormatAlignCenterIcon />
      </div>
      <div className="header-right">
        <HelpCenterIcon />
        <SettingsIcon />
        <Avatar src={photoURL} alt="Profile Pic" className="avatar" />
        <div>
          <Button onClick={signOut}>Logout</Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
