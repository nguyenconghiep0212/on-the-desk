import React, { useEffect, useRef, useState } from "react";
// import { useCheck425Screen } from "helper/checkMobile";
// import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
// ICON
import IcArrowLeft from "assests/icon/ic-arrow-left.svg";
import { useRecoilState } from "recoil";
import { fullScreenVisible } from "store/gallery";

export default function Component({ currentGallery, initImg }) {
  const [_, setVisible] = useRecoilState(fullScreenVisible);
  const topSwiperRef: any = useRef(null);
  // const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentImage, setCurrentImage] = useState({});
  const [initIndex, setInitIndex] = useState(0);

  function getInitIndex() {
    setInitIndex(
      currentGallery.topPictures.findIndex((e) => e.ref === initImg)
    );
  }

  function handleActiveIndexChange(index) {
    setCurrentImage(currentGallery.topPictures.find((_, i) => i === index));
  }

  useEffect(() => {
    setTimeout(() => {
      topSwiperRef.current.swiper.slideTo(initIndex);
    }, 200);
  }, [initIndex]);
  useEffect(() => {
    getInitIndex();
  }, [initImg]);
  useEffect(() => {}, [currentImage]);

  return (
    <div className="relative flex flex-col justify-center h-full pt-20">
      <div
        className="absolute top-0 left-0 w-full h-full transition-all duration-300 "
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: `blur(8px)`,
          zIndex: 1,
        }}
      />
      <div className="absolute z-10 cursor-pointer top-[33px]  left-5">
        <img
          src={IcArrowLeft}
          alt="IcArrowLeft"
          onClick={() => {
            setVisible(false);
          }}
        />
      </div>
      <div className="z-10 ml-5 text-base font-bold text-white">
        {currentImage.caption || ""}
      </div>
      <Swiper
        ref={topSwiperRef}
        spaceBetween={0}
        initialSlide={initIndex}
        // thumbs={{ swiper: thumbsSwiper }}
        // modules={[FreeMode, Thumbs]}
        slidesPerView={1}
        pagination={true}
        modules={[Pagination]}
        className=" mySwiper2 fullscreen-gallery-view"
        onActiveIndexChange={(e) => {
          handleActiveIndexChange(e.activeIndex);
        }}
        onSlideChange={(e) => {
          handleActiveIndexChange(e.activeIndex);
        }}
      >
        {currentGallery.topPictures.map((e, index) => (
          <SwiperSlide key={index} className="relative pb-10">
            <img src={e.ref} alt="gallery" className="relative z-10" />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <Swiper
        onSwiper={setThumbsSwiper}
        initialSlide={initIndex}
        spaceBetween={10}
        slidesPerView={useCheck425Screen() ? 2.75 : 4.75}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="!py-5 mySwiper"
      >
        {currentGallery.topPictures.map((e, index) => (
          <SwiperSlide key={index} className="relative">
            <LazyLoadComponent>
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage: `url('${e.ref}')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
            </LazyLoadComponent>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
}
