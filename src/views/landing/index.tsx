import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import "./index.css";
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
    <div className="text-white">
      <Header />
      {tab === "product" ? <Product /> : <div></div>}
    </div>
  );
}

export default Landing;
