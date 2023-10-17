import React, { useEffect } from "react";
import DefaultCardLogo from "assests/card/default_card_logo.svg";
import { useRecoilState } from "recoil";

// STORE
import { card as storeCard } from "store/card";
// COMPONENT
import Alignment from "./components/alignment";

function Component() {
  const [defaultCard, setDefaultCard] = useRecoilState(storeCard);

  useEffect(() => {}, [defaultCard]);
  function card() {
    return (
      <div
        className="flex flex-col space-y-3 rounded-lg h-52 w-96 px-[30px] py-5"
        style={{
          background: defaultCard.backgroundImage
            ? defaultCard.backgroundImage
            : defaultCard.backgroundColor
            ? defaultCard.backgroundColor
            : "#091323",
          alignItems: defaultCard.alignment || "center",
          justifyContent: defaultCard.alignment || "center",
        }}
      >
        <img
          src={defaultCard.logo || DefaultCardLogo}
          alt="card_logo"
          className="!w-12 !h-12"
        />
        <div className="text-white w-[max-content] text-center">
          {defaultCard.frontText || "Your name here"}
        </div>
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
      <div className="flex flex-col w-full">
        <div className="sticky top-0 w-full h-[30vh] flex justify-center py-5">
          {card()}
        </div>

        <Alignment />
      </div>
    );
  }
  return (
    <div className="">
      {/* MÀN HÌNH FULL */}
      <div className="hidden md:flex">{landscapeLayout()}</div>

      {/* MÀN HÌNH THU GỌN */}
      <div className="flex md:hidden">{portraitLayout()}</div>
    </div>
  );
}

export default Component;
