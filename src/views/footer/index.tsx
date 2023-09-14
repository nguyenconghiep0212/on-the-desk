import React from "react";
import "./index.css";
import Banner from "assests/banner_footer.png";

function Footer() {
  return (
    <div className="footer">
      <span>Power by </span>
      <img src={Banner} alt="Banner"/>
      <span> &copy; &trade; 2023</span>
    </div>
  );
}

export default Footer;
