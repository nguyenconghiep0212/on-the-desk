import React, { useState } from "react";
import "./index.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

function Header({ background, avatar, name, description }) {
  const [currentImg, setCurentImg] = useState(background[0]);

  function getCurrentImg(event) {
    setCurentImg(background[event.activeIndex]);
    console.log(currentImg);
  }
  return (
    <div className="relative flex justify-center h-3/5 ">
      <div className="flex flex-col w-full">
        <div className="relative flex items-center w-full bg-neutral-900 h-3/4">
          <div
            className="w-full h-full blurBackground"
            style={{
              backgroundImage: `url(${currentImg})`,
              WebkitFilter: `blur(24px)`,
            }}
          ></div>
          <Swiper
            className=" mySwiper z-1 !h-2/3 !absolute top-1/2 -translate-y-1/2  "
            slidesPerView={1}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            onSlideChange={getCurrentImg}
          >
            {background.map((e) => (
              <SwiperSlide className="!h-[inherit]">
                <img src={e} alt="user_background" className="h-full" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-[-30px] sm:mt-[-60px] mx-[5%] sm:mx-[10%] flex items-center ">
          <img
            src={avatar}
            alt="Avatar"
            className="z-10 rounded-full w-36 h-36 sm:w-40 sm:h-40"
          />
          <div className="flex flex-col mt-16 ml-4 space-y-1">
            <span className="text-3xl username-desktop">{name}</span>
            <span className="text-sm font-thin sm:text-xl description-desktop">
              {description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
