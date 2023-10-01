import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import "./index.scss";
// COMPONENTS
import Header from "./components/header";
import Product from "./components/product";
// ASSETS
import Ribbon1 from "assests/landing/ribbon_1.svg";
import Ribbon2 from "assests/landing/ribbon_2.svg";
// STORE
import { currentTab } from "store/root.ts";

function Landing() {
  const [tab] = useRecoilState(currentTab);

  return (
    <div className="bg-[#1E2530] relative z-2">
      {/* RIBBON 1 */}
      <div className="absolute top-[15%] z-1">
        <img src={Ribbon1} alt="ribbon1" className="w-[100vw] scale-y-75" />
        <div className="translate-x-[100%] -translate-y-[190%] shadow-lg" />
      </div>

      {/* RIBBON 2 */}
      <div className="absolute top-[75%] z-1">
        <img src={Ribbon2} alt="ribbon1" className="w-[100vw] scale-y-75" />
        <div className="translate-x-[135%] -translate-y-[100%] shadow-lg" />
      </div>

      {/* CONTENT */}
      <div className="w-2/3 m-auto">
        <Header />
        <div className="relative z-2">
          {tab === "product" ? <Product /> : <div></div>}
        </div>
      </div>
    </div>
  );
}

export default Landing;
