import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

// API
import {
  getUserProfile,
  updateUserProfile,
  getComponentFromPackage,
} from "../../api/index.ts";

// COMPONENT
import Header from "./components/header/header.tsx";
import Card from "./components/card/index.tsx";
import Footer from "../../components/footer/index.tsx";
import { Icon } from "@iconify/react";
import NavigateMenu from "../../components/navigateMenu/index.tsx";
import { useCookies } from "react-cookie";
import DynamicComponent from "./dynamicComponents.tsx";
import { useRecoilState } from "recoil";
import {
  contactsData,
  packageInfoPortfolio,
  portfolioEdit,
  userInfoOriginalPortfolio,
  userInfoPortfolio,
} from "../../store/portfolio.ts";

function Component() {
  const [cookies] = useCookies(["current-user-shortcut"]);
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
  const [dndItems] = useRecoilState(contactsData);
  const [isEdit, setIsEdit] = useRecoilState(portfolioEdit);
  const [userInfo, setUserInfo] = useRecoilState(userInfoPortfolio);
  const [originalUserInfo, setOriginalUserInfo] = useRecoilState(
    userInfoOriginalPortfolio,
  );
  const [userPackage, setUserPackage] = useRecoilState(packageInfoPortfolio);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const routeParams = useParams();
  async function handleGetUserProfile() {
    if (routeParams.userShortcut) {
      try {
        const res = await getUserProfile(routeParams.userShortcut);
        if (res) {
          setUserInfo(res.data);
          setOriginalUserInfo(res.data);
          if (userInfo.package) {
            await handleGetComponentFromPackage(res.data);
          } else {
            navigate("/addCard");
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

  async function handleGetComponentFromPackage(userRes) {
    const res = await getComponentFromPackage(userRes.package.id);
    if (res) {
      res.data.forEach((e) => {
        try {
          e.config = JSON.parse(e.config);
        } catch (error) {
          e.config = { alias: e.key, data: [] };
        }
      });
      const temp = res.data.find((e) => e.key === "contact");
      if (temp) {
        if (userRes.contacts) {
          res.data.find((e) => e.key === "contact").config.data =
            userRes.contacts;
        } else {
          res.data.find((e) => e.key === "contact").config.data = [];
        }
      }
      setUserPackage(res.data);
    }
  }

  function handleCancelChange() {
    setIsEdit(false);
    setUserInfo(originalUserInfo);
  }

  async function handleAcceptChange() {
    // Call update user info
    try {
      let contacts = [];
      dndItems.forEach((e) => {
        if (e.children.length > 1) {
          contacts = contacts.concat([...e.children]);
        } else {
          contacts.push({ ...e });
        }
      });
      contacts.forEach((e) => delete e.children);
      const params = { ...userInfo };
      params.contacts = contacts;
      const res = await updateUserProfile(params);
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
  useEffect(() => {}, [contactsData]);
  useEffect(() => {}, [userInfo, isEdit, originalUserInfo, userPackage]);

  return (
    <div className="relative flex h-[max-content] w-full flex-col items-center ">
      {contextHolder}

      <div
        id="focus_point"
        className="flex flex-col h-full sm:p-0 mobile:w-full desktop:w-1/2"
      >
        <div className="relative flex-auto">
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
          {/*  */}

          {userInfo.isOwner && <Card userInfo={userInfo} />}

          <Header />
          <div className="flex flex-col justify-center m-2 space-y-4 desktop:mx-0 ">
            {userPackage.map((e, index) => (
              <div key={index}>
                {e.key ? (
                  <div className="w-full rounded-2xl bg-[#1E2530] p-3">
                    <DynamicComponent
                      is={e.key}
                      alias={e.config.alias}
                      data={e.config.data}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {userInfo.isOwner &&
        (isEdit ? (
          <div className="sticky bottom-[4.5rem] z-50 ml-[auto] w-[max-content] space-y-1">
            <div
              style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.60)" }}
              className="mr-5 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#1E2530] "
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
              className="mr-5 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#1E2530] "
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
            className="sticky bottom-[4.5rem] z-50 ml-[auto] w-[max-content]"
            onClick={() => {
              setIsEdit(true);
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
        ))}

      <div className="desktop:-translate-x-1/6 sticky bottom-0 z-50 w-[100vw] backdrop-blur">
        <Footer />
      </div>
    </div>
  );
}

export default Component;
