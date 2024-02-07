import React, { useEffect, useState } from "react";
import DefaultCardLogo from "assests/card/default_card_logo.svg";
import IcCard from "assests/icon/ic-card.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, Popover, QRCode, Tabs } from "antd";
import "./style.scss";
import { handleCaptureClick, handleShare } from "helper/downloadDivAsImg.ts";

// API
import { getCardByUserProfile, deleteCard } from "api/index.ts";

// COMPONENTS
import ModalAddCard from "./dialogAddCard.tsx";
import PlaceholderCard from "./placeholderCard.tsx";
import FrontCard from "components/card/front.tsx";

// INTERFACE
import { CARD } from "interface/card.ts";

// ICON
import DefaultQR from "assests/card/default-qr.svg";
import SignalRight from "assests/card/signal-right.svg";
import SignalLeft from "assests/card/signal-left.svg";
import Banner from "assests/card/banner-ext.svg";
import Logo_SVG from "assests/landing/logo.svg";

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Icon } from "@iconify/react";

// STORE
import { isLogin } from "store/root.ts";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userInfoPortfolio } from "store/portfolio.ts";
import { presetCards, card as storeCard } from "store/addCard.ts";

function Component() {
  const navigate = useNavigate();
  const setAddCard = useSetRecoilState(storeCard);
  const [checkLogin] = useRecoilState(isLogin);
  const [userInfo] = useRecoilState(userInfoPortfolio);
  const setPresetCards = useSetRecoilState(presetCards);
  const pathParams = useParams();
  const [viewCard, setViewCard] = useState<any>({});
  const [cardList, setCardList] = useState<CARD[]>([]);
  const [visible, setVisible] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const cardFilter = [
    {
      key: "1",
      label: "Thẻ hồ sơ",
      children: " ",
    },
    {
      key: "2",
      label: "Thẻ thư viện",
      children: "",
    },
  ];
  async function fetchCardList() {
    const res = await getCardByUserProfile();
    if (res) {
      if (res.data.length) {
        const ar = [...res.data];
        ar.forEach((e) => {
          e.selected = false;
        });
        setPresetCards(ar);
        setCardList(res.data);
      }
    }
  }

  async function handleDeleteCard(card) {
    const res = await deleteCard(card.id);
    if (res) {
      fetchCardList();
    }
  }

  function redirectPaymentCard(card) {
    // localStorage.setItem("card-in-payment", JSON.stringify(card));
    // navigate(`/${pathParams.userShortcut}/paymentCard`);
    setAddCard(card);
    navigate(`/${pathParams.userShortcut}/addCard?isEdit=true`);
  }
  function onChangeFilter() {}
  useEffect(() => {
    fetchCardList();
  }, []);
  useEffect(() => {}, [visible, viewCard]);

  function CardSwiper({ slidesPerView, pagination }) {
    return (
      <div className="relative w-full">
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={30}
          pagination={pagination}
          modules={[Pagination]}
          centeredSlides={true}
          className="w-full h-full portfolio-card-swiper z-1"
        >
          {cardList.length ? (
            cardList.map((item, index) => (
              <div key={index} className="!w-full">
                <SwiperSlide
                  key={index}
                  className="!flex !h-[inherit] flex-col items-center justify-center space-y-4 !bg-[inherit] mb-7 "
                >
                  <div className="relative">
                    {/* ACTION */}
                    <div className="absolute top-0 right-0 z-20 flex m-3 space-x-2">
                      <div
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(11, 18, 28, 0.64) 0%, rgba(4, 14, 29, 0.48) 100%)",
                          backdropFilter: "blur(2px)",
                        }}
                        className="cursor-pointer rounded-lg border border-white bg-white bg-opacity-20 px-[9px] py-[6px] text-[12px] font-semibold text-white"
                        onClick={(e) => {
                          redirectPaymentCard(item);
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
                                className="gradient_btn !shadow-sm"
                                onClick={() => handleDeleteCard(item)}
                              >
                                <Icon
                                  className="text-[#EB5757]"
                                  icon="tabler:trash"
                                />
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
                          className="2items-center flex cursor-pointer space-x-1 rounded-lg border border-white bg-white bg-opacity-20 px-[9px] py-[6px] text-[12px] font-semibold text-white"
                        >
                          <Icon
                            icon="tabler:trash"
                            className="!h-[18px] !w-[18px] text-[#EB5757]"
                          />
                        </div>
                      </Popover>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setViewCard(item);
                        setVisible(true);
                      }}
                    >
                      <FrontCard card={item} />
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            ))
          ) : (
            <SwiperSlide className="!flex !h-[inherit] flex-col items-center justify-center space-y-4 !bg-[inherit] py-3">
              <PlaceholderCard userInfo={userInfo} />
            </SwiperSlide>
          )}
        </Swiper>

        {cardList.length ? (
          <div className="z-20 flex justify-center w-full">
            <Button
              className="gradient_btn flex cursor-pointer items-center space-x-1 rounded-lg px-[9px] py-[6px]  text-[12px] font-semibold text-white !shadow-none"
              onClick={() => {
                setVisibleAdd(true);
              }}
            >
              <img
                src={IcCard}
                alt="add_card"
                className="!h-[18px] !w-[18px]"
              />
              <span>Thêm thẻ</span>
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
  function ModalCard() {
    return (
      <div
        className="flex h-[176px] w-[280px] flex-col space-y-3 rounded-lg px-[30px] py-5"
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
            className="!h-12 !w-12"
          />
        )}
        {viewCard.enableFrontText && (
          <div
            className="w-[max-content] text-center text-white"
            style={{ fontFamily: viewCard.fontFamily || "Montserrat" }}
          >
            {viewCard.frontText || "Your name here"}
          </div>
        )}
      </div>
    );
  }
  function ModalCardBack() {
    return (
      <div
        className=" h-[176px] w-[280px] space-y-3 rounded-lg"
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
          <div className="absolute text-white -translate-x-1/2 left-1/2 top-4">
            {viewCard.backText || "Your text here"}
          </div>
          <img
            src={SignalLeft}
            alt="SignalLeft"
            className="absolute left-10 top-1/2 h-[15%] -translate-y-full"
          />

          {checkLogin ? (
            <QRCode
              className="aspect-square !h-1/2 !w-max"
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
            className="absolute right-10 top-1/2 h-[15%] -translate-y-full"
          />
          <div className="absolute text-white bottom-2">
            <div className="text-[6px]">
              Chạm gần điện thoại thông minh của bạn hoặc quét mã QR
            </div>
            <div className="flex items-center justify-center space-x-2 text-[8px]">
              <span>Designed by</span>
              <img src={Banner} alt="banner" className="h-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-[350px]  p-5 justify-end bg-[#18191A]">
      <Tabs defaultActiveKey="1" items={cardFilter} onChange={onChangeFilter} />
      <div className="w-full h-max md:hidden">
        <CardSwiper slidesPerView={1} pagination={true} />
      </div>
      <div className="w-full h-max <md:hidden">
        <CardSwiper slidesPerView={3} pagination={false} />
      </div>
      <ModalAddCard
        attr={{
          className: "modalFullScreen",
          open: visibleAdd,
          closeIcon: false,
          footer: null,
          afterClose: () => {
            setVisibleAdd(false);
          },
        }}
        onClose={() => setVisibleAdd(false)}
      />
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
            className="absolute right-5 top-5 cursor-pointer text-[24px] text-white"
            onClick={() => {
              setVisible(false);
            }}
          />
          <div className="space-y-2 w-min">
            <div className="space-y-2 DownloadQR w-min">
              <ModalCard />
              <ModalCardBack />
            </div>

            <div className="flex justify-between">
              <div className="flex space-x-2">
                <Button
                  className="!border !border-solid !border-white bg-[#ffffff4d] !px-[9px]  !py-[6px] !shadow-none"
                  onClick={() => {
                    handleCaptureClick({
                      selector: ".DownloadQR",
                      fileName: "OTD_Card.png",
                    });
                  }}
                >
                  <Icon className="h-[18px] w-[18px]" icon="tabler:download" />
                </Button>
                <Button
                  className="!border !border-solid !border-white bg-[#ffffff4d] !px-[9px]  !py-[6px] !shadow-none"
                  onClick={() => {
                    handleShare(".DownloadQR");
                  }}
                >
                  <Icon className="h-[18px] w-[18px]" icon="uil:share" />
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button
                  className="!bg-[#1E2530] !px-[9px] !py-[6px] text-[12px] font-semibold !text-primary-blue-medium !shadow-none"
                  onClick={() => {
                    redirectPaymentCard(viewCard);
                  }}
                >
                  Cấp lại
                </Button>
                <Button className="!bg-[#1E2530] !px-[9px] !py-[6px] text-[12px] font-semibold  !text-primary-blue-medium !shadow-none">
                  Xóa thẻ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Component;
