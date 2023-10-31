import React, { useEffect, useState } from "react";
import "./index.scss";
import { useCheckMobileScreen } from "helper/checkMobile.ts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import IcCamera from "assests/icon/ic-camera-blue.svg";
import { Input } from "antd";
import Logo from "assests/landing/logo.svg";
function SwiperMobile({ currentImg, getCurrentImg, userInfo, isEdit }) {
  return (
    <div className="relative flex justify-center w-full h-full bg-neutral-900 ">
      {isEdit && (
        <div
          className="absolute z-20 flex items-center justify-center w-6 h-6 rounded cursor-pointer bottom-6 right-5"
          style={{
            backgrounds:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.08) 100%)",
          }}
        >
          <img
            src={IcCamera}
            alt="IcCamera"
            className="text-primary-blue-dark "
          />
        </div>
      )}
      {userInfo.backgrounds && (
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${currentImg})`,
            WebkitFilter: `blur(24px)`,
            boxShadow: "inset 0px -70px 45px -45px #18191A",
          }}
        />
      )}
      <div className="z-1 h-full w-full lg:!w-3/4 <3xs:!w-3/4 !absolute top-1/2 -translate-y-1/2">
        <Swiper
          className=""
          slidesPerView={1}
          pagination={true}
          modules={[Autoplay, Pagination]}
          onSlideChange={getCurrentImg}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide className="!h-[inherit] !bg-[inherit]">
            {userInfo.backgrounds ? (
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${userInfo.backgrounds[0]})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  boxShadow: "inset   0px -70px 45px -45px  #18191A",
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full opacity-50">
                <img src={Logo} alt="Logo" className="!w-min !h-1/2" />
              </div>
            )}
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

function SwiperDesk({ currentImg, getCurrentImg, userInfo, isEdit }) {
  return (
    <div className="relative w-full h-full ">
      {isEdit && (
        <div
          className="absolute z-20 flex items-center justify-center w-6 h-6 rounded cursor-pointer bottom-6 right-5"
          style={{
            backgrounds:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.08) 100%)",
          }}
        >
          <img
            src={IcCamera}
            alt="IcCamera"
            className="text-primary-blue-dark "
          />
        </div>
      )}

      {userInfo.backgrounds && (
        <div
          className="sm:w-[300%] sm:-translate-x-1/2 h-full  "
          style={{
            backgroundImage: `url(${currentImg})`,
            WebkitFilter: `blur(24px)`,
            backgroundPosition: "center",
            backgroundSize: "fit",
            boxShadow: "inset 0px -100px 15px -45px #18191A",
          }}
        />
      )}

      <Swiper
        className=" z-1 !absolute top-1/2 -translate-y-1/2  "
        slidesPerView={1}
        pagination={true}
        modules={[Autoplay, Pagination]}
        onSlideChange={getCurrentImg}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide className="!h-[inherit] !bg-[inherit]">
          {userInfo.backgrounds ? (
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${userInfo.backgrounds[0]})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                boxShadow: "inset 0px -70px 45px -45px #18191A",
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full opacity-50">
              <img src={Logo} alt="Logo" className=" !h-1/2 !w-min" />
            </div>
          )}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

function Header({ userInfo, setUserInfo, isEdit }) {
  const [currentImg, setCurentImg] = useState(
    userInfo.backgrounds ? userInfo.backgrounds[0] : Logo
  );
  console.log(userInfo);
  function getCurrentImg(event) {
    setCurentImg(userInfo.backgrounds[event.activeIndex]);
  }
  useEffect(() => {
    setCurentImg(userInfo.backgrounds ? userInfo.backgrounds[0] : Logo);
  }, [userInfo.backgrounds]);
  return (
    <div className="relative flex justify-center <xs:!h-[320px] h-[40vh]">
      <div className="flex flex-col w-full ">
        {useCheckMobileScreen()
          ? SwiperMobile({ currentImg, getCurrentImg, userInfo, isEdit })
          : SwiperDesk({ currentImg, getCurrentImg, userInfo, isEdit })}

        <div className="flex items-center mx-2 <3xs:flex <3xs:flex-col <3xs:items-center -mt-8 desktop:-mt-10 z-10">
          <div className="relative">
            <img
              src={userInfo.avatar || Logo}
              alt="Avatar"
              className="z-10 w-24 rounded-full :h-24 desktop:w-32 desktop:h-32 "
            />
            {isEdit && (
              <div
                className="absolute bottom-0 z-20 flex items-center justify-center w-6 h-6 rounded cursor-pointer right-2"
                style={{
                  backgrounds:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.08) 100%)",
                }}
              >
                <img
                  src={IcCamera}
                  alt="IcCamera"
                  className="text-primary-blue-dark "
                />
              </div>
            )}
          </div>

          <div className="flex flex-col <3xs:items-center <3xs:w-full <3xs:mt-2 mt-8 ml-4 space-y-1 ">
            {isEdit ? (
              <div>
                <Input
                  value={userInfo.name}
                  bordered={false}
                  className="px-0 <xs:text-base text-lg username-desktop"
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, name: e.target.value });
                  }}
                />
              </div>
            ) : (
              <span className="<xs:text-base text-lg username-desktop">
                {userInfo.name}
              </span>
            )}
            {isEdit ? (
              <div>
                <Input
                  value={userInfo.description}
                  bordered={false}
                  className="px-0 text-[12px] font-thin description-desktop"
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, description: e.target.value });
                  }}
                />
              </div>
            ) : (
              <span className="text-[12px] font-thin <3xs:text-center description-desktop">
                {userInfo.description}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
