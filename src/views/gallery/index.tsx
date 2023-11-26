import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fullScreenVisible } from "store/gallery";
import "./index.scss";

// COMPONENT
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Icon } from "@iconify/react";
import { Button, Input, Modal, Select, Upload, UploadProps } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FullScreenImg from "./fullScreen";
import NavigateMenu from "../navigateMenu/index";
// import Feedback from "../portfolio/components/feedback/index";
import CustomerAvatarPlaceholder from "assests/portfolio/customer_avatar_placeholder.jpg";
import GalleryPlaceholder from "assests/portfolio/gallery_thumbnail_placeholder.svg";
import Footer from "views/footer";
import IcCamera from "assests/icon/ic-camera-blue.svg";

// INTERFACE
import { GALLERY_CUSTOMER, UPDATE_GALLERY } from "interface/gallery";
import { CUSTOMER } from "interface/customer";
import { USER_INFO } from "interface/user";

// API
import {
  getUserProfile,
  getGalleryByCustomerId,
  getCustomerById,
  uploadGallery,
  getTopic,
  createGallery,
} from "api";
import { useCookies } from "react-cookie";

function Component() {
  const { Dragger } = Upload;
  const routeParams = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["current-user"]);
  const [visible, setVisible] = useRecoilState(fullScreenVisible);

  const [topicList, setTopicList] = useState([]);
  const [topicSearch, setTopicSearch] = useState("");
  const [isEdit, setIsEdit] = useState(false);
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
  const [customerInfoOrigin, setCustomerInfoOrigin] = useState({});
  const [currentImg, setCurrentImg] = useState("");
  const [currentGallery, setCurrentGallery] = useState({});
  const [newGallery, setNewGallery] = useState<UPDATE_GALLERY>({
    customerId: "",
    customerName: "",
    index: 0,
    name: "",
    data: [],
    thumb: "",
    topics: [],
    shortcut: "",
  });

  const profile_menu = [
    {
      key: "card",
      label: "Tạo thẻ",
      icon: "solar:card-outline",
      onClick() {
        navigate(`/${cookies["current-user"].shortcut}/addCard`);
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
        navigate(`/${cookies["current-user"].shortcut}`);
        window.location.reload();
      },
    },
  ];
  const propsNewGalleyThumb: UploadProps = {
    name: "file",
    multiple: true,
    action: async (file) => await uploadFileGallery(file, "thumb"),
  };
  const propsNewGalleyAlbum: UploadProps = {
    name: "file",
    multiple: true,
    action: async (file) => await uploadFileGallery(file, "album"),
  };
  const propsAvatar: UploadProps = {
    name: "file",
    action: async (file) => await uploadFile(file, "avatar"),
    headers: {
      authorization: "authorization-text",
    },
  };
  const propsCover: UploadProps = {
    name: "file",
    action: async (file) => await uploadFile(file, "cover"),
    headers: {
      authorization: "authorization-text",
    },
  };
  async function uploadFileGallery(file) {
    const fd = new FormData();
    fd.append("files", file);
    const res = await uploadGallery(fd);
    if (res) {
      setNewGallery({ ...newGallery, thumb: res.data[0] });
    }
  }
  async function uploadFile(file, mode) {}
  function handleOpenFullscreen(gallery, img) {
    setCurrentImg(img);
    setCurrentGallery(gallery);
    setVisible(true);
  }

  async function getListTopic() {
    const res = await getTopic(cookies["current-user"].shortcut);
    if (res) {
      setTopicList(res.data.map((e) => ({ value: e, label: e })));
    }
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
          setCustomerInfoOrigin(res.data);
          setNewGallery({
            ...newGallery,
            customerId: res.data.customerId,
            customerName: res.data.customerName,
          });
        }
      } catch (error) {}
    }
  }
  async function handleGetGalleryByCustomerId() {
    if (routeParams.customerId) {
      try {
        const res = await getGalleryByCustomerId(routeParams.customerId);
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
  //
  async function handleAddGallery() {
    try {
      await createGallery(newGallery);
      setNewGallery({
        customerId: "",
        customerName: "",
        index: 0,
        name: "",
        data: [],
        thumb: "",
        topics: [],
        shortcut: "",
      });
      handleGetGalleryByCustomerId();
    } catch (error) {
      console.error(error);
    }
  }
  function handleCancelChange() {
    setIsEdit(false);
    setCustomerInfo(customerInfoOrigin);
  }
  function handleAcceptChange() {
    console.log("galleries", galleries);
  }

  useEffect(() => {
    handleGetGalleryByCustomerId();
    handleGetUserProfile();
    handleGetCustomerById();
    getListTopic();
    if (searchParams.get("mode") === "edit") {
      setIsEdit(true);
    }
  }, []);
  useEffect(() => {}, [newGallery, galleries, visible]);

  function displayCreateForm() {
    return (
      <div className="px-3 mt-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Tên album mới"
            bordered={false}
            value={newGallery.name}
            className="p-0 mb-4 text-sm font-bold"
            onChange={(e) => {
              setNewGallery({ ...newGallery, name: e.target.value });
            }}
          />
          {newGallery.name && (
            <Icon
              className="text-[#EB5757] h-5 w-5 cursor-pointer"
              icon="tabler:trash"
              onClick={() => {}}
            />
          )}
        </div>

        {newGallery.thumb ? (
          <div className="relative">
            <Upload
              {...propsNewGalleyThumb}
              className="absolute z-20 bottom-5 right-5 upload-hidden"
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
            <div
              className="rounded aspect-video"
              style={{
                backgroundImage: `url('${process.env.REACT_APP_BASE_IMG}${newGallery.thumb}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </div>
        ) : (
          <Dragger {...propsNewGalleyThumb} className="">
            <p className=" flex min-h-[360px] items-center justify-center space-x-1 text-sm font-semibold !text-white ant-upload-text">
              <Icon icon="tabler:plus" />
              <span> Chọn ảnh bìa</span>
            </p>
          </Dragger>
        )}

        <div>
          {newGallery.topics.map((e, i) => (
            <div
              key={i}
              className="mr-2 mb-2 inline-flex cursor-pointer rounded-lg bg-[#2f353f]"
            >
              <div className="h-full filter-tag-bg">
                <div
                  key={i}
                  className="flex items-start justify-center space-x-1 font-semibold filter-tag"
                >
                  <span className="font-semibold text-primary-blue-medium">
                    {e}
                  </span>
                  <div
                    className="!h-4 !w-4"
                    onClick={() => {
                      const arr = newGallery.topics.filter(
                        (el, index) => i !== index
                      );
                      setNewGallery({ ...newGallery, topics: arr });
                    }}
                  >
                    <Icon
                      className="text-[#EB5757] h-4 w-4"
                      icon="tabler:trash"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative w-full">
          <Icon
            className="absolute left-0 w-6 h-8 text-primary-blue-medium "
            icon="ci:tag"
            style={{ transform: "scale(-1, 1)" }}
          />
          <Select
            showSearch
            className="w-full text-white topic-select"
            placeholder={
              <div className="flex items-start w-full space-x-1 text-white pl-7 ">
                <span>Gắn nhãn</span>
              </div>
            }
            value={null}
            optionFilterProp="children"
            onChange={(e) => {
              setNewGallery({
                ...newGallery,
                topics: [...newGallery.topics, e],
              });
            }}
            filterOption={(
              input: string,
              option?: { label: string; value: string }
            ) =>
              (option?.label || "").toLowerCase().includes(input.toLowerCase())
            }
            dropdownRender={(menu) => (
              <div className="gradient">
                {!topicList.map((f) => f.value).includes(topicSearch) &&
                topicSearch ? (
                  <Button
                    className="  !shadow-none w-full flex justify-start"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.31) 0%, rgba(255, 255, 255, 0.08) 100%)",
                    }}
                    onClick={() => {
                      setNewGallery({
                        ...newGallery,
                        topics: [...newGallery.topics, topicSearch],
                      });
                    }}
                  >
                    Thêm nhãn {topicSearch}
                  </Button>
                ) : (
                  <></>
                )}

                {menu}
              </div>
            )}
            bordered={false}
            options={topicList}
            onSearch={setTopicSearch}
          />
        </div>

        <div className="grid gap-1 <xs:grid-cols-2 <md:grid-cols-3 grid-cols-5 ">
          {newGallery.data.map((e, index) => (
            <div key={index} className="relative my-2 aspect-square">
              <div className="absolute top-1 right-1 bg-[#0000004d] p-1 rounded-full ">
                <Icon
                  className="text-[#EB5757] h-6 w-6 cursor-pointer"
                  icon="tabler:trash"
                  onClick={() => {
                    setNewGallery({
                      ...newGallery,
                      data: newGallery.data?.filter((_, i) => i !== index),
                    });
                  }}
                />
              </div>
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url('${process.env.REACT_APP_BASE_IMG}${e.ref}')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
            </div>
          ))}
        </div>
        <div className="space-y-4 lg:space-y-0 lg:flex lg:justify-end lg:space-x-2">
          <Upload
            {...propsNewGalleyAlbum}
            className="flex w-full h-6 upload_new_gallery_album upload-hidden lg:w-max"
          >
            <div
              className="flex items-center justify-center rounded w-[inherit] cursor-pointer "
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.08) 100%)",
              }}
            >
              <Button className=" w-full !shadow-none !bg-[#6b6c6d] !border-white border-1 !border-solid">
                <div className="flex items-center justify-center space-x-1">
                  <Icon className="w-4 h-4" icon="tabler:plus" />
                  <span>Thêm ảnh</span>
                </div>
              </Button>
            </div>
          </Upload>
          {newGallery.data.length && newGallery.name && newGallery.thumb ? (
            <Button
              className="lg:w-max w-full !shadow-none gradient_btn"
              onClick={() => {
                handleAddGallery();
              }}
            >
              Hoàn thành
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }

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
          {isEdit && (
            <Upload
              {...propsCover}
              className="absolute z-20 bottom-6 right-5 upload-hidden"
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
            >
              {isEdit && (
                <Upload
                  {...propsAvatar}
                  className="absolute z-20 -bottom-1 -right-1 upload-hidden"
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
            {isEdit ? (
              <div className="flex flex-col">
                <Input
                  value={customerInfo.customerName}
                  bordered={false}
                  className="p-0 text-base <3xs:text-sm font-semibold <3xs:truncate !text-primary-blue-medium"
                  onChange={(e) => {
                    setCustomerInfo({
                      ...customerInfo,
                      customerName: e.target.value,
                    });
                  }}
                />
                <Input
                  value={customerInfo.customerDescription}
                  bordered={false}
                  className="p-0 text-sm font-medium !text-primary-blue-medium"
                  onChange={(e) => {
                    setCustomerInfo({
                      ...customerInfo,
                      customerDescription: e.target.value,
                    });
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-base <3xs:text-sm font-semibold <3xs:truncate text-primary-blue-medium">
                  {customerInfo.customerName || "Anonymous"}
                </span>
                <span className="text-sm font-medium text-primary-blue-medium">
                  {customerInfo.customerDescription}
                </span>
              </div>
            )}
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
        {displayCreateForm()}
        <div className="px-3 mt-3 space-y-6">
          {/* GALLERY */}
          <div className="overflow-auto ">{masonryGrid()}</div>
          {/* FEEDBACK */}
          {/* <div className="p-3 rounded-2xl w-full bg-[#1E2530]">
            <Feedback alias={info.feedback.alias} data={info.feedback.data} />
          </div> */}
        </div>
      </div>

      {userInfo.isOwner &&
        (isEdit ? (
          <div className="sticky ml-[auto] w-[max-content] bottom-[4.5rem] z-50 space-y-1">
            <div
              style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.60)" }}
              className="bg-[#1E2530] mr-5 cursor-pointer rounded-full flex justify-center items-center w-[50px] h-[50px] "
              onClick={() => {
                handleCancelChange();
              }}
            >
              <Icon
                className="text-lg text-[#EB5757]"
                icon="tabler:arrow-left"
              />
            </div>
            <div
              style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.60)" }}
              className="bg-[#1E2530] mr-5 cursor-pointer rounded-full flex justify-center items-center w-[50px] h-[50px] "
              onClick={() => {
                handleAcceptChange();
              }}
            >
              <Icon
                className="text-lg text-primary-blue-medium"
                icon="tabler:check"
              />
            </div>
          </div>
        ) : (
          <div
            className="sticky ml-[auto] w-[max-content] bottom-[4.5rem] z-50"
            onClick={() => {
              setIsEdit(true);
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
        ))}

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
