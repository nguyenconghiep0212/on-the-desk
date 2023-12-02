import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fullScreenVisible } from "store/gallery";
import "./index.scss";

// COMPONENT
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FullScreenImg from "./fullScreen";
import NavigateMenu from "../navigateMenu/index";
// import Feedback from "../portfolio/components/feedback/index";
import CustomerAvatarPlaceholder from "assests/portfolio/customer_avatar_placeholder.jpg";
import GalleryPlaceholder from "assests/portfolio/gallery_thumbnail_placeholder.svg";
import Footer from "views/footer";

// INTERFACE
import { GALLERY_CUSTOMER } from "interface/gallery";
import { CUSTOMER } from "interface/customer";
import { USER_INFO } from "interface/user";

// API
import {
  getUserProfile,
  getGalleryByCustomerShortcut,
  getCustomerById,
} from "api";
import { useCookies } from "react-cookie";

function Component() {
  const routeParams = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["current-user-shortcut"]);
  const [visible, setVisible] = useRecoilState(fullScreenVisible);

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
    backgrounds: "",
    shortcut: "",
    package: {
      id: "",
    },
  });
  const [customerInfo, setCustomerInfo] = useState<CUSTOMER>({
    customerName: "",
    shortcut: "",
  });
  const [currentImg, setCurrentImg] = useState("");
  const [currentGallery, setCurrentGallery] = useState({});

  const profile_menu = [
    {
      key: "card",
      label: "Tạo thẻ",
      icon: "solar:card-outline",
      onClick() {
        navigate(`/${cookies["current-user-shortcut"]}/addCard`);
      },
    },
    {
      key: "account",
      label: "Tài khoản",
      icon: "line-md:account",
      onClick() {},
    },
    {
      key: "portfolio",
      label: "Hồ sơ",
      icon: "simple-icons:readdotcv",
      onClick() {
        navigate(`/${cookies["current-user-shortcut"]}`);
        window.location.reload();
      },
    },
  ];

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
    if (routeParams.userShortcut) {
      try {
        const res = await getUserProfile(routeParams.userShortcut);
        if (res) {
          setUserInfo(res.data);
        }
      } catch (error) {}
    }
  }
  async function handleGetCustomerByShortcut() {
    if (routeParams.customerShortcut) {
      try {
        const res = await getCustomerById(routeParams.customerShortcut);
        if (res) {
          setCustomerInfo(res.data);
        }
      } catch (error) {}
    }
  }
  async function handleGetGalleryByCustomerShortcut() {
    if (routeParams.customerShortcut) {
      try {
        const res = await getGalleryByCustomerShortcut(
          routeParams.customerShortcut
        );
        if (res) {
          res.data.gals.forEach((e) => {
            e.topPictures.forEach((f) => {
              if (!f.ref.includes(process.env.REACT_APP_BASE_IMG)) {
                f.ref = process.env.REACT_APP_BASE_IMG + f.ref;
              }
            });
          });
          const galleryData = res.data.gals;
          setGalleries([...galleryData]);
        }
      } catch (error) {}
    }
  }

  useEffect(() => {
    handleGetGalleryByCustomerShortcut();
    handleGetUserProfile();
    handleGetCustomerByShortcut();
  }, []);
  useEffect(() => {}, [galleries, visible]);

  function masonryGrid() {
    return (
      <div>
        {galleries.map((e, index) => (
          <div key={index} className="my-2">
            <div className="text-[#B6B6B6] font-bold text-base mb-4">
              {e.galleryName}
            </div>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 290: 1, 360: 2, 768: 3 }}
            >
              <Masonry gutter="0.5rem">
                {e.topPictures.map((f, i) => (
                  <div key={i} className="cursor-pointer rounded-2xl">
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
    <div className="flex flex-col items-center w-full h-[max-content] ">
      <div className="relative w-full lg:!w-3/4 <3xs:!w-3/4 h-full pb-3">
        {/* NAVIGATE USER */}
        <Icon
          className="absolute top-[33px] z-10 cursor-pointer text-lg 3xs:left-3  text-white"
          icon="ep:back"
          onClick={handleBack}
        />
        <div
          className="absolute top-[33px] z-10  text-lg right-5 rounded-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.31) 0%, rgba(255, 255, 255, 0.08) 100%)",
          }}
        >
          <NavigateMenu profile_menu={profile_menu} />
        </div>

        {/* BACKGROUND COVER */}
        <div className="relative w-full <xs:!h-[320px] h-[40vh] ">
          <div
            className="sm:w-[300%] sm:-translate-x-1/2 h-full z-[5] relative "
            style={{
              backgroundImage: `url('${
                galleries[0].galleryThumb
                  ? galleries[0].galleryThumb.includes(
                      process.env.REACT_APP_BASE_IMG
                    )
                    ? galleries[0].galleryThumb
                    : process.env.REACT_APP_BASE_IMG + galleries[0].galleryThumb
                  : userInfo.backgrounds.includes(
                      process.env.REACT_APP_BASE_IMG
                    )
                  ? userInfo.backgrounds
                  : process.env.REACT_APP_BASE_IMG + userInfo.backgrounds
              }')`,
              WebkitFilter: `blur(24px)`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              boxShadow: "inset 0px -70px 35px -25px #18191A",
            }}
          />
          <div
            className="absolute z-[5] top-0 w-full h-full -translate-x-1/2 left-1/2"
            style={{
              backgroundImage: `url('${
                galleries[0].galleryThumb
                  ? galleries[0].galleryThumb.includes(
                      process.env.REACT_APP_BASE_IMG
                    )
                    ? galleries[0].galleryThumb
                    : process.env.REACT_APP_BASE_IMG + galleries[0].galleryThumb
                  : userInfo.backgrounds.includes(
                      process.env.REACT_APP_BASE_IMG
                    )
                  ? userInfo.backgrounds
                  : process.env.REACT_APP_BASE_IMG + userInfo.backgrounds
              }')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              boxShadow: "inset 0px -70px 35px -40px #18191A",
            }}
          />
        </div>

        {/* AVATAR */}
        <div className="relative bg-[#18191A] z-10  sm:w-[300%] sm:overflow-x-clip -translate-x-1/2">
          {/* CUSTOMER */}
          <div className="flex items-center space-x-2 translate-x-1/2">
            <div
              className="relative 3xs:w-20 3xs:h-20 3xs:ml-3 <3xs:w-14 <3xs:h-14 <3xs:!min-w-[3.5rem]  mt-[-25px] rounded-full"
              style={{
                backgroundImage: `url(${
                  customerInfo.customerAvatar
                    ? process.env.REACT_APP_BASE_IMG +
                      customerInfo.customerAvatar
                    : CustomerAvatarPlaceholder
                })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>

            <div className="flex flex-col">
              <span className="text-base <3xs:text-sm font-semibold <3xs:truncate text-primary-blue-medium">
                {customerInfo.customerName || "Anonymous"}
              </span>
              <span className="text-sm font-medium text-primary-blue-medium">
                {customerInfo.customerDescription}
              </span>
            </div>
          </div>

          {/* USER */}
          <div className="translate-x-1/2 <3xs:mr-3 <3xs:-mt-2 ">
            <div className="w-10 <3xs:w-8 h-6 text-white border-r 3xs:ml-3  border-primary-blue-medium" />
            <div className="flex space-x-2">
              <div
                className="w-20 h-20 <3xs:w-16 <3xs:min-w-[4rem] <3xs:h-16 -mt-3 scale-75 border-2 rounded-full 3xs:ml-3 border-primary-blue-medium"
                style={{
                  backgroundImage: `url(${userInfo.avatar})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
              <span className="mt-4 text-base <3xs:text-sm font-semibold text-white">
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

      {userInfo.isOwner ? (
        <div
          className="sticky ml-[auto] w-[max-content] bottom-[4.5rem] z-50"
          onClick={() => {
            navigate(
              `/${cookies["current-user-shortcut"]}/addGallery/${customerInfo.shortcut}`
            );
          }}
        >
          <div
            style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.60)" }}
            className="bg-[#1E2530] mr-5 cursor-pointer rounded-full flex justify-center items-center w-[50px] h-[50px] "
          >
            <Icon
              className="text-lg text-primary-blue-medium"
              icon="tabler:edit"
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="z-50 sticky bottom-0 w-[100vw] desktop:-translate-x-1/6 backdrop-blur">
        <Footer />
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
