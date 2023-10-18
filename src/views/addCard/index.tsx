import React, { useEffect } from "react";
import DefaultCardLogo from "assests/card/default_card_logo.svg";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

// STORE
import { card as storeCard } from "store/card";
// COMPONENT
import Alignment from "./components/alignment";
import Background from "./components/background";
import Logo from "./components/logo";
import FrontText from "./components/frontName";
import BackText from "./components/backName";

function Component() {
  const navigate = useNavigate();
  const [defaultCard] = useRecoilState(storeCard);
  function handleBack() {
    return navigate(-1);
  }
  useEffect(() => {}, [defaultCard]);
  function card() {
    return (
      <div
        className="flex flex-col space-y-3 rounded-lg h-[176px] w-[280px] px-[30px] py-5"
        style={{
          background: defaultCard.backgroundImage
            ? defaultCard.backgroundImage
            : defaultCard.backgroundColor
            ? defaultCard.backgroundColor
            : "#091323",
          alignItems: defaultCard.alignment || "center",
          justifyContent: defaultCard.alignment !=='center' ? "end" : "center",
        }}
      >
        {defaultCard.enableLogo && (
          <img
            src={defaultCard.logo || DefaultCardLogo}
            alt="card_logo"
            className="!w-12 !h-12"
          />
        )}
        {defaultCard.enableFrontText && (
          <div className="text-white w-[max-content] text-center">
            {defaultCard.frontText || "Your name here"}
          </div>
        )}
      </div>
    );
  }

  function landscapeLayout() {
    return (
      <div className="flex">
        <div className="w-1/3">{card()}</div>
        <div className="w-2/3"></div>
      </div>
    );
  }

  function portraitLayout() {
    return (
      <div className="flex flex-col items-center w-full ">
        <div className="w-full px-5 py-5 space-y-3 sm:w-2/3">
          <div className="sticky z-50 flex justify-center w-full top-5 h-52">
            {card()}
          </div>
          <Alignment />
          <Background />
          <Logo />
          <FrontText />
          <BackText />
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <Icon
        className="absolute top-[33px] z-10 cursor-pointer text-lg 3xs:left-3  text-white"
        icon="ep:back"
        onClick={handleBack}
      />
      {/* MÀN HÌNH FULL */}
      <div className="hidden md:flex">
        {/* {landscapeLayout()} */}
        {portraitLayout()} 
        </div>

      {/* MÀN HÌNH THU GỌN */}
      <div className="flex md:hidden">{portraitLayout()}</div>
    </div>
  );
}

export default Component;
