import React from "react";
import "./index.scss";
import Banner from "assests/landing/footer_banner.svg";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  
  return (
    <div className="w-full space-x-2 footer">
      <span className="<2xs:!text-[8px]">Powered by </span>
      <img src={Banner} className="h-4 <xs:w-28 w-36 cursor-pointer" alt="Banner" onClick={() => navigate("/")}/>
      <span className="<2xs:!text-[8px]"> &copy; &trade; 2023</span>
    </div>
  );
}

export default Footer;
