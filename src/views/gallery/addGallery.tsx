import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";

// COMPONENT
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Icon } from "@iconify/react";
import { Button, Input, Select, Upload, UploadProps } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
} from "api";
import { useCookies } from "react-cookie";

function Component() {
  const { Dragger } = Upload;
  const routeParams = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["current-user"]);
  const [galleries, setGalleries] = useState<GALLERY_CUSTOMER[]>([]);
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
  const propsThumbNewGalley: UploadProps = {
    name: "file",
    multiple: true,
    action: async (file) => await uploadFileGallery(file, "thumb"),
  };
  const propsAlbumNewGallery: UploadProps = {
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
  async function uploadFileGallery(file, mode) {
    const fd = new FormData();
    fd.append("files", file);
    const res = await uploadGallery(fd);
    if (res) {
      if (mode === "thumb") {
        setNewGallery({ ...newGallery, thumb: res.data[0] });
      } else {
        setNewGallery({
          ...newGallery,
          data: [...newGallery.data, res.data[0]],
        });
      }
    }
  }
  async function uploadFile(file, mode) {}

  function addNewTag() {
    setNewGallery({ ...newGallery, topics: [...newGallery.topics, ""] });
  }
  function removeTag(i) {
    const arr = newGallery.topics.filter((el, index) => i !== index);
    setNewGallery({ ...newGallery, topics: arr });
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
          setNewGallery({
            ...newGallery,
            customerId: res.data.customerName,
            customerName,
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
          const galleryData = res.data.gals;
          setGalleries([...galleryData]);
        }
      } catch (error) {}
    }
  }

  useEffect(() => {
    handleGetGalleryByCustomerId();
    handleGetUserProfile();
    handleGetCustomerById();
  }, []);
  useEffect(() => {}, [galleries]);
  function header() {
    return (
      <div>
        {/* NAVIGATE USER */}
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
                galleries.length
                  ? galleries[0].galleryThumb
                  : userInfo.backgrounds
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
                galleries.length
                  ? galleries[0].galleryThumb
                  : userInfo.backgrounds
              }')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              boxShadow: "inset 0px -70px 35px -40px #18191A",
            }}
          />

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
        </div>

        {/* AVATAR */}
        <div className="relative bg-[#18191A] z-10  sm:w-[300%] sm:overflow-x-clip -translate-x-1/2">
          {/* CUSTOMER */}
          <div className="flex items-center space-x-2 translate-x-1/2">
            <div className="relative 3xs:w-20 3xs:h-20 3xs:ml-3 <3xs:w-14 <3xs:h-14 <3xs:!min-w-[3.5rem]  mt-[-25px]">
              <div
                className="z-20 w-full h-full rounded-full"
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
            </div>

            <div className="flex flex-col">
              <Input
                value={customerInfo.customerName}
                bordered={false}
                placeholder="Tên thư viện"
                className="p-0 text-base <3xs:text-sm font-semibold <3xs:truncate !text-primary-blue-medium"
                onChange={(e) => {
                  setCustomerInfo({
                    ...customerInfo,
                    customerName: e.target.value,
                  });
                }}
              />
              <Input
                value={customerInfo.customerAddress}
                bordered={false}
                className="p-0 text-sm font-medium !text-primary-blue-medium"
                placeholder="Mô tả thư viện"
                onChange={(e) => {
                  setCustomerInfo({
                    ...customerInfo,
                    customerAddress: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          {/* USER */}
          <div className="translate-x-1/2 <3xs:mr-3 <3xs:-mt-2 ">
            <div className="w-10 <3xs:w-8 h-6 text-white border-r 3xs:ml-3  border-primary-blue-medium" />
            <div className="flex space-x-2">
              <div className="w-20 h-20 <3xs:w-16 <3xs:min-w-[4rem] <3xs:h-16 -mt-3 scale-75 border-2 rounded-full 3xs:ml-3 border-primary-blue-medium">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundImage: `url(${userInfo.avatar})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
              <span className="mt-4 text-base <3xs:text-sm font-semibold text-white">
                {userInfo.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function masonryGrid() {
    return (
      <div className="grid gap-1 <xs:grid-cols-2 <md:grid-cols-3 grid-cols-5 ">
        {newGallery.data.map((e, index) => (
          <div key={index} className="relative my-2 aspect-square">
            <div className="absolute top-1 right-1 bg-[#0000004d] p-1 rounded-full ">
              <Icon
                className="text-[#EB5757] h-6 w-6 cursor-pointer"
                icon="tabler:trash"
                onClick={() => {}}
              />
            </div>
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url('${process.env.REACT_APP_BASE_IMG}${e}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-full h-[max-content] ">
      <div className="relative w-full lg:!w-3/4 <3xs:!w-3/4 h-full pb-3 px-3">
        {header()}
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Tên album mới"
              bordered={false}
              value={newGallery.name}
              className="p-0 mb-4"
              onChange={(e) => {
                setNewGallery({ ...newGallery, name: e.target.value });
              }}
            />
            {newGallery.name && (
              <Icon
                className="text-[#EB5757] h-5 w-5 cursor-pointer"
                icon="tabler:trash"
                onClick={() => {
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
                }}
              />
            )}
          </div>

          {newGallery.thumb ? (
            <div className="relative">
              <div
                className="absolute top-[6px] right-[6px] cursor-pointer"
                onClick={() => {
                  setNewGallery({
                    ...newGallery,
                    thumb: "",
                  });
                }}
              >
                <Icon className="text-[#EB5757] h-4 w-4" icon="tabler:trash" />
              </div>
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
            <Dragger {...propsThumbNewGalley} className="">
              <p className=" flex min-h-[360px] items-center justify-center space-x-1 text-sm font-semibold !text-white ant-upload-text">
                <Icon icon="tabler:plus" />
                <span> Chọn ảnh bìa</span>
              </p>
            </Dragger>
          )}

          <div className="grid grid-cols-5 gap-1">
            {newGallery.topics.map((e, i) => (
              <div
                key={i}
                className="inline-flex cursor-pointer rounded-lg bg-[#2f353f]"
              >
                <div className="h-full filter-tag-bg">
                  <div
                    key={i}
                    className="flex items-start justify-center space-x-1 font-semibold filter-tag"
                  >
                    <div
                      className="!h-4 !w-4"
                      onClick={() => {
                        removeTag(i);
                      }}
                    >
                      <Icon
                        className="text-[#EB5757] h-4 w-4"
                        icon="tabler:trash"
                      />
                    </div>

                    <Input
                      value={e}
                      className="p-0"
                      bordered={false}
                      onChange={(e) => {
                        const arr = [...newGallery.topics];
                        arr[i] = e.target.value;
                        setNewGallery({ ...newGallery, topics: arr });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center w-full">
            <Icon
              className="w-6 h-8 border-white text-primary-blue-medium border-b-[1px]"
              icon="ci:tag"
              style={{ transform: "scale(-1, 1)" }}
            />
            <Select
              showSearch
              className="w-full text-white"
              placeholder={
                <div className="flex items-start w-full pl-1 space-x-1 text-white">
                  <span>Gắn nhãn</span>
                </div>
              }
              optionFilterProp="children"
              onChange={() => {}}
              filterOption={(
                input: string,
                option?: { label: string; value: string }
              ) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              bordered={false}
              options={[]}
            />
          </div>

          <div className="overflow-auto ">{masonryGrid()}</div>
          <div className="flex justify-end">
            <Upload
              {...propsAlbumNewGallery}
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
                  Chọn ảnh
                </Button>
              </div>
            </Upload>
          </div>
          <div id="divider" className="flex items-center justify-center py-6">
            <div className="w-2/3 border-t border-dashed border-primary-blue-medium"></div>
          </div>
        </div>

        {/* <div className="px-3 mt-3 ">
        <div className="p-3 rounded-2xl w-full bg-[#1E2530]">
            <Feedback alias={info.feedback.alias} data={info.feedback.data} />
          </div> 
        </div>*/}
      </div>

      <div className="sticky ml-[auto] w-[max-content] bottom-[4.5rem] z-50 space-y-1">
        <div
          style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.60)" }}
          className="bg-[#1E2530] mr-5 cursor-pointer rounded-full flex justify-center items-center w-[50px] h-[50px] "
          onClick={() => {
            handleBack();
          }}
        >
          <Icon className="text-lg text-[#EB5757]" icon="tabler:arrow-left" />
        </div>
      </div>

      <div className="z-50 sticky bottom-0 w-[100vw] desktop:-translate-x-1/6 backdrop-blur">
        <Footer />
      </div>
    </div>
  );
}

export default Component;
