import { Button } from "antd";
import React from "react";
import { mock_card } from "./cardPresets";
import DefaultCardLogo from "assests/card/default_card_logo.svg";
import IcCard from "assests/icon/ic-card.svg";
import { useNavigate } from "react-router-dom";

function Component({ userInfo }) {
    const navigate = useNavigate();

    function handleAddCard() {
        navigate(`/${userInfo.shortcut}/addCard`);
      }
  return (
    <div>
      <div
        className=" flex h-[176px] w-[280px] cursor-pointer flex-col space-y-3 rounded-lg px-[30px] py-5"
        style={
          mock_card.backgroundImage
            ? {
                alignItems: mock_card.alignment || "center",
                justifyContent:
                  mock_card.alignment === "end" ||
                  mock_card.alignment === "start"
                    ? "end"
                    : "center",
                backgroundImage: `url('${mock_card.backgroundImage}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : {
                background: mock_card.backgroundColor || "#0913239c",
                alignItems: mock_card.alignment || "center",
                justifyContent:
                  mock_card.alignment === "end" ||
                  mock_card.alignment === "start"
                    ? "end"
                    : "center",
              }
        }
      >
        <img
          src={mock_card.logo || DefaultCardLogo}
          alt="card_logo"
          className="!h-12 !w-12"
        />
        <div className="w-[max-content] text-center text-white">
          {mock_card.frontText || "Your name here"}
        </div>
      </div>
      {/* Action */}
      <div className="flex justify-center mt-2">
        <Button
          className="gradient_btn flex cursor-pointer items-center space-x-1 rounded-lg px-[9px] py-[6px]  text-[12px] font-semibold text-white !shadow-none"
          onClick={() => {
            handleAddCard();
          }}
        >
          <img src={IcCard} alt="add_card" className="!h-[18px] !w-[18px]" />
          <span>Thêm thẻ</span>
        </Button>
      </div>
    </div>
  );
}

export default Component;
