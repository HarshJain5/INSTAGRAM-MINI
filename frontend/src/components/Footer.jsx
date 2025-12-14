import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { BiGroup } from "react-icons/bi";
import './Footer.css'; // optional for styling

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUserId = localStorage.getItem("userId");

  // Login aur Signup page par footer hide karne ke liye
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null; // Footer render hi nahi hoga
  }

  return (
    <div className="footer">
      <div className="footer-icon" onClick={() => navigate("/feed")}>
        <AiFillHome size={28} />
        <span>Home</span>
      </div>
      <div className="footer-icon" onClick={() => navigate("/create")}>
        <FaPlusCircle size={28} />
        <span>Create</span>
      </div>
      <div className="footer-icon" onClick={() => navigate("/allusers")}>
        <BiGroup size={28} />
        <span>Users</span>
      </div>
      <div className="footer-icon" onClick={() => navigate(`/profile/${currentUserId}`)}>
        <BsPersonFill size={28} />
        <span>Profile</span>
      </div>
    </div>
  );
};


export default Footer;
