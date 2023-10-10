import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// ICON
import IcCloseLeft from 'assests/icon/ic-arrow-left.svg'
import { useRecoilState } from "recoil";
import { fullScreenVisible } from "store/gallery";

export default function Component({ currentGallery, initImg }) {
  const [_, setVisible] = useRecoilState(fullScreenVisible);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [currentImg, setCurrentImg] = useState(initImg);
  const [initIndex, setInitIndex] = useState(0);

  function getInitIndex() {
    setInitIndex(currentGallery.topPictures.findIndex((e) => e.ref === initImg));
  }

  useEffect(() => {}, [currentImg]);
  useEffect(() => {
    setCurrentImg(initImg);
    getInitIndex();
  }, [initImg]);

  return (
    <div className="relative flex flex-col justify-center h-full px-5 py-20">
      <div
        className="absolute top-0 left-0 w-full h-full transition-all duration-300 "
        style={{
          background: "rgba(0, 0, 0, 0.60)",
          WebkitFilter: `blur(8px)`,
          zIndex: 1,
        }}
      /> 
      <div className="absolute z-10 cursor-pointer top-5 left-5">
        <img src={IcCloseLeft} alt="IcCloseLeft" onClick={()=>{setVisible(false)}}/>
      </div>
      <div className="z-10 text-lg font-bold text-white">
        {currentGallery.galleryName}
      </div>
        <Swiper
          spaceBetween={30}
          initialSlide={initIndex}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className=" mySwiper2"
        >
          {currentGallery.topPictures.map((e, index) => (
            <SwiperSlide key={index}>
              <img src={e.ref} alt="gallery" />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4.5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="!py-5 mySwiper"
        >
          {currentGallery.topPictures.map((e, index) => (
            <SwiperSlide key={index}>
              <img src={e.ref} alt="gallery" />
            </SwiperSlide>
          ))}
        </Swiper> 
    </div>
  );
}
