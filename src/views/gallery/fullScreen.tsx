import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function Component({ currentGallery, initImg }) {
  const [currentImg, setCurrentImg] = useState(initImg);
  const [initIndex, setInitIndex] = useState(0);
  function handleSlideChange(e) {
    setCurrentImg(currentGallery[e.activeIndex].ref);
  }

  function getInitIndex() {
    setInitIndex(currentGallery.findIndex((e) => e.ref === initImg));
  }

  useEffect(() => {}, [currentImg]);
  useEffect(() => {
    setCurrentImg(initImg);
    getInitIndex();
  }, [initImg]);

  return (
    <div className="relative h-full">
      <div
        className="absolute top-0 left-0 w-full h-full transition-all duration-300 scale-110"
        style={{
          backgroundImage: `url('${currentImg}')`,
          WebkitFilter: `blur(8px)`,
          zIndex: 1,
        }}
      ></div>
      <Swiper
        key={initIndex}
        className="z-50 mySwiper"
        wrapperClass="flex items-center"
        slidesPerView={1}
        initialSlide={initIndex}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        onSlideChange={(e) => {
          handleSlideChange(e);
        }}
      >
        {currentGallery.map((e, index) => (
          <SwiperSlide key={index} className="!h-[fit-content] z-10">
            <img src={e.ref} alt="gallery" style={{ objectFit: "cover" }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
