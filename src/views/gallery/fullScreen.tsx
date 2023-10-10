import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
 

export default function Component({ currentGallery, initImg }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [currentImg, setCurrentImg] = useState(initImg);
  const [initIndex, setInitIndex] = useState(0);
  

  function getInitIndex() {
    setInitIndex(currentGallery.findIndex((e) => e.ref === initImg));
  }

  useEffect(() => {}, [currentImg]); 
  useEffect(() => {
    setCurrentImg(initImg);
    getInitIndex();
  }, [initImg]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full">
      <div
        className="absolute top-0 left-0 w-full h-full transition-all duration-300 "
        style={{
          background: "rgba(0, 0, 0, 0.60)",
          WebkitFilter: `blur(8px)`,
          zIndex: 1,
        }}
      /> 
 
      <Swiper 
        spaceBetween={10} 
        initialSlide={initIndex}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="px-5 mySwiper2"
      >
        {currentGallery.map((e, index) => (
          <SwiperSlide key={index} >
            <img src={e.ref} alt="gallery"   />
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
        className="p-5 mySwiper"
      >
        {currentGallery.map((e, index) => (
          <SwiperSlide key={index}  >
            <img src={e.ref} alt="gallery"   />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
