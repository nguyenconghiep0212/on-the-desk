import React, { useEffect, useState } from "react";
import DefaultCardLogo from "assests/card/default_card_logo.svg";
import IcCard from "assests/icon/ic-card.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, Popover, QRCode } from "antd";
import { getCardByUserProfile, deleteCard } from "api/index.ts";
import "./style.scss";
// INTERFACE
import { CARD } from "interface/card.ts";

// ICON
import DefaultQR from "assests/card/default-qr.svg";
import SignalRight from "assests/card/signal-right.svg";
import SignalLeft from "assests/card/signal-left.svg";
import Banner from "assests/card/banner-ext.svg";
import Logo_SVG from "assests/landing/logo.svg";

// MOCK
import { mock_card } from "./mock.ts";

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Icon } from "@iconify/react";

// STORE
import { isLogin } from "store/root.ts";
import { useRecoilState } from "recoil";

function Component({ userInfo }) {
  const navigate = useNavigate();
  const [checkLogin] = useRecoilState(isLogin);

  const pathParams = useParams();
  const [viewCard, setViewCard] = useState({});
  const [cardList, setCardList] = useState<CARD[]>([]);
  const [visible, setVisible] = useState(false);
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
  useEffect(() => {}, [visible, viewCard]);

  function mobileSwiper() {
    function Card(card) {
      return (
        <div
          className=" flex flex-col space-y-3 rounded-lg h-[176px] w-[280px] px-[30px] py-5 cursor-pointer"
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
          onClick={() => {
            setViewCard(card);
            setVisible(true);
          }}
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
                <SwiperSlide
                  key={index}
                  className="!flex flex-col justify-center items-center space-y-4 py-3 !bg-[inherit] !h-[inherit]"
                >
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
                <SwiperSlide
                  key={index}
                  className="!flex flex-col justify-center items-center space-y-4 py-3 !bg-[inherit] !h-[inherit]"
                >
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
        <div
          className="relative  h-[176px] w-[280px] cursor-pointer"
          onClick={() => {
            setViewCard(card);
            setVisible(true);
          }}
        >
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
          <div className="absolute top-0 right-0 z-20 flex m-3 space-x-2">
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(11, 18, 28, 0.64) 0%, rgba(4, 14, 29, 0.48) 100%)",
                backdropFilter: "blur(2px)",
              }}
              className="cursor-pointer bg-opacity-20 text-[12px] font-semibold bg-white text-white border-white border rounded-lg px-[9px] py-[6px]"
              onClick={(e) => {
                navigate(`/${userInfo.shortcut}/paymentCard`);
                e.preventDefault();
                e.stopPropagation();
              }}
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
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
          slidesPerView={3}
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
                  <SwiperSlide
                    key={index}
                    className="!flex flex-col justify-center items-center space-y-4 py-3 !bg-[inherit] !h-[inherit] "
                  >
                    {Card(item)}
                  </SwiperSlide>
                </div>
              ))
            : [mock_card].map((item, index) => (
                <div key={index}>
                  <SwiperSlide
                    key={index}
                    className="!flex flex-col justify-center items-center space-y-4 py-3 !bg-[inherit] !h-[inherit]"
                  >
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
  function modalCard() {
    return (
      <div
        className="flex flex-col space-y-3 rounded-lg h-[176px] w-[280px] px-[30px] py-5"
        style={
          viewCard.backgroundImage
            ? {
                alignItems: viewCard.alignment || "center",
                justifyContent:
                  viewCard.alignment === "end" || viewCard.alignment === "start"
                    ? "end"
                    : "center",
                backgroundImage: `url('${viewCard.backgroundImage}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : {
                background: viewCard.backgroundColor || "#091323",
                alignItems: viewCard.alignment || "center",
                justifyContent:
                  viewCard.alignment === "end" || viewCard.alignment === "start"
                    ? "end"
                    : "center",
              }
        }
      >
        {viewCard.enableLogo && (
          <img
            src={viewCard.logo || DefaultCardLogo}
            alt="card_logo"
            className="!w-12 !h-12"
          />
        )}
        {viewCard.enableFrontText && (
          <div
            className="text-white w-[max-content] text-center"
            style={{ fontFamily: viewCard.fontFamily || "Montserrat" }}
          >
            {viewCard.frontText || "Your name here"}
          </div>
        )}
      </div>
    );
  }
  function modalCardBack() {
    return (
      <div
        className=" space-y-3 rounded-lg h-[176px] w-[280px]"
        style={
          viewCard.backgroundImage
            ? {
                background: "#091323",
              }
            : {
                background: viewCard.backgroundColor || "#091323",
              }
        }
      >
        <div
          className="relative flex flex-col items-center justify-center w-full h-full rounded-lg"
          style={
            viewCard.backgroundColor && !viewCard.backgroundImage
              ? { background: "rgb(0,0,0,0.39)" }
              : {}
          }
        >
          <div className="absolute text-white -translate-x-1/2 top-4 left-1/2">
            {viewCard.backText || "Your text here"}
          </div>
          <img
            src={SignalLeft}
            alt="SignalLeft"
            className="h-[15%] absolute top-1/2 -translate-y-full left-10"
          />

          {checkLogin ? (
            <QRCode
              className="!h-1/2 aspect-square !w-max"
              errorLevel="H"
              value={
                pathParams.userShortcut
                  ? `https://onthedesk.vn/${pathParams.userShortcut}`
                  : "https://onthedesk.vn/"
              }
              icon={Logo_SVG}
              color="#0083C7"
              bgColor="rgba(0, 0, 0, 0.50)"
            />
          ) : (
            <img src={DefaultQR} alt="DefaultQR" className="h-1/2" />
          )}
          <img
            src={SignalRight}
            alt="SignalRight"
            className="h-[15%] absolute top-1/2 -translate-y-full right-10"
          />
          <div className="absolute text-white bottom-2">
            <div className="text-[6px]">
              Chạm gần điện thoại thông minh của bạn hoặc quét mã QR
            </div>
            <div className="flex items-center justify-center text-[8px] space-x-2">
              <span>Designed by</span>
              <img src={Banner} alt="banner" className="h-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex justify-center h-[320px] bg-[#18191A]">
      <div className="md:hidden w-full">{mobileSwiper()}</div>
      <div className="<md:hidden w-full">{desktopSwiper()}</div>
      <Modal
        className="modalFullScreen"
        open={visible}
        closeIcon={false}
        footer={null}
        afterClose={() => {
          setVisible(false);
        }}
      >
        <div className="relative flex flex-col items-center justify-center h-full space-y-5 backdrop-blur">
          <Icon
            icon="tabler:x"
            className="text-[24px] cursor-pointer text-white absolute top-5 right-5"
            onClick={() => {
              setVisible(false);
            }}
          />
          {modalCard()}
          {modalCardBack()}
        </div>
      </Modal>
    </div>
  );
}

export default Component;
