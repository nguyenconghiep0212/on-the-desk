import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button, Modal, message } from "antd";
import "./index.scss";
import { createCard, editCard } from "../../api/index.ts";
import IcShoppingBag from "assests/icon/ic-shopping-bag.svg";

// STORE
import { card as storeCard } from "../../store/addCard.ts";

// COMPONENT
import Alignment from "./components/alignment.tsx";
import Background from "./components/background.tsx";
import Logo from "./components/logo.tsx";
import FrontText from "./components/frontName.tsx";
import BackText from "./components/backName.tsx";
import PackageSeletion from "./components/packageSelection.tsx";
import Profile from "./components/profile/index.tsx";
import FrontCard from "../../components/card/front.tsx";
import BackCard from "../../components/card/back.tsx";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip } from "swiper/modules";
import { useQuery } from "../../helper/getQuery.ts";
import useIntersectionObserver from "../../helper/useIntersectionObserver.ts";
import BorderedDiv from "../../components/borderedDiv/index.tsx";

function Component() {
  const swiperRef = useRef(null);
  const [isAddNewProfile, setIsAddNewProfile] = useState(false);
  const navigate = useNavigate();
  const pathParams = useParams();
  const [defaultCard, setDefaultCard] = useRecoilState(storeCard);
  const query = useQuery("isEdit");

  // const [previewVisible, setPreviewVisible] = useState(false);

  async function submitCard() { }

  async function saveCard() {
    if (isAddNewProfile) {
    } else {
      try {
        const params = { ...defaultCard, cardId: defaultCard.id };
        const res = query
          ? await editCard(params)
          : await createCard(defaultCard);
        if (res) {
          message.success(`${query ? "Lưu" : "Tạo"} thẻ thành công`);
          setDefaultCard({
            alignment: "",
            logo: "",
            enableLogo: true,
            frontText: "",
            frontTextColor: "",
            qrUrl: "",
            enableFrontText: true,
            backText: "",
            backgroundColor: "",
            backgroundImage: "",
            fontFamily: "",
          });
          navigate(`/${pathParams.userShortcut}`);
        }
      } catch (error) {
        message.error(
          "Tạo thẻ thất bại, vui lòng thử lại hoặc liên hệ chúng tôi",
        );
        console.error("Lỗi tạo thẻ:", error);
      }
    }
  }
  useEffect(() => {
    if (!pathParams.userShortcut) {
      setIsAddNewProfile(true);
    }
  }, []);
  useEffect(() => { }, [defaultCard, isAddNewProfile]);

  function MobileLayout() {
    const previewRef = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(previewRef, {});
    const sticky = !!entry?.isIntersecting;
 
    return (
      <div className="flex flex-col items-center w-full ">
        <div className={`${sticky ? 'h-min' : 'backdrop-blur'} sticky top-0 z-20 flex justify-center w-full p-3 h-52 `}>
          <Icon
            className="absolute left-3 top-[33px] z-50 cursor-pointer text-lg  text-white"
            icon="ep:back"
            onClick={() => navigate(-1)}
          />
           <div className={`${sticky ? 'hidden' : ''} flex flex-col w-full space-y-2`}>
            <Swiper
              ref={swiperRef}
              effect={"flip"}
              speed={700}
              loop={true}
              grabCursor={true}
              modules={[EffectFlip]}
            >
              <SwiperSlide
                className="card-flip !w-full !bg-transparent"
                onClick={() => {
                  swiperRef.current?.swiper.slideNext(700);
                }}
              >
                {FrontCard({ card: defaultCard })}
              </SwiperSlide>
              <SwiperSlide
                className="card-flip !w-full !bg-transparent"
                onClick={() => {
                  swiperRef.current?.swiper.slideNext(700);
                }}
              >
                {BackCard({ card: defaultCard })}
              </SwiperSlide>
            </Swiper>
          </div> 
         
        </div>
        <div className="w-full px-5 py-5 space-y-3 sm:w-2/3">
          <Alignment />
          <Background />
          <Logo />
          <FrontText />
          <BackText />
          <div className="space-y-3">
            <div className="space-x-2 text-right">
              <Button
                className="!bg-[#1E2530] font-semibold !text-primary-blue-medium !shadow-none"
                onClick={() => {
                  saveCard();
                }}
              >
                Lưu thẻ
              </Button>
              {query ? (
                <Button
                  className="gradient_btn !shadow-none"
                  onClick={() => {
                    submitCard();
                  }}
                >
                  Hoàn thành
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>

          {isAddNewProfile && 
          <div>
            <PackageSeletion />
            <div className="mt-[18px]" ref={previewRef}>
              <PackagePreview sticky={sticky}/>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      {/* MÀN HÌNH FULL */}
      <div className="hidden md:flex">
         <MobileLayout />
      </div> 
      {/* MÀN HÌNH THU GỌN */}
      <div className="flex md:hidden">
        <MobileLayout/>
      </div>
    </div>
  );
}

function PackagePreview({sticky}) {
   
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-[18px]">  
        <div className="mb-[18px] text-[12px] italic text-white">
          Xem trước hồ sơ:
        </div>
        <Profile />
        <div className={`${sticky ? 'sticky bottom-0 z-10' : ''} w-[100vw] flex justify-center -translate-x-[16.66667%] backdrop-blur p-3 mt-[18px]`}>
          <div className="w-2/3 pr-10">
          <Button
            className='w-full gradient_btn'
            onClick={() => {
              setVisible(true);
            }}
          >
            Tạo hồ sơ ngay
          </Button>
          </div>
          
        </div> 
        <Modal
          maskClosable={true}
          open={visible}
          closeIcon={false}
          footer={null}
          centered
          afterClose={() => {
            setVisible(false);
          }}
        >
          <BorderedDiv
            slot={
              <div className="flex flex-col space-y-6 modal-checkout-confirm">
                <div className="text-white ">
                  Vui lòng thanh toán để nhận thẻ thông minh với thiết kế của
                  riêng bạn và tạo hồ sơ chuyên nghiệp
                </div>
                <div className="flex justify-end space-x-[12px]">
                  <Button
                    className="text-[12px] font-semibold !text-primary-blue-medium !shadow-none"
                    onClick={() => {
                      setVisible(false);
                    }}
                  >
                    Trở lại
                  </Button>
                  <Button className="gradient_btn flex items-center !shadow-none  ">
                    <img src={IcShoppingBag} alt="IcShoppingBag" />
                    <span className="ml-1 font-semibold">Thanh toán</span>
                  </Button>
                </div>
              </div>
            }
            background={"transparent"}
          />
        </Modal> 
    </div>
  );
}

export default Component;
