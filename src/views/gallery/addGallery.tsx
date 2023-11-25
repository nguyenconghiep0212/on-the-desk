import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";
import { normalizeVietnamese } from "helper/formatString";
// COMPONENT
import { Icon } from "@iconify/react";
import { Button, Input, Select, Upload, UploadProps } from "antd";
import NavigateMenu from "../navigateMenu/index";
// import Feedback from "../portfolio/components/feedback/index";
import CustomerAvatarPlaceholder from "assests/portfolio/customer_avatar_placeholder.jpg";
import Footer from "views/footer";
import IcCamera from "assests/icon/ic-camera-blue.svg";

// INTERFACE
import { GALLERY_CUSTOMER, UPDATE_GALLERY } from "interface/gallery";
import { CUSTOMER } from "interface/customer";
import { USER_INFO } from "interface/user";

// COMPONENT
import ConfirmDialog from "views/component/confirmDialog";

// API
import {
  getUserProfile,
  getGalleryByCustomerId,
  getCustomerById,
  uploadGallery,
  createGallery,
  createCustomer,
  getTopic,
} from "api";
import { useCookies } from "react-cookie";

function Component() {
  const { Dragger } = Upload;
  const routeParams = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["current-user"]);
  // confirm dialog
  const [deleteGalleryIndex, setDeleteGalleryIndex] = useState(null);
  const confirmDialogOkFnc = {
    DELETE_FORM: () => {
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
      setConfirmDialogVisible(false);
    },
    DELETE_GALLERY: () => {
      setGalleries([...galleries.filter((_, j) => deleteGalleryIndex !== j)]);
      setConfirmDialogVisible(false);
    },
    CONFIRM_CREATE_GALLERY: () => handleCreateGallery(),
  };
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [confirmDialogMode, setConfirmDialogMode] = useState("success");
  const [confirmDialogOkHandler, setConfirmDialogOkHandler] = useState("");
  const [confirmDialogOkText, setConfirmDialogOkText] = useState("");
  const [confirmDialogMessage, setConfirmDialogMessage] = useState("");
  //
  const [topicList, setTopicList] = useState([]);
  const [topicSearch, setTopicSearch] = useState("");
  const [galleries, setGalleries] = useState<GALLERY_CUSTOMER[]>([]);
  const [userInfo, setUserInfo] = useState<USER_INFO>({
    name: "",
    shortcut: "",
    package: {
      id: "",
    },
  });
  const [validator, setValidator] = useState(true);
  const [customerInfo, setCustomerInfo] = useState<CUSTOMER>({
    customerAvatar: "",
    customerCover: "",
    customerName: "",
    customerDescription: "",
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
    multiple: false,
    action: async (file) => await uploadFileNewGallery(file, "thumb"),
  };
  const propsAlbumNewGallery: UploadProps = {
    name: "file",
    multiple: true,
    action: async (file) => await uploadFileNewGallery(file, "album"),
  };
  const propsThumbGalley: UploadProps = {
    name: "file",
    multiple: false,
  };
  const propsAlbumGallery: UploadProps = {
    name: "file",
    multiple: true,
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
  async function uploadFileNewGallery(file, mode) {
    const fd = new FormData();
    fd.append("files", file);
    const res = await uploadGallery(fd);
    if (res) {
      if (mode === "thumb") {
        setNewGallery({ ...newGallery, thumb: res.data[0] });
      } else {
        const arr: any = newGallery.data;
        arr.push({ name: file.name, caption: file.name, ref: res.data[0] });
        setNewGallery({
          ...newGallery,
          data: arr,
        });
      }
    }
  }
  async function uploadFileGallery(file, e, i, mode) {
    const fd = new FormData();
    fd.append("files", file);
    const res = await uploadGallery(fd);
    if (res) {
      const items = galleries;
      const item = e;
      if (mode === "thumb") {
        item.thumb = res.data[0];
        items[i] = item;
        setGalleries([...items]);
      } else {
        item.data.push({
          name: file.name,
          caption: file.name,
          ref: res.data[0],
        });
        items[i] = item;
        setGalleries([...items]);
      }
    }
  }
  async function uploadFile(file, mode) {
    const fd = new FormData();
    fd.append("files", file);
    const res = await uploadGallery(fd);
    if (res) {
      if (mode === "avatar") {
        setCustomerInfo({ ...customerInfo, customerAvatar: res.data[0] });
      } else {
        setCustomerInfo({ ...customerInfo, customerCover: res.data[0] });
      }
    }
  }

  function handleBack() {
    return navigate(-1);
  }

  function handleAddGallery() {
    setGalleries([...galleries, newGallery]);
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
  }
  async function handleCreateGallery() {
    if (customerInfo.customerName) {
      customerInfo.shortcut = normalizeVietnamese(customerInfo.customerName)
        .replaceAll(" ", "-")
        .toLowerCase();
      const res = await createCustomer(customerInfo);
      if (res) {
        const promises: any = [];
        galleries.forEach(async (e) => {
          const params = {
            ...e,
            customerName: res.data.customerName,
            customerId: res.data.id,
          };
          promises.push(await createGallery(params));
        });
        Promise.allSettled(promises).then(() => {
          navigate(`/${cookies["current-user"].shortcut}/${res.data.shortcut}`);
        });
      }
    } else {
      setValidator(false);
      setConfirmDialogVisible(false);
    }
  }
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

  async function getListTopic() {
    const res = await getTopic(cookies["current-user"].shortcut);
    if (res) {
      setTopicList(res.data.map((e) => ({ value: e, label: e })));
    }
  }

  useEffect(() => {
    handleGetGalleryByCustomerId();
    handleGetUserProfile();
    handleGetCustomerById();
    getListTopic();
  }, []);
  useEffect(() => { 
  }, [
    newGallery,
    galleries,
    confirmDialogMode,
    topicSearch,
    deleteGalleryIndex,
    confirmDialogOkHandler,
    validator,
  ]);
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
                customerInfo.customerCover
                  ? process.env.REACT_APP_BASE_IMG + customerInfo.customerCover
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
                customerInfo.customerCover
                  ? process.env.REACT_APP_BASE_IMG + customerInfo.customerCover
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
                className={`${validator || "invalidate"} p-0 text-base <3xs:text-sm font-semibold <3xs:truncate !text-primary-blue-medium`}
                onChange={(e) => {
                  setValidator(true);
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
                placeholder="Mô tả thư viện"
                onChange={(e) => {
                  setCustomerInfo({
                    ...customerInfo,
                    customerDescription: e.target.value,
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
  function displayCreateForm() {
    return (
      <div className="mt-6 space-y-4">
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
              onClick={() => {
                setConfirmDialogVisible(true);
                setConfirmDialogMode("error");
                setConfirmDialogOkHandler("DELETE_FORM");
                setConfirmDialogOkText("Xác nhận");
                setConfirmDialogMessage("Album sẽ được xoá vĩnh viễn");
              }}
            />
          )}
        </div>

        {newGallery.thumb ? (
          <div className="relative">
            <Upload
              {...propsThumbNewGalley}
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
          <Dragger {...propsThumbNewGalley} className="">
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
              <div>
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
                <div className="flex items-center justify-center space-x-1">
                  <Icon className="w-4 h-4" icon="tabler:plus" />
                  <span>Thêm ảnh</span>
                </div>
              </Button>
            </div>
          </Upload>
          {newGallery.data.length ? (
            <Button
              className="lg:w-max w-full !shadow-none gradient_btn"
              onClick={() => {
                handleAddGallery();
                setConfirmDialogVisible(true);
                setConfirmDialogMode("success");
                setConfirmDialogOkHandler("CONFIRM_CREATE_GALLERY");
                setConfirmDialogOkText("Xem album");
                setConfirmDialogMessage("Tạo album thành công!");
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
  function displayGallery() {
    return (
      <div>
        <div id="divider" className="flex items-center justify-center py-6">
          <div className="w-full border-t border-dashed border-primary-blue-medium"></div>
        </div>
        {galleries.map((e, i) => (
          <div key={i} className="mt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Tên album mới"
                bordered={false}
                value={e.name}
                className="p-0 mb-4 text-sm font-bold"
                onChange={(f) => {
                  const items = galleries;
                  const item = e;
                  item.name = f.target.value;
                  items[i] = item;
                  setGalleries([...items]);
                }}
              />

              <Icon
                className="text-[#EB5757] h-5 w-5 cursor-pointer"
                icon="tabler:trash"
                onClick={() => {
                  setDeleteGalleryIndex(i);
                  setConfirmDialogVisible(true);
                  setConfirmDialogMode("error");
                  setConfirmDialogOkHandler("DELETE_GALLERY");
                  setConfirmDialogOkText("Xác nhận");
                  setConfirmDialogMessage("Album sẽ được xoá vĩnh viễn");
                }}
              />
            </div>
            <div className="relative">
              <Upload
                {...{
                  ...propsThumbGalley,
                  action: async (file) =>
                    await uploadFileGallery(file, e, i, "thumb"),
                }}
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
                  backgroundImage: `url('${process.env.REACT_APP_BASE_IMG}${e.thumb}')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
            </div>
            <div>
              {e.topics.map((f, j) => (
                <div
                  key={j}
                  className="mr-2 mb-2 inline-flex cursor-pointer rounded-lg bg-[#2f353f]"
                >
                  <div className="h-full filter-tag-bg">
                    <div className="flex items-start justify-center space-x-1 font-semibold filter-tag">
                      <span className="font-semibold text-primary-blue-medium">
                        {f}
                      </span>
                      <div
                        className="!h-4 !w-4"
                        onClick={() => {
                          const items = galleries;
                          const item = e;
                          item.topics = item.topics.filter(
                            (_, index) => j !== index
                          );
                          items[i] = item;
                          setGalleries([...items]);
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
                optionFilterProp="children"
                onChange={() => {}}
                filterOption={(
                  input: string,
                  option?: { label: string; value: string }
                ) =>
                  (option?.label || "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                bordered={false}
                dropdownRender={(menu) => (
                  <div>
                    <Button
                      className="  !shadow-none w-full flex justify-start"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.31) 0%, rgba(255, 255, 255, 0.08) 100%)",
                      }}
                      onClick={() => {
                        const items = galleries;
                        const item = e;
                        item.topics.push(topicSearch);
                        items[i] = item;
                        setGalleries([...items]);
                      }}
                    >
                      Thêm nhãn {topicSearch}
                    </Button>
                    {menu}
                  </div>
                )}
                options={[]}
                onSearch={setTopicSearch}
              />
            </div>
            <div className="grid gap-1 <xs:grid-cols-2 <md:grid-cols-3 grid-cols-5 ">
              {e.data.map((f, j) => (
                <div key={j} className="relative my-2 aspect-square">
                  <div className="absolute top-1 right-1 bg-[#0000004d] p-1 rounded-full ">
                    <Icon
                      className="text-[#EB5757] h-6 w-6 cursor-pointer"
                      icon="tabler:trash"
                      onClick={() => {
                        const items = galleries;
                        const item = e;
                        item.data = item.data.filter((_, i) => i !== j);
                        items[i] = item;
                        setGalleries([...items]);
                      }}
                    />
                  </div>
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url('${process.env.REACT_APP_BASE_IMG}${f.ref}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className=" lg:space-y-0 lg:flex lg:justify-end lg:space-x-2">
              <Upload
                {...{
                  ...propsAlbumGallery,
                  action: async (file) =>
                    await uploadFileGallery(file, e, i, "album"),
                }}
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
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-full h-[max-content] ">
      <div className="relative w-full lg:!w-3/4 <3xs:!w-3/4 h-full pb-3 px-3">
        {header()}
        {displayCreateForm()}
        {displayGallery()}
        {galleries.length ? (
          <div>
            <Button
              className="w-full !shadow-none gradient_btn mt-5"
              onClick={() => {
                handleCreateGallery();
              }}
            >
              Hoàn thành
            </Button>
            <div id="divider" className="flex items-center justify-center py-6">
              <div className="w-full border-t border-dashed border-primary-blue-medium"></div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <ConfirmDialog
          title={undefined}
          visible={confirmDialogVisible}
          type={confirmDialogMode}
          message={confirmDialogMessage}
          cancelText="Trở lại"
          okText={confirmDialogOkText}
          handleOk={() => {
            const func = confirmDialogOkFnc[confirmDialogOkHandler];
            func();
          }}
          handleCancel={() => setConfirmDialogVisible(false)}
        />
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
