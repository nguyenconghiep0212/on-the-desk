import React from "react";
import "./index.css";
import Banner from "assests/footer_banner.svg";

function Footer() {
  return (
    <div className="space-x-2 footer">
      <span className="<xxs:!text-[6px]">Powered by </span>
      <img src={Banner} className="h-4 " alt="Banner" className="<xs:w-28 w-36"/>
      <span className="<xxs:!text-[6px]"> &copy; &trade; 2023</span>
    </div>
  );
}

export default Footer;
