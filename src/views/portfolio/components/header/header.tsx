import React, { useState } from "react";
import "./index.css";
import { useCheckMobileScreen } from "helper/checkMobile.ts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

function SwiperMobile({ currentImg, getCurrentImg, background }) {
  return (
    <div className="relative flex items-center w-full bg-neutral-900 <sm:h-1/2 h-3/4">
      <div
        className="w-full h-full blurBackground"
        style={{
          backgroundImage: `url(${currentImg})`,
          WebkitFilter: `blur(24px)`,
        }}
      ></div>
      <Swiper
        className=" mySwiper z-1 !h-3/4 !absolute top-1/2 -translate-y-1/2  "
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        onSlideChange={getCurrentImg}
      >
        {background.map((e, index) => (
          <SwiperSlide key={index} className="!h-[inherit]">
            <img src={e} alt="user_background" className="h-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function SwiperDesk({ currentImg, getCurrentImg, background }) {
  return (
    <div className="relative w-full h-full ">
      <div
        className="sm:w-[300%] sm:-translate-x-1/2 h-full  "
        style={{
          backgroundImage: `url(${currentImg})`,
          WebkitFilter: `blur(24px)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          boxShadow: "inset 0px -70px 10px #18191A",
        }}
      ></div>

      <Swiper
        className=" mySwiper z-1   !absolute top-1/2 -translate-y-1/2  "
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        onSlideChange={getCurrentImg}
      >
        {background.map((e, index) => (
          <SwiperSlide key={index} className="!h-[inherit]">
            <div
              className="h-full "
              style={{
                backgroundImage: `url(${e})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                boxShadow: "inset 0px -70px 45px #18191A",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function Header({ background, avatar, name, description }) {
  const [currentImg, setCurentImg] = useState(background[0]);

  function getCurrentImg(event) {
    setCurentImg(background[event.activeIndex]);
  }
  return (
    <div className="relative flex justify-center h-3/5 sm:h-2/5 ">
      <div className="flex flex-col w-full">
        {useCheckMobileScreen()
          ? SwiperMobile({ currentImg, getCurrentImg, background })
          : SwiperDesk({ currentImg, getCurrentImg, background })}

        <div className="flex items-center mx-2 <sm:flex <sm:flex-col <sm:items-center -mt-20 sm:-mt-6 z-10">
          <img
            src={avatar}
            alt="Avatar"
            className="z-10 rounded-full <sm:w-24 <sm:h-24  w-32 h-32 sm:w-24 sm:h-24"
          />
          <div className="flex flex-col <sm:items-center <sm:w-full <sm:mt-2 mt-6 ml-4 space-y-1 ">
            <span className="<sm:text-xl text-2xl username-desktop">{name}</span>
            <span className="text-sm font-thin sm:text-xs description-desktop">
              {description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
