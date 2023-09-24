import React, { useEffect } from "react";
import { fetchLandingData } from "api/index";
// COMPONENTS

function Landing() {
  async function getCat() {
    const params = {
      limit: 10,
      offset: 0,
    };
    const res = await fetchLandingData(params);
    if(res){
      console.log(res)
    }
  }

  useEffect(() => {
    getCat()
  }, [])
  return <div className="text-white"> THIS IS LANDING PAGE </div>;
}

export default Landing;
