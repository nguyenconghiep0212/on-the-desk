import React, { useEffect, useState } from "react";
import {
  currentTab,
  activatedMenu as activatedMenuAtom,
  isLogin,
} from "store/root.ts";
import { useRecoilState } from "recoil";
import { Popover, message } from "antd";
// ICON
import IconShoppingBag from "assests/icon/ic-shopping-bag.svg";
import IconAccount from "assests/icon/ic-account.svg";
import IconBurgerRight from "assests/icon/ic-burger-right.svg";
import IconAdd from "assests/icon/ic-add.svg";

// IMAGE
import Logo from "assests/landing/footer_banner.svg";
import Social_facebook from "assests/landing/social_logo_facebook.svg";
import Social_instagram from "assests/landing/social_logo_instagram.svg";
import Social_linkedin from "assests/landing/social_logo_linkedin.svg";
import Social_messenger from "assests/landing/social_logo_messenger.svg";
import Social_phone from "assests/landing/social_logo_phone.svg";
import Social_tiktok from "assests/landing/social_logo_tiktok.svg";
import Social_youtube from "assests/landing/social_logo_youtube.svg";
import Social_zalo from "assests/landing/social_logo_zalo.svg";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function DropdownMenu({ activatedMenu }) {
  return (
    <div className="dropdown">
      <span>Mouse over me</span>
      <div className="dropdown-content">
        <ul id="list">
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ul>
      </div>
    </div>
  );
}

function Cart({ activeMenuEvent, activatedMenu }) {
  return (
    <div>
      <img
        className={`${
          activatedMenu === "Cart" ? "menu-bg-activated" : ""
        } cursor-pointer`}
        src={IconShoppingBag}
        alt="IconShoppingBag"
        onClick={() => {
          activeMenuEvent("Cart");
        }}
      />
    </div>
  );
}
function Menu({ handleChange, activeMenuEvent, activatedMenu }) {
  const [_, setActivatedMenu] = useRecoilState(activatedMenuAtom);
  const socials = [
    Social_facebook,
    Social_messenger,
    Social_instagram,
    Social_linkedin,
    Social_youtube,
    Social_tiktok,
    Social_zalo,
    Social_phone,
  ];
  const menu_items = [
    {
      key: "product",
      label: "Sản phẩm",
      icon: "mingcute:home-5-line",
    },
    {
      key: "introduction",
      label: "Giới thiệu",
      icon: "ph:info-bold",
    },
    {
      key: "instruction",
      label: "Hướng dẫn",
      icon: "tabler:arrow-guide",
    },
    {
      key: "service",
      label: "Dịch vụ",
      icon: "gridicons:product",
    },
    {
      key: "news",
      label: "Tin tức",
      icon: "iconamoon:news-light",
    },
    {
      key: "contact",
      label: "Liên hệ",
      icon: "material-symbols:contact-support-outline-rounded",
    },
  ];

  const content = (
    <div className="relative z-1 ">
      {menu_items.map((item, index) => (
        <div
          key={index}
          className="relative z-10 p-[1px] cursor-pointer h-9 w-40 menu-btn-bg"
          onClick={() => {
            handleChange(item.key);
          }}
        >
          <div
            className="flex items-center w-full h-full px-3 space-x-1 text-white menu-btn"
            key={index}
          >
            <Icon className="text-base" icon={item.icon} />
            <div className="font-sans font-thin tracking-wide">
              {item.label}
            </div>
          </div>
        </div>
      ))}
      <div className="my-[6px] border-t-[1px] border-solid border-white border-opacity-50"></div>
      <div className="grid grid-cols-4 gap-2 px-4 py-2">
        {socials.map((item, index) => (
          <div key={index}>
            <img src={item} alt="social" />
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <Popover
      align={{
        offset: [10, 10],
      }}
      placement="bottomRight"
      content={content}
      trigger="click"
      onOpenChange={(e) => {
        if (!e) {
          setActivatedMenu("");
        }
      }}
    >
      <div
        className={`${
          activatedMenu === "Menu" ? "menu-bg-activated " : ""
        }  cursor-pointer`}
      >
        <img
          className={`${
            activatedMenu === "Menu" ? "-rotate-45 scale-110 " : "rotate-0"
          } transition-all duration-300 `}
          src={activatedMenu === "Menu" ? IconAdd : IconBurgerRight}
          alt="IconBurgerRight"
          onClick={() => {
            activeMenuEvent("Menu");
          }}
        />
      </div>
    </Popover>
  );
}

function Profile({
  handleProfileEvent,
  activeMenuEvent,
  isLogin,
  setIsLogin,
  activatedMenu,
  messageApi,
}) {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["auth-token", "auth-id"]);
  const [, setActivatedMenu] = useRecoilState(activatedMenuAtom);
  const profile_menu = [
    {
      key: "card",
      label: "Tạo thẻ",
      icon: "solar:card-outline",
    },
    {
      key: "account",
      label: "Tài khoản",
      icon: "line-md:account",
    },
    {
      key: "portfolio",
      label: "Hồ sơ",
      icon: "simple-icons:readdotcv",
    },
  ];
  function handleSignIn() {
    setActivatedMenu("");
    navigate("/login");
  }
  function handleSignOut() {
    removeCookie("auth-token");
    removeCookie("auth-id");
    setIsLogin(false);
    navigate("/login");
  }

  useEffect(() => {
    console.log("mounted");
  }, []);
  const signin = (
    <div
      className="relative z-10 p-[1px] cursor-pointer h-9 w-40 menu-btn-bg"
      onClick={() => {
        handleSignIn();
      }}
    >
      <div className="flex items-center w-full h-full px-3 space-x-1 text-white menu-btn">
        <Icon className="text-base" icon="mdi:login" />
        <div className="font-sans font-thin tracking-wide">Đăng nhập</div>
      </div>
    </div>
  );
  const content = (
    <div className="relative z-1 ">
      {profile_menu.map((item, index) => (
        <div
          key={index}
          className="relative z-10 p-[1px] cursor-pointer h-9 w-40 menu-btn-bg"
          onClick={() => {
            handleProfileEvent(item.key);
          }}
        >
          <div
            className="flex items-center w-full h-full px-3 space-x-1 text-white menu-btn"
            key={index}
          >
            <Icon className="text-base" icon={item.icon} />
            <div className="font-sans font-thin tracking-wide">
              {item.label}
            </div>
          </div>
        </div>
      ))}
      <div className="my-[6px] border-t-[1px] border-solid border-white border-opacity-50"></div>
      <div
        className="relative z-10 p-[1px] cursor-pointer h-9 w-40 menu-btn-bg"
        onClick={() => {
          handleProfileEvent("logout");
        }}
      >
        <div
          className="flex items-center w-full h-full px-3 space-x-1 text-white menu-btn"
          onClick={() => {
            handleSignOut();
          }}
        >
          <Icon className="text-base" icon="mdi:logout" />
          <div className="font-sans font-thin tracking-wide">Đăng xuất</div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Popover
        align={{
          offset: [7, 10],
        }}
        placement="bottomRight"
        content={isLogin ? content : signin}
        trigger="click"
        onOpenChange={(e) => {
          if (!e) {
            setActivatedMenu("");
          }
        }}
      >
        <img
          className={`${
            activatedMenu === "Profile" ? "menu-bg-activated" : ""
          } cursor-pointer`}
          src={IconAccount}
          alt="IconAccount"
          onClick={() => {
            activeMenuEvent("Profile");
          }}
        />
      </Popover>
    </div>
  );
}

function Header() {
  const [messageApi, contextHolder] = message.useMessage();
  const [checkIsLogin, setLogin] = useRecoilState(isLogin);
  const [activatedMenu, setActivatedMenu] = useRecoilState(activatedMenuAtom);
  const [, setValue] = useRecoilState(currentTab);
  function activeMenuEvent(menu: string) {
    if (activatedMenu === menu) {
      setActivatedMenu("");
    } else {
      setActivatedMenu(menu);
    }
  }
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleProfileEvent = (value: string) => {
    console.log(value);
  };

  useEffect(() => {
    console.log("checkIsLogin", checkIsLogin);
  }, [activatedMenu, checkIsLogin]);
  return (
    <div className="relative flex items-center justify-between">
      {contextHolder}
      <div className="flex items-center ">
        <img
          src={Logo}
          alt="logo"
          className="3xl:w-[280px] <2xs:w-[164px] <xs:w-[210px]"
        />
      </div>
      <div className=" flex space-x-3 text-white xs:space-x-4 md:!space-x-9 ">
        <Cart activeMenuEvent={activeMenuEvent} activatedMenu={activatedMenu} />
        <Profile
          handleProfileEvent={handleProfileEvent}
          activeMenuEvent={activeMenuEvent}
          isLogin={checkIsLogin}
          setIsLogin={setLogin}
          activatedMenu={activatedMenu}
          messageApi={messageApi}
        />
        <Menu
          handleChange={handleChange}
          activeMenuEvent={activeMenuEvent}
          activatedMenu={activatedMenu}
        />

        {/* <DropdownMenu activatedMenu={activatedMenu} /> */}
      </div>
    </div>
  );
}

export default Header;
