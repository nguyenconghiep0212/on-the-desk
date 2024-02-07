import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fullScreenVisible } from "../../store/gallery.ts";
import "./index.scss";

// COMPONENT
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FullScreenImg from "./fullScreen.tsx";
import NavigateMenu from "../../components/navigateMenu/index.tsx";
// import Feedback from "../portfolio/components/feedback/index";
import CustomerAvatarPlaceholder from "assests/portfolio/customer_avatar_placeholder.jpg";
import GalleryPlaceholder from "assests/portfolio/gallery_thumbnail_placeholder.svg";
import Footer from "../../components/footer/index.tsx";

// INTERFACE
import { GALLERY_CUSTOMER } from "../../interface/gallery.ts";
import { CUSTOMER } from "../../interface/customer.ts";
import { USER_INFO } from "../../interface/user.ts";

// API
import {
  getUserProfile,
  getGalleryByCustomerShortcut,
  getCustomerByShortcut,
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
      icon: "bx:user",
      onClick() {
        navigate(`/${cookies["current-user-shortcut"]}/profile`);
      },
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
    return navigate(`/${cookies["current-user-shortcut"]}`);
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
        const res = await getCustomerByShortcut(routeParams.customerShortcut);
        if (res) {
          console.log("res", res);
          setCustomerInfo(res.data);
        }
      } catch (error) {}
    }
  }
  async function handleGetGalleryByCustomerShortcut() {
    if (routeParams.customerShortcut) {
      try {
        const res = await getGalleryByCustomerShortcut(
          routeParams.customerShortcut,
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
            <div className="mb-4 text-base font-bold text-[#B6B6B6]">
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
    <div className="flex h-[max-content] w-full flex-col items-center ">
      <div className="relative h-full w-full pb-3 lg:!w-3/4 <3xs:!w-3/4">
        {/* NAVIGATE USER */}
        <Icon
          className="absolute top-[33px] z-10 cursor-pointer text-lg text-white  3xs:left-3"
          icon="ep:back"
          onClick={handleBack}
        />
        <div
          className="absolute right-5 top-[33px]  z-10 rounded-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.31) 0%, rgba(255, 255, 255, 0.08) 100%)",
          }}
        >
          <NavigateMenu profile_menu={profile_menu} />
        </div>

        {/* BACKGROUND COVER */}
        <div className="relative h-[40vh] w-full <xs:!h-[320px] ">
          {customerInfo.customerCover ? (
            <div
              className="relative z-[5] h-full sm:w-[300%] sm:-translate-x-1/2"
              style={{
                backgroundImage: `url('${
                  process.env.REACT_APP_BASE_IMG + customerInfo.customerCover
                }')`,
                WebkitFilter: `blur(24px)`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                boxShadow: "inset 0px -70px 35px -25px #18191A",
              }}
            />
          ) : (
            <></>
          )}
          <div
            className={`${
              customerInfo.customerCover
                ? ""
                : "flex items-center justify-center bg-[#f0f0f0] sm:w-[300%]  "
            } absolute left-1/2 top-0 z-[5] h-full w-full -translate-x-1/2`}
            style={{
              backgroundImage: `url('${
                customerInfo.customerCover
                  ? process.env.REACT_APP_BASE_IMG + customerInfo.customerCover
                  : null
              }')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              boxShadow: "inset 0px -70px 35px -40px #18191A",
            }}
          >
            {customerInfo.customerCover ? (
              <></>
            ) : (
              <div>
                <Icon
                  className="h-[20vh] w-full text-[#bfbfbf]"
                  icon="bi:image"
                />
              </div>
            )}
          </div>
        </div>

        {/* AVATAR */}
        <div className="relative z-10 -translate-x-1/2  bg-[#18191A] sm:w-[300%] sm:overflow-x-clip">
          {/* CUSTOMER */}
          <div className="flex items-center space-x-2 translate-x-1/2">
            <div
              className="relative  mt-[-25px] rounded-full <3xs:h-14 <3xs:w-14 <3xs:!min-w-[3.5rem] 3xs:ml-3  3xs:h-20 3xs:w-20"
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
              <span className="text-base font-semibold text-primary-blue-medium <3xs:truncate <3xs:text-sm">
                {customerInfo.customerName || "Anonymous"}
              </span>
              <span className="text-sm font-medium text-primary-blue-medium">
                {customerInfo.customerDescription}
              </span>
            </div>
          </div>

          {/* USER */}
          <div className="translate-x-1/2 <3xs:-mt-2 <3xs:mr-3 ">
            <div className="h-6 w-10 border-r border-primary-blue-medium text-white <3xs:w-8  3xs:ml-3" />
            <div className="flex space-x-2">
              <div
                className="-mt-3 h-20 w-20 scale-75 rounded-full border-2 border-primary-blue-medium <3xs:h-16 <3xs:w-16 <3xs:min-w-[4rem] 3xs:ml-3"
                style={{
                  backgroundImage: `url(${userInfo.avatar})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
              <span className="mt-4 text-base font-semibold text-white <3xs:text-sm">
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
          className="sticky bottom-[4.5rem] z-50 ml-[auto] w-[max-content]"
          onClick={() => {
            navigate(
              `/${cookies["current-user-shortcut"]}/addGallery/${customerInfo.shortcut}`,
            );
          }}
        >
          <div
            style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.60)" }}
            className="mr-5 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#1E2530] "
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

      <div className="desktop:-translate-x-1/6 sticky bottom-0 z-50 w-[100vw] backdrop-blur">
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
