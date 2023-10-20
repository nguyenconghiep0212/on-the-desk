import React, { useEffect } from "react";
import DefaultCardLogo from "assests/card/default_card_logo.svg";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button } from "antd";
// STORE
import { card as storeCard } from "store/addCard";
// COMPONENT
import Alignment from "./components/alignment";
import Background from "./components/background";
import Logo from "./components/logo";
import FrontText from "./components/frontName";
import BackText from "./components/backName";
import PackageSeletion from "./components/packageSelection";
import Profile from "./components/profile";

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
          justifyContent:
            defaultCard.alignment === "end" || defaultCard.alignment === "start"
              ? "end"
              : "center",
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
          <div
            className="text-white w-[max-content] text-center"
            style={{ fontFamily: defaultCard.fontFamily || "Montserrat" }}
          >
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
        <div className="sticky top-0 z-20 flex justify-center w-full p-3 backdrop-blur h-52">
          <Icon
            className="absolute top-[33px] z-50 cursor-pointer text-lg 3xs:left-3  text-white"
            icon="ep:back"
            onClick={handleBack}
          />
          {card()}
        </div>
        <div className="w-full px-5 py-5 space-y-3 sm:w-2/3">
          <Alignment />
          <Background />
          <Logo />
          <FrontText />
          <BackText />
          <div className="space-x-2 text-right">
            <Button>Thoát</Button>
            <Button className="gradient_btn">Xem trước</Button>
          </div>
          <PackageSeletion />
          <Profile />
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      {/* MÀN HÌNH FULL */}
      <div className="hidden md:flex">
        {/* {landscapeLayout()} */}
        {portraitLayout()}
      </div>

      {/* MÀN HÌNH THU GỌN */}
      <div className="flex md:hidden">{portraitLayout()}</div>

      <div className="sticky ml-[auto] w-[max-content] bottom-[4.5rem] z-10">
        <div
          style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.60)" }}
          className="bg-[#1E2530] mr-5 cursor-pointer rounded-full flex justify-center items-center w-[50px] h-[50px] "
        >
          <Icon
            className="text-lg text-primary-blue-medium"
            icon="tabler:check"
          />
        </div>
      </div>
    </div>
  );
}

export default Component;
