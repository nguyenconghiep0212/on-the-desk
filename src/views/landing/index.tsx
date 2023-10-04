import React, { useEffect } from "react";
import "./index.scss";
// COMPONENTS
import Header from "./components/header";
import Product from "./components/product";
// ASSETS
import Ribbon1 from "assests/landing/ribbon_1.svg";
import Ribbon2 from "assests/landing/ribbon_2.svg";


function Landing() {

  return (
    <div className="bg-[#1E2530] relative z-3 overflow-x-clip">
      {/* RIBBON 1 */}
      <div className="absolute top-[15%] z-2">
        <img src={Ribbon1} alt="ribbon1" className="w-[100vw] scale-y-75" />
        <div className="translate-x-[35vw] -translate-y-[15vh] shadow-lg" />
      </div>

      {/* RIBBON 2 */}
      <div className="absolute top-[75%] z-2">
        <img src={Ribbon2} alt="ribbon1" className="w-[100vw] scale-y-75" />
        <div className="translate-x-[65vw] -translate-y-[10vh] shadow-lg" />
      </div>

      {/* CONTENT */}
      <div>
        <div className="fixed top-0 w-full 3xl:px-20 3xl:py-[22px] desktop:px-[60px] py-[22px] px-10  backdrop-blur z-50">
          <Header />
        </div>

        <div className="relative z-3  m-auto <xs:px-10 xs:w-[95%] 3xl:!w-[75%]">
          <Product />
        </div>
      </div>
    </div>
  );
}

export default Landing;
