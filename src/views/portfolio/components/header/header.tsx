import React, { useEffect, useState } from "react";
import "./index.scss";
import { useCheckMobileScreen } from "helper/checkMobile.ts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";

function SwiperMobile({ currentImg, getCurrentImg, background }) {
  return (
    <div className="relative flex justify-center w-full h-full bg-neutral-900 ">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${currentImg})`,
          WebkitFilter: `blur(24px)`,
          boxShadow: "inset 0px -70px 45px -45px #18191A",
        }}
      ></div>
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
          {background.map((e, index) => (
            <SwiperSlide key={index} className="!h-[inherit]">
              <div
                className="w-full h-full"
                style={{
                  // backgroundColor: 'white',
                  backgroundImage: `url(${e})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  boxShadow: "inset   0px -70px 45px -45px  #18191A",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
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
          backgroundSize: "fit",
          boxShadow: "inset 0px -70px 15px -45px #18191A",
        }}
      ></div>

      <Swiper
        className="   z-1   !absolute top-1/2 -translate-y-1/2  "
        slidesPerView={1}
        pagination={true}
        modules={[Autoplay, Pagination]}
        onSlideChange={getCurrentImg}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {background.map((e, index) => (
          <SwiperSlide key={index} className="!h-[inherit]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${e})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                boxShadow: "inset 0px -70px 45px -45px #18191A",
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
  useEffect(() => {
    setCurentImg(background[0]);
  }, [background]);
  return (
    <div className="relative flex justify-center <xs:!h-[320px] h-[40vh]">
          <div className="absolute top-[33px] z-10  text-lg right-2   ">
            <Icon icon="bx:user" className="text-primary-blue-medium" />
          </div>
      <div className="flex flex-col w-full">
        {useCheckMobileScreen()
          ? SwiperMobile({ currentImg, getCurrentImg, background })
          : SwiperDesk({ currentImg, getCurrentImg, background })}

        <div className="flex items-center mx-2 <3xs:flex <3xs:flex-col <3xs:items-center -mt-8 desktop:-mt-10 z-10">
          <img
            src={avatar}
            alt="Avatar"
            className="z-10 w-24 rounded-full :h-24 desktop:w-32 desktop:h-32 "
          />
          <div className="flex flex-col <3xs:items-center <3xs:w-full <3xs:mt-2 mt-8 ml-4 space-y-1 ">
            <span className="<xs:text-base 	 text-lg username-desktop">
              {name}
            </span>
            <span className="text-[12px] font-thin <3xs:text-center description-desktop">
              {description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
