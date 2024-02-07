import { Icon } from "@iconify/react";
import { Upload, Input, UploadProps } from "antd";
import { getUserProfile, uploadGallery } from "api";
import NavigateMenu from "components/navigateMenu";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerAvatarPlaceholder from "assests/portfolio/customer_avatar_placeholder.jpg";
import IcCamera from "assests/icon/ic-camera-blue.svg";
import { USER_INFO } from "interface/user";

function Component({
  customerRef,
  customerInfo,
  setCustomerInfo,
  validator,
  setValidator,
}) {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [userInfo, setUserInfo] = useState<USER_INFO>({
    name: "",
    shortcut: "",
    package: {
      id: "",
    },
  });
  const profile_menu = [
    {
      key: "card",
      label: "Tạo thẻ",
      icon: "solar:card-outline",
      onClick() {
        navigate(`/${routeParams.customerShortcut}/addCard`);
      },
    },
    {
      key: "account",
      label: "Tài khoản",
      icon: "bx:user",
      onClick() {
        navigate(`/${routeParams.customerShortcut}/profile`);
      },
    },
    {
      key: "portfolio",
      label: "Hồ sơ",
      icon: "simple-icons:readdotcv",
      onClick() {
        navigate(`/${routeParams.customerShortcut}`);
        window.location.reload();
      },
    },
  ];

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

  useEffect(() => {
    handleGetUserProfile();
  }, []);
  return (
    <div ref={customerRef}>
      {/* NAVIGATE USER */}
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

        <Upload
          {...propsCover}
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
      </div>

      {/* AVATAR */}
      <div className="relative z-10 -translate-x-1/2  bg-[#18191A] sm:w-[300%] sm:overflow-x-clip">
        {/* CUSTOMER */}
        <div className="flex items-center space-x-2 translate-x-1/2">
          <div className="relative  mt-[-25px] rounded-full <3xs:h-14 <3xs:w-14 <3xs:!min-w-[3.5rem] 3xs:ml-3 3xs:h-20  3xs:w-20 3xs:min-w-[5rem]">
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
              className="absolute z-20 upload-hidden -bottom-1 -right-1"
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
              className={`${
                !validator
                  ? "!text-primary-blue-medium"
                  : "invalidate !text-[#EB5757]"
              } p-0 text-base font-semibold <3xs:truncate <3xs:text-sm `}
              onChange={(e) => {
                setValidator(null);
                setCustomerInfo({
                  ...customerInfo,
                  customerName: e.target.value,
                });
              }}
            />
            {validator ? (
              <div className="flex items-center my-2 space-x-1">
                <Icon className="text-[#EB5757]" icon="ph:warning-bold" />
                <span className="text-white">{validator}</span>
              </div>
            ) : (
              <></>
            )}

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
        <div className="translate-x-1/2 <3xs:-mt-2 <3xs:mr-3 ">
          <div className="h-6 w-10 border-r border-primary-blue-medium text-white <3xs:w-8  3xs:ml-3" />
          <div className="flex space-x-2">
            <div className="-mt-3 h-20 w-20 scale-75 rounded-full border-2 border-primary-blue-medium <3xs:h-16 <3xs:w-16 <3xs:min-w-[4rem] 3xs:ml-3">
              <div
                className="h-full rounded-full"
                style={{
                  backgroundImage: `url(${userInfo.avatar})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
            <span className="mt-4 text-base font-semibold text-white <3xs:text-sm">
              {userInfo.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
