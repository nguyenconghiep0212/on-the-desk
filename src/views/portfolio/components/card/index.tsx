import React, { useEffect, useState } from "react";
import DefaultCardLogo from "assests/card/default_card_logo.svg";
import IcCard from "assests/icon/ic-card.svg";
import { useNavigate } from "react-router-dom";
import { Button, Popover } from "antd";
import { getCardByUserProfile, deleteCard } from "api/index.ts";
import "./style.scss";
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

  function mobileSwiper() {
    function Card(card) {
      return (
        <div
          className=" flex flex-col space-y-3 rounded-lg h-[176px] w-[280px] px-[30px] py-5"
          style={
            card.backgroundImage
              ? {
                  alignItems: card.alignment || "center",
                  justifyContent:
                    card.alignment === "end" || card.alignment === "start"
                      ? "end"
                      : "center",
                  backgroundImage: `url('${card.backgroundImage}')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }
              : {
                  background: card.backgroundColor || "#0913239c",
                  alignItems: card.alignment || "center",
                  justifyContent:
                    card.alignment === "end" || card.alignment === "start"
                      ? "end"
                      : "center",
                }
          }
        >
          {card.enableLogo ? (
            <img
              src={card.logo || DefaultCardLogo}
              alt="card_logo"
              className="!w-12 !h-12"
            />
          ) : (
            <></>
          )}
          <div className="text-white w-[max-content] text-center">
            {card.frontText || "Your name here"}
          </div>
        </div>
      );
    }
    return (
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
                            <span className="text-white">
                              Bạn chắc chắn muốn xóa thẻ này?
                            </span>
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
    );
  }
  function desktopSwiper() {
    function Card(card) {
      return (
        <div className="relative  h-[176px] w-[280px]">
          <div
            className="flex flex-col w-full h-full space-y-3 px-[30px] py-5 rounded-lg"
            style={
              card.backgroundImage
                ? {
                    alignItems: card.alignment || "center",
                    justifyContent:
                      card.alignment === "end" || card.alignment === "start"
                        ? "end"
                        : "center",
                    backgroundImage: `url('${card.backgroundImage}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }
                : {
                    background: card.backgroundColor || "#0913239c",
                    alignItems: card.alignment || "center",
                    justifyContent:
                      card.alignment === "end" || card.alignment === "start"
                        ? "end"
                        : "center",
                  }
            }
          >
            {card.enableLogo ? (
              <img
                src={card.logo || DefaultCardLogo}
                alt="card_logo"
                className="!w-12 !h-12"
              />
            ) : (
              <></>
            )}
            <div className="text-white w-[max-content] text-center">
              {card.frontText || "Your name here"}
            </div>
          </div>

          {/* ACTION */}
          <div className="absolute top-0 right-0 flex m-3 space-x-2">
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(11, 18, 28, 0.64) 0%, rgba(4, 14, 29, 0.48) 100%)",
                backdropFilter: "blur(2px)",
              }}
              className="cursor-pointer bg-opacity-20 text-[12px] font-semibold bg-white text-white border-white border rounded-lg px-[9px] py-[6px]"
            >
              <Icon
                className="text-[16px]"
                style={{ transform: "scale(-1,1)" }}
                icon="material-symbols:refresh"
              />
            </div>
            <Popover
              className="text-white"
              content={
                <div className="space-y-2">
                  <span className="text-white">
                    Bạn chắc chắn muốn xóa thẻ này?
                  </span>
                  <div className="text-right">
                    <Button
                      className="!shadow-sm gradient_btn"
                      onClick={() => handleDeleteCard(card)}
                    >
                      <Icon className="text-[#EB5757]" icon="tabler:trash" />
                    </Button>
                  </div>
                </div>
              }
              trigger="click"
            >
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11, 18, 28, 0.64) 0%, rgba(4, 14, 29, 0.48) 100%)",
                  backdropFilter: "blur(2px)",
                }}
                className="cursor-pointer flex 2items-center space-x-1 bg-opacity-20 text-[12px] font-semibold bg-white text-white border-white border rounded-lg px-[9px] py-[6px]"
              >
                <Icon
                  icon="tabler:trash"
                  className="!w-[18px] !h-[18px] text-[#EB5757]"
                />
              </div>
            </Popover>
          </div>
        </div>
      );
    }
    return (
      <div className="relative w-full h-full">
        <Swiper
          slidesPerView={cardList.length}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          className="w-full h-full z-1"
        >
          {cardList.length
            ? cardList.map((item, index) => (
                <div key={index} className="!w-full">
                  <SwiperSlide className="!flex flex-col justify-center items-center space-y-4 py-3 !bg-[inherit] !h-[inherit] ">
                    {Card(item)}
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

        <div className="absolute z-20 -translate-x-1/2 bottom-3 left-1/2">
          <Button
            className="gradient_btn !shadow-none cursor-pointer flex items-center space-x-1 text-[12px] font-semibold  text-white rounded-lg px-[9px] py-[6px]"
            onClick={() => {
              handleAddCard();
            }}
          >
            <img src={IcCard} alt="add_card" className="!w-[18px] !h-[18px]" />
            <span>Thêm thẻ</span>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex justify-center h-[320px] bg-[#18191A]">
      <div className="md:hidden">{mobileSwiper()}</div>
      <div className="<md:hidden w-full">{desktopSwiper()}</div>
    </div>
  );
}

export default Component;
