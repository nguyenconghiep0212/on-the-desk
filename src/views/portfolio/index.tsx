import React, { useEffect, useState } from "react";
import Header from "./components/header/header.tsx";
import DynamicComponent from "./components/dynamicComponent";
import Footer from "views/footer/index.tsx";

// API
import { getUserProfile, getComponentFromPackage } from "api/index.ts";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { USER_INFO, USER_PACKAGE } from "interface/user.ts";

function Portfolio() {
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
            temp.config.data = userInfo.contacts.map((e) => {
              return {
                url: e.contactValue,
                platform: e.platformKey,
                name: userInfo.name,
              };
            });
          }
        }
      } catch (e) {
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
  useEffect(() => {}, [userInfo]);
  return (
    <div className="relative flex flex-col items-center w-full h-full ">
      {contextHolder}
      <div
        id="focus_point"
        className="flex flex-col h-full mobile:w-full sm:p-0 desktop:w-1/2"
      >
        <div className="flex-auto">
          <Header
            avatar={userInfo.avatar}
            background={userInfo.backgrounds}
            name={userInfo.name}
            description={userInfo.description}
          />
          <div className="flex flex-col justify-center m-2 space-y-4 desktop:mx-0 ">
            {userPackage.map((e, index) => (
              <div key={index} className="p-3 rounded-2xl w-full bg-[#1E2530]">
                <DynamicComponent
                  is={e.key}
                  alias={e.config.alias}
                  data={e.config.data}
                  userInfo={userInfo}
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className="sticky bottom-0 w-[100vw] desktop:-translate-x-1/4"
          style={{
            background:
              "linear-gradient(180deg, rgba(24, 25, 26, 0.25) 0%, rgba(0, 0, 0, 0.50) 100%)",
            backdropFilter: "blur(9px)",
          }}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
