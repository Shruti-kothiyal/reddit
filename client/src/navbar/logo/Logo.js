import React from "react";
import RedditIcon from '@mui/icons-material/Reddit';
import "./Logo.css";
import {useNavigate} from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();
    const handleSubmit =()=>{
        navigate('/homepage')
    }
  return (
    <div className="logo hoverable">
      <RedditIcon 
        onClick={handleSubmit}
      />
      <span>reddit</span>
    </div>
  );
}
