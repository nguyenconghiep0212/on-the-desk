import React from "react";
import "./index.css";
import Banner from "assests/footer_banner.svg";

function Footer() {
  return (
    <div className="space-x-2 footer">
      <span>Power by </span>
      <img src={Banner} className="h-4 " alt="Banner"/>
      <span> &copy; &trade; 2023</span>
    </div>
  );
}

export default Footer;
