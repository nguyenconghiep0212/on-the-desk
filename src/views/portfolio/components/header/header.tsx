import React, { useEffect, useState } from "react";
import "./index.scss";
import { useCheckMobileScreen } from "helper/checkMobile.ts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import IcCamera from "assests/icon/ic-camera-blue.svg";
import { Input, Upload, UploadProps } from "antd";
import Logo from "assests/landing/logo.svg";
import { uploadAvatar, uploadCover } from "api/index";
import { useRecoilState } from "recoil";
import { portfolioEdit, userInfoPortfolio } from "store/portfolio";

function SwiperMobile({
  currentImg,
  getCurrentImg,
  userInfo,
  setUserInfo,
  isEdit,
}) {
  const props: UploadProps = {
    name: "file",
    action: async (file) => await uploadFile(file),
    headers: {
      authorization: "authorization-text",
    },
  };

  async function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadCover(fd);
    if (res) {
      setUserInfo({
        ...userInfo,
        backgrounds: [`${process.env.REACT_APP_BASE_IMG}${res.data}`],
      });
    }
  }
  return (
    <div className="relative flex justify-center w-full h-full bg-neutral-900 ">
      {isEdit && (
        <Upload
          {...props}
          className="absolute z-20 upload-hidden bottom-6 right-5"
        >
          <div
            className="flex items-center justify-center w-6 h-6 rounded cursor-pointer "
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.08) 100%)",
            }}
          >
            <img
              src={IcCamera}
              alt="IcCamera"
              className="text-primary-blue-dark "
            />
          </div>
        </Upload>
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
      <div className="z-1 !absolute top-1/2 h-full w-full -translate-y-1/2 lg:!w-3/4 <3xs:!w-3/4">
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
                <img src={Logo} alt="Logo" className="!h-1/2 !w-min" />
              </div>
            )}
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

function SwiperDesk({
  currentImg,
  getCurrentImg,
  userInfo,
  setUserInfo,
  isEdit,
}) {
  const props: UploadProps = {
    name: "file",
    action: async (file) => await uploadFile(file),
    headers: {
      authorization: "authorization-text",
    },
  };

  async function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadCover(fd);
    if (res) {
      setUserInfo({
        ...userInfo,
        backgrounds: [`${process.env.REACT_APP_BASE_IMG}${res.data}`],
      });
    }
  }
  return (
    <div className="relative w-full h-full ">
      {isEdit && (
        <Upload
          {...props}
          className="absolute bottom-0 z-20 upload-hidden right-5"
        >
          <div
            className="flex items-center justify-center w-6 h-6 rounded cursor-pointer "
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.08) 100%)",
            }}
          >
            <img
              src={IcCamera}
              alt="IcCamera"
              className="text-primary-blue-dark "
            />
          </div>
        </Upload>
      )}

      {userInfo.backgrounds && (
        <div
          className="h-full sm:w-[300%] sm:-translate-x-1/2  "
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

function Component() {
  const [isEdit] = useRecoilState(portfolioEdit);
  const [userInfo, setUserInfo] = useRecoilState(userInfoPortfolio);
  const [currentImg, setCurentImg] = useState(
    userInfo.backgrounds ? userInfo.backgrounds[0] : Logo,
  );
  const props: UploadProps = {
    name: "file",
    action: async (file) => await uploadFile(file),
    headers: {
      authorization: "authorization-text",
    },
  };

  async function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadAvatar(fd);
    if (res) {
      setUserInfo({
        ...userInfo,
        avatar: `${process.env.REACT_APP_BASE_IMG}${res.data}`,
      });
    }
  }

  function getCurrentImg(event) {
    setCurentImg(userInfo.backgrounds[event.activeIndex]);
  }
  useEffect(() => {
    setCurentImg(userInfo.backgrounds ? userInfo.backgrounds[0] : Logo);
  }, [userInfo.backgrounds]);
  return (
    <div className="relative flex h-[40vh] justify-center <xs:!h-[320px]">
      <div className="flex flex-col w-full ">
        {useCheckMobileScreen()
          ? SwiperMobile({
              currentImg,
              getCurrentImg,
              userInfo,
              setUserInfo,
              isEdit,
            })
          : SwiperDesk({
              currentImg,
              getCurrentImg,
              userInfo,
              setUserInfo,
              isEdit,
            })}

        <div className="z-10 mx-2 -mt-8 flex items-center <3xs:flex <3xs:flex-col <3xs:items-center desktop:-mt-10">
          <div className="relative">
            <div
              style={{
                backgroundImage: `url(${userInfo.avatar || Logo})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="z-10 w-24 h-24 rounded-full desktop:h-32 desktop:w-32 "
            />
            {isEdit && (
              <Upload
                {...props}
                className="absolute bottom-0 z-20 upload-hidden right-2"
              >
                <div
                  className="flex items-center justify-center w-6 h-6 rounded cursor-pointer "
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.08) 100%)",
                  }}
                >
                  <img
                    src={IcCamera}
                    alt="IcCamera"
                    className="text-primary-blue-dark "
                  />
                </div>
              </Upload>
            )}
          </div>

          <div className="ml-4  mt-8 flex flex-col space-y-1 <3xs:mt-2 <3xs:w-full <3xs:items-center ">
            {isEdit ? (
              <div>
                <Input
                  value={userInfo.name}
                  bordered={false}
                  className="username-desktop px-0 text-lg <xs:text-base"
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, name: e.target.value });
                  }}
                />
              </div>
            ) : (
              <span className="username-desktop text-lg <xs:text-base">
                {userInfo.name}
              </span>
            )}
            {isEdit ? (
              <div>
                <Input
                  value={userInfo.description}
                  bordered={false}
                  className="description-desktop px-0 text-[12px] font-thin"
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, description: e.target.value });
                  }}
                />
              </div>
            ) : (
              <span className="description-desktop text-[12px] font-thin <3xs:text-center">
                {userInfo.description}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
