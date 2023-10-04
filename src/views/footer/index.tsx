import React from "react";
import "./index.scss";
import Banner from "assests/landing/footer_banner.svg";

function Footer() {
  return (
    <div className="space-x-2 footer">
      <span className="<3xs:!text-[6px]">Powered by </span>
      <img src={Banner} className="h-4 <xs:w-28 w-36" alt="Banner" />
      <span className="<3xs:!text-[6px]"> &copy; &trade; 2023</span>
    </div>
  );
}

export default Footer;
