import React, { useEffect, useState } from "react";
import DefaultCardLogo from "assests/card/default_card_logo.svg";
import IcCard from "assests/icon/ic-card.svg";
import { useNavigate } from "react-router-dom";
import { Button, Popover } from "antd";
import { getCardByUserProfile, deleteCard } from "api/index.ts";
// INTERFACE
import { CARD } from "interface/card.ts";

// MOCK
import { mock_card } from "./mock.ts";

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Icon } from "@iconify/react";

function Component({ userInfo }) {
  const navigate = useNavigate();
  const [cardList, setCardList] = useState<CARD[]>([]);
  async function fetchCardList() {
    const res = await getCardByUserProfile();
    if (res) {
      if (res.data.length) {
        setCardList(res.data);
      }
    }
  }
  function handleAddCard() {
    navigate(`/${userInfo.shortcut}/addCard`);
  }
  async function handleDeleteCard(card) {
    const res = await deleteCard(card.id);
    if (res) {
      fetchCardList();
    }
  }
  useEffect(() => {
    fetchCardList();
  }, []);
  function Card(card) {
    return (
      <div
        className=" flex flex-col space-y-3 rounded-lg h-[176px] w-[280px] px-[30px] py-5"
        style={{
          background: card.backgroundImage
            ? card.backgroundImage
            : card.backgroundColor
            ? card.backgroundColor
            : "#091323",
          alignItems: card.alignment || "center",
          justifyContent:
            card.alignment === "end" || card.alignment === "start"
              ? "end"
              : "center",
        }}
      >
        <img
          src={card.logo || DefaultCardLogo}
          alt="card_logo"
          className="!w-12 !h-12"
        />
        <div className="text-white w-[max-content] text-center">
          {card.frontText || "Your name here"}
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex justify-center h-[320px] bg-[#18191A]">
      <Swiper
        className=" z-1"
        slidesPerView={1}
        pagination={true}
        modules={[Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {cardList.length
          ? cardList.map((item, index) => (
              <div key={index}>
                <SwiperSlide className="!flex flex-col justify-center items-center space-y-4 py-3 !bg-[inherit] !h-[inherit]">
                  {Card(item)}
                  {/* Action */}
                  {userInfo.isOwner && (
                    <div className="flex space-x-8">
                      <div
                        className="cursor-pointer flex items-center space-x-1 bg-opacity-20 text-[12px] font-semibold bg-white text-white border-white border rounded-lg px-[9px] py-[6px]"
                        onClick={() => {
                          handleAddCard();
                        }}
                      >
                        <img
                          src={IcCard}
                          alt="add_card"
                          className="!w-[18px] !h-[18px]"
                        />
                        <span>Thêm thẻ</span>
                      </div>
                      <div className="cursor-pointer bg-opacity-20 text-[12px] font-semibold bg-white text-white border-white border rounded-lg px-[9px] py-[6px]">
                        <span>Cấp lại</span>
                      </div>
                      <Popover
                        className="text-white"
                        content={
                          <div className="space-y-2">
                            <span className="text-white">Bạn chắc chắn muốn xóa thẻ này?</span>
                            <div className="text-right">
                              <Button
                                className="!shadow-sm gradient_btn"
                                onClick={() => handleDeleteCard(item)}
                              >
                                Xóa
                              </Button>
                            </div>
                          </div>
                        }
                        trigger="click"
                      >
                        <div className="cursor-pointer flex 2items-center space-x-1 bg-opacity-20 text-[12px] font-semibold bg-white text-white border-white border rounded-lg px-[9px] py-[6px]">
                          <Icon
                            icon="tabler:trash"
                            className="!w-[18px] !h-[18px] text-[#EB5757]"
                          />
                        </div>
                      </Popover>
                    </div>
                  )}
                </SwiperSlide>
              </div>
            ))
          : [mock_card].map((item, index) => (
              <div key={index}>
                <SwiperSlide className="!flex flex-col justify-center items-center space-y-4 py-3 !bg-[inherit] !h-[inherit]">
                  {Card(item)}
                  {/* Action */}
                  {userInfo.isOwner && (
                    <div className="flex space-x-8">
                      <div
                        className="cursor-pointer flex items-center space-x-1 bg-opacity-20 text-[12px] font-semibold bg-white text-white border-white border rounded-lg px-[9px] py-[6px]"
                        onClick={() => {
                          handleAddCard();
                        }}
                      >
                        <img
                          src={IcCard}
                          alt="add_card"
                          className="!w-[18px] !h-[18px]"
                        />
                        <span>Thêm thẻ</span>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              </div>
            ))}
      </Swiper>
    </div>
  );
}

export default Component;
