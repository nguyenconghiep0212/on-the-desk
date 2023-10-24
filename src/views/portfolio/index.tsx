import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import IconAccount from "assests/icon/ic-account.svg";

// INTERFACE
import { USER_INFO, USER_PACKAGE } from "interface/user.ts";

// API
import { getUserProfile, getComponentFromPackage } from "api/index.ts";

// COMPONENT
import Header from "./components/header/header.tsx";
import DynamicComponent from "./components/dynamicComponent";
import Card from "./components/card/index.tsx";
import Footer from "views/footer/index.tsx";
import { Icon } from "@iconify/react";

function Portfolio() {
  const [isEdit, setIsEdit] = useState(false);
  let [userInfo, setUserInfo] = useState<USER_INFO>({
    id: "",
    name: "",
    email: "",
    description: "",
    shortcut: "",
    job: "",
    avatar: "",
    contacts: [
      {
        platformKey: "",
        platformName: "",
        contactValue: "",
      },
    ],
    backgrounds: [],
    package: {
      id: "",
      packageName: "",
    },
  });
  let [userPackage, setUserPackage] = useState<USER_PACKAGE[]>([]);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  let routeParams = useParams();
  async function handleGetUserProfile() {
    if (routeParams.userId) {
      try {
        const res = await getUserProfile(routeParams.userId);
        if (res) {
          userInfo = res.data;
          setUserInfo(userInfo);
          await handleGetComponentFromPackage();
          const temp = userPackage.find((e) => e.key === "contact");
          if (temp) {
            if (userInfo.contacts) {
              temp.config.data = userInfo.contacts.map((e) => {
                return {
                  url: e.contactValue,
                  platform: e.platformKey,
                  name: userInfo.name,
                };
              });
            } else {
              temp.config.data = [];
            }
          }
        }
      } catch (e) {
        console.error("error profile: ", e);
        messageApi.open({
          type: "error",
          content: "Người dùng không tồn tại, quay trở lại trang chủ...",
        });
        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
    } else {
      messageApi.open({
        type: "error",
        content: "Người dùng không tồn tại, quay trở lại trang chủ...",
      });
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  }

  async function handleGetComponentFromPackage() {
    const res = await getComponentFromPackage(userInfo.package.id);
    if (res) {
      res.data.forEach((e) => {
        try {
          e.config = JSON.parse(e.config);
        } catch (error) {
          e.config = { alias: e.key, data: [] };
        }
      });
      userPackage = res.data;
      setUserPackage(userPackage);
    }
  }

  useEffect(() => {
    handleGetUserProfile();
  }, []);
  useEffect(() => {
    console.log("userInfo:", userInfo);
  }, [userInfo, isEdit]);
  return (
    <div className="relative flex flex-col items-center w-full h-[max-content] ">
      {contextHolder}

      <div
        id="focus_point"
        className="flex flex-col h-full mobile:w-full sm:p-0 desktop:w-1/2"
      >
        <div className="relative flex-auto">
          {/* NAVIGATE USER */}
          <div
            className="absolute top-[33px] z-10  text-lg right-5 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.31) 0%, rgba(255, 255, 255, 0.08) 100%)",
            }}
          >
            <img
              className="cursor-pointer w-[24px] h-[24px]"
              src={IconAccount}
              alt="IconAccount"
            />
          </div>

          {/*  */}
          <Card userInfo={userInfo} />
          <Header userInfo={userInfo} isEdit={isEdit} />
          <div className="flex flex-col justify-center m-2 space-y-4 desktop:mx-0 ">
            {userPackage.map((e, index) => (
              <div key={index} className="p-3 rounded-2xl w-full bg-[#1E2530]">
                <DynamicComponent
                  is={e.key}
                  alias={e.config.alias}
                  data={e.config.data}
                  userInfo={userInfo}
                  isEdit={isEdit}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {userInfo.isOwner &&
        (isEdit ? (
          <div className="sticky ml-[auto] w-[max-content] bottom-[4.5rem] z-50 space-y-1">
            <div
              style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.60)" }}
              className="bg-[#1E2530] mr-5 cursor-pointer rounded-full flex justify-center items-center w-[50px] h-[50px] "
              onClick={() => {
                setIsEdit(false);
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
    </div>
  );
}

export default Portfolio;
