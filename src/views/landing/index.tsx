import React, { useEffect } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
// API
// import { fetchLandingData } from "api/index";
// COMPONENTS
import Header from "./components/header";
// STORE
import { textState } from "store/root.ts";

function Landing() {
  const [text] = useRecoilState(textState);

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
      {text}
      <Header />
    </div>
  );
}

export default Landing;
