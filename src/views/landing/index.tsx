import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import "./index.scss";
// API
// import { fetchLandingData } from "api/index";
// COMPONENTS
import Header from "./components/header";
import Product from "./components/product";
// STORE
import { currentTab } from "store/root.ts";

function Landing() {
  const [tab] = useRecoilState(currentTab);

  // async function getCat() {
  //   const params = {
  //     limit: 10,
  //     offset: 0,
  //   };
  //   const res = await fetchLandingData(params);
  //   if(res){
  //     console.log(res)
  //   }
  // }

  return (
    <div className="bg-[#1E2530]">
      <Header />
      <div className="mt-20 px-[7.5rem]">{tab === "product" ? <Product /> : <div></div>}</div>
    </div> 
  );
}

export default Landing;
