import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fullScreenVisible } from "store/gallery";
import "./index.scss";
// COMPONENT
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Icon } from "@iconify/react";
import { Button, Modal } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FullScreenImg from "./fullScreen";
// import Feedback from "../portfolio/components/feedback/index";
import CustomerAvatarPlaceholder from "assests/customer_avatar_placeholder.jpg";
import GalleryPlaceholder from "assests/gallery_thumbnail_placeholder.jpg";

// INTERFACE
import { GALLERY_CUSTOMER } from "interface/gallery";
import { CUSTOMER } from "interface/customer";
import { USER_INFO } from "interface/user";

// API
import { getUserProfile, getGalleryByCustomerId, getCustomerById } from "api";

function Component() {
  const [galleries, setGalleries] = useState<GALLERY_CUSTOMER[]>([
    {
      customerShortcut: "",
      galleryShortcut: "",
      customerName: "",
      galleryName: "",
      galleryThumb: "",
      topPictures: [
        {
          name: "",
          ref: "",
          caption: "",
          index: 0,
          dimension: "",
          sizeOnDisk: 0,
        },
      ],
    },
  ]);
  const [userInfo, setUserInfo] = useState<USER_INFO>({
    name: "",
    shortcut: "",
    package: {
      id: "",
    },
  });
  const [customerInfo, setCustomerInfo] = useState<CUSTOMER>({
    customerName: "",
    shortcut: "",
  });
  const [visible, setVisible] = useRecoilState(fullScreenVisible);
  const [currentImg, setCurrentImg] = useState("");
  const [currentGallery, setCurrentGallery] = useState({});
  const routeParams = useParams();
  const navigate = useNavigate();

  function handleOpenFullscreen(gallery, img) {
    setCurrentImg(img);
    setCurrentGallery(gallery);
    setVisible(true);
  }
  function handleCloseFullscreen() {
    setCurrentImg(""); 
  }
  function handleBack() {
    return navigate(-1);
  }

  // GỌI API
  async function handleGetUserProfile() {
    if (routeParams.userId) {
      try {
        const res = await getUserProfile(routeParams.userId);
        if (res) {
          setUserInfo(res.data);
        }
      } catch (error) {}
    }
  }
  async function handleGetCustomerById() {
    if (routeParams.customerId) {
      try {
        const res = await getCustomerById(routeParams.customerId);
        if (res) {
          setCustomerInfo(res.data);
          console.log("customerInfo", customerInfo);
        }
      } catch (error) {}
    }
  }
  async function handleGetGalleryByCustomerId() {
    if (routeParams.customerId) {
      try {
        const res = await getGalleryByCustomerId(routeParams.customerId);
        if (res) {
          const galleryData = res.data.gals;
          setGalleries([...galleryData]);
        }
      } catch (error) {}
    }
  }
  //

  useEffect(() => {
    handleGetGalleryByCustomerId();
    handleGetUserProfile();
    handleGetCustomerById();
  }, []);
  useEffect(() => {}, [galleries, visible]);
  function masonryGrid() {
    return (
      <div>
        {galleries.map((e, index) => (
          <div key={index} className="my-2">
            <div className="text-[#B6B6B6] font-bold text-lg mb-4">
              {e.galleryName}
            </div>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 290: 1, 360: 2, 768: 3 }}
            >
              <Masonry gutter="0.5rem">
                {e.topPictures.map((f, i) => (
                  <div key={i} className='cursor-pointer rounded-2xl'>
                    <LazyLoadImage
                      alt="gallery_src"
                      effect="opacity"
                      placeholderSrc={GalleryPlaceholder}
                      src={f.ref}
                      className=" rounded-2xl"
                      onClick={() => {
                        handleOpenFullscreen(e, f.ref);
                      }}
                    />
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
            <div id="divider" className="flex items-center justify-center py-6">
              <div className="w-2/3 border-t border-dashed border-primary-blue-medium"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="relative flex flex-col items-center w-full h-full">
      <div className="w-full lg:!w-3/4 <3xs:!w-3/4 h-full pb-3">
        {/* INFO */}
        <div className="relative w-full h-1/3 sm:h-2/5 lg:h-3/5">
          <div
            className="sm:w-[300%] sm:-translate-x-1/2 h-full z-[5] relative "
            style={{
              backgroundImage: `url('${
                galleries[0].galleryThumb || userInfo.backgrounds
              }')`,
              WebkitFilter: `blur(24px)`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              boxShadow: "inset 0px -70px 35px -25px #18191A",
            }}
          ></div>
          <div className="absolute top-0 z-10 <3xs:-left-2 left-5 lg:-left-4 ">
            <Button
              type="text"
              className="!px-0 !shadow-none"
              onClick={handleBack}
            >
              <Icon
                className="text-2xl  ml-[-16px] text-white"
                icon="ep:back"
              />
            </Button>
          </div>

          <div
            className="absolute z-[5] top-0 w-full h-full -translate-x-1/2 left-1/2"
            style={{
              backgroundImage: `url('${
                galleries[0].galleryThumb || userInfo.backgrounds
              }')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              boxShadow: "inset 0px -70px 35px -40px #18191A",
            }}
          ></div>
        </div>
        <div className="relative bg-[#18191A] z-10  sm:w-[300%] sm:overflow-x-clip -translate-x-1/2">
          {/* CUSTOMER */}
          <div className="flex items-center space-x-2 translate-x-1/2">
            <div className=" w-20 h-20 ml-3 mt-[-25px]">
              <img
                src={customerInfo.customerAvatar || CustomerAvatarPlaceholder}
                alt="customer_avatar"
                className="z-20 h-full rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-primary-blue-medium">
                {customerInfo.customerName || "Anonymous"}
              </span>
              <span className="text-sm font-thin text-primary-blue-medium">
                {customerInfo.customerAddress || "N/A"}
              </span>
            </div>
          </div>

          {/* USER */}
          <div className="translate-x-1/2">
            <div className="w-10 h-6 ml-3 text-white border-r border-primary-blue-medium" />
            <div className="flex space-x-2">
              <div className="w-20 h-20 ml-3 -mt-3 scale-75 border-2 rounded-full border-primary-blue-medium">
                <img
                  className="h-full rounded-full"
                  src={userInfo.avatar}
                  alt="user_avatar"
                />
              </div>
              <span className="mt-4 text-lg font-semibold text-white">
                {userInfo.name}
              </span>
            </div>
          </div>
        </div>

        <div className="px-3 mt-3 space-y-6">
          {/* GALLERY */}
          <div className="overflow-auto ">{masonryGrid()}</div>
          {/* FEEDBACK */}
          {/* <div className="p-3 rounded-2xl w-full bg-[#1E2530]">
            <Feedback alias={info.feedback.alias} data={info.feedback.data} />
          </div> */}
        </div>
      </div>

      <Modal
        className="modalFullScreen"
        open={visible}
        closeIcon={false}
        footer={null}
        afterClose={() => {
          handleCloseFullscreen();
        }}
      >
        <FullScreenImg currentGallery={currentGallery} initImg={currentImg} />
      </Modal>
    </div>
  );
}

export default Component;
