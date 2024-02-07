import React, { useEffect } from "react";
import Header from "./header";
import Footer from "components/footer/index";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedMenuStore,
  userCardStore,
  userInfoStore,
} from "store/profileMenu";

// COMPONENT
import DynamicComponent from "./dynamicComponents.tsx";
import { getCardByUserProfile, getUserProfile } from "api";
import { useParams } from "react-router-dom";

function Component() {
  const pathParams = useParams();

  const [menu] = useRecoilState(selectedMenuStore);
  const setUserInfo = useSetRecoilState(userInfoStore);
  const setCardList = useSetRecoilState(userCardStore);

  async function fetchCardList() {
    const res = await getCardByUserProfile();
    if (res) {
      setCardList(res.data);
    }
  }
  async function fetchUserInfo() {
    let res: any = {};
    res = await getUserProfile(pathParams.userShortcut);
    if (res) {
      setUserInfo(res.data);
    }
  }
  useEffect(() => {
    fetchCardList();
    fetchUserInfo();
  }, []);
  
  useEffect(() => {}, [menu]);
  return (
    <div className="flex min-h-[100vh] flex-col bg-[#1E2530] ">
      <Header />
      <div className="flex-grow px-5 py-6">
        <DynamicComponent is={menu} />
      </div>

      <div className="sticky bottom-0 z-50 bg-black bg-opacity-50 backdrop-blur">
        <Footer />
      </div>
    </div>
  );
}

export default Component;
