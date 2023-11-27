import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

// INTERFACE
import { USER_INFO, USER_PACKAGE } from "interface/user.ts";

// API
import {
  getUserProfile,
  updateUserProfile,
  getComponentFromPackage,
} from "api/index.ts";

// COMPONENT
import Header from "./components/header/header.tsx";
import DynamicComponent from "./components/dynamicComponent";
import Card from "./components/card/index.tsx";
import Footer from "views/footer/index.tsx";
import { Icon } from "@iconify/react";
import NavigateMenu from "../navigateMenu/index";
import { useRecoilState } from "recoil";
import { isLogin,   } from "store/root.ts";
import { useCookies } from "react-cookie";

function Portfolio() {
  const [cookies] = useCookies([ "current-user"]);
     const profile_menu = [
    {
      key: "card",
      label: "Tạo thẻ",
      icon: "solar:card-outline",
      onClick() {
        navigate(`/${cookies['current-user'].shortcut}/addCard`);
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
        navigate(`/${cookies['current-user'].shortcut}`);
        window.location.reload();

      },
    },
  ];
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
        id: "",
        typeContact: "",
        nameContact: "",
        keyContact: "",
        infoDetail: "",
        templateId: "",
        linkIcon: "",
        backgoundColor: "",
        status: 1,
      },
    ],
    backgrounds: [],
    package: {
      id: "",
      packageName: "",
    },
  });
  let [originalUserInfo, setOriginalUserInfo] = useState({});
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
          originalUserInfo = res.data;
          setUserInfo(userInfo);
          setOriginalUserInfo(originalUserInfo);
          if(userInfo.package){
            await handleGetComponentFromPackage();
          }else{
            navigate('/addCard')
          }
          
          const temp = userPackage.find((e) => e.key === "contact");
          if (temp) {
            if (userInfo.contacts) {
              temp.config.data = userInfo.contacts;
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

  function handleCancelChange() {
    setIsEdit(false);
    setUserInfo(originalUserInfo);
  }

  async function handleAcceptChange() {
    // Call update user info
    try {
      const res = await updateUserProfile(userInfo);
      if (res) {
        message.success("Cập nhật tài khoản thành công");
        setIsEdit(false);
      }
    } catch (error) {
      message.error("Cập nhật thất bại, vui lòng thử lại sau");
      console.error("Lỗi cập nhật profile:", error);
    }
  }
  useEffect(() => {
    handleGetUserProfile();
  }, []);
  useEffect(() => {
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
              <NavigateMenu profile_menu={profile_menu} />
            </div> 
          {/*  */}

          {userInfo.isOwner && <Card userInfo={userInfo} />}

          <Header
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            isEdit={isEdit}
          />
          <div className="flex flex-col justify-center m-2 space-y-4 desktop:mx-0 ">
            {userPackage.map((e, index) => (
              <div key={index} className="p-3 rounded-2xl w-full bg-[#1E2530]">
                <DynamicComponent
                  is={e.key}
                  alias={e.config.alias}
                  data={e.config.data}
                  userInfo={userInfo}
                  isEdit={isEdit}
                  setUserInfo={setUserInfo}
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
    </div>
  );
}

export default Portfolio;
