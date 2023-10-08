import { Icon } from "@iconify/react";
import { Button } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Feedback from "../portfolio/components/feedback/index";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import CustomerAvatarPlaceholder from "assests/customer_avatar_placeholder.jpg";
import { GALLERY_CUSTOMER } from "interface/gallery";
import { CUSTOMER } from "interface/customer";
import { USER_INFO } from "interface/user";
import { getUserProfile, getGalleryByCustomerId, getCustomerById } from "api";

function Component() {
  const [gallery, setGallery] = useState<GALLERY_CUSTOMER[]>([
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
  const routeParams = useParams();
  console.log("routeParams", routeParams);
  const navigate = useNavigate();

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
          setGallery([...galleryData]);
        }
      } catch (error) {}
    }
  }

  function handleBack() {
    return navigate(-1);
  }
  useEffect(() => {
    handleGetGalleryByCustomerId();
    handleGetUserProfile();
    handleGetCustomerById();
  }, []);
  useEffect(() => {
    console.log("gallery", gallery[0].galleryThumb);
  }, [gallery]);
  function masonryGrid() {
    return (
      <div>
        {gallery.map((e, index) => (
          <div key={index} className="my-2">
            <div className="text-[#B6B6B6] font-bold text-lg mb-4">
              {e.galleryName}
            </div>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 290: 1, 360: 2, 1536: 3 }}
            >
              <Masonry gutter="0.5rem">
                {e.topPictures.map((f, i) => (
                  <div key={i} className={` rounded-2xl`}>
                    <LazyLoadImage
                      alt="gallery_src"
                      placeholderSrc={f.ref}
                      src={f.ref}
                      className=" rounded-2xl"
                    />
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
            <div id="divider" className="flex items-center justify-center py-6">
              <div className="w-2/3 border-t border-dashed border-primary-blue-light"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full h-full sm:flex sm:flex-col sm:items-center">
      <div className="h-full pb-3 sm:w-1/2">
        {/* INFO */}
        <div className="relative w-full h-1/3 sm:h-2/5 lg:h-3/5">
          <div
            className="sm:w-[300%] sm:-translate-x-1/2 h-full  "
            style={{
              backgroundImage: `url('${
                gallery[0].galleryThumb || userInfo.backgrounds
              }')`,
              WebkitFilter: `blur(24px)`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              boxShadow: "inset 0px -70px 10px #18191A",
            }}
          ></div>
          <div className="absolute top-0 left-8 sm:-left-4 ">
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
            className="absolute top-0   h-full -translate-x-1/2 w-full lg:!w-3/4 <3xs:!w-3/4 left-1/2"
            style={{
              backgroundImage: `url('${
                gallery[0].galleryThumb || userInfo.backgrounds
              }')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              boxShadow: "inset 0px -70px 40px #18191A",
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
              <span className="text-xl font-semibold text-primary-blue-light-max">
                {customerInfo.customerName || "Anonymous"}
              </span>
              <span className="text-sm font-thin text-primary-blue-light-max">
                {customerInfo.customerAddress || "N/A"}
              </span>
            </div>
          </div>

          {/* USER */}
          <div className="translate-x-1/2">
            <div className="w-10 h-6 ml-3 text-white border-r border-primary-blue-light" />
            <div className="flex space-x-2">
              <div className="w-20 h-20 ml-3 -mt-3 scale-75 border-2 rounded-full border-primary-blue-light">
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
    </div>
  );
}

export default Component;
