import React, { useEffect, useState } from "react";
import { currentTab } from "store/root.ts";
import { useRecoilState } from "recoil";
import { Affix, Popover, Tabs } from "antd";
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

function Menu({ handleChange }) {
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
          className="relative z-10 p-[2px] cursor-pointer h-9 w-40 menu-btn-bg"
          onClick={() => {
            handleChange(item.key);
          }}
        >
          <div
            className="flex px-3  items-center w-full h-full space-x-1 text-white menu-btn"
            key={index}
          >
            <Icon className="text-lg" icon={item.icon} />
            <div className="font-sans font-thin tracking-wide">
              {item.label}
            </div>
          </div>
        </div>
      ))}
      <div className="mb-4 border-t-[1px] border-solid border-white border-opacity-50"></div>
      <div className="grid grid-cols-4 gap-2">
        {socials.map((item, index) => (
          <div key={index}>
            <img src={item} alt="social" />
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <Popover placement="bottomRight" content={content} trigger="click">
      <Icon className="cursor-pointer 3xl:text-2xl " icon="gg:menu-right" />
    </Popover>
  );
}

function Profile({ handleProfileEvent }) {
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
  const content = (
    <div className="relative z-1 ">
      {profile_menu.map((item, index) => (
        <div
          key={index}
          className="relative z-10 px-3 py-2 cursor-pointer hover:p-0 menu-btn-bg"
          onClick={() => {
            handleProfileEvent(item.key);
          }}
        >
          <div
            className="flex items-center w-full h-full space-x-1 text-white menu-btn"
            key={index}
          >
            <Icon className="text-lg" icon={item.icon} />
            <div className="font-sans font-thin tracking-wide">
              {item.label}
            </div>
          </div>
        </div>
      ))}
      <div className="my-2 border-t-[1px] border-solid border-white border-opacity-50"></div>
      <div
        className="relative z-10 px-3 py-2 cursor-pointer hover:p-0 menu-btn-bg"
        onClick={() => {
          handleProfileEvent("logout");
        }}
      >
        <div className="flex items-center w-full h-full space-x-1 text-white menu-btn">
          <Icon className="text-xl" icon="mdi:logout" />
          <div className="font-sans font-thin tracking-wide">Đăng xuất</div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Popover placement="bottomRight" content={content} trigger="click">
        <Icon className="cursor-pointer 3xl:text-2xl" icon="line-md:account" />
      </Popover>
    </div>
  );
}

function Header() {
  const [value, setValue] = useRecoilState(currentTab);

  const handleChange = (newValue: string) => {
    setValue(newValue); 
  };

  const handleProfileEvent = (value: string) => {
    console.log(value);
  };
  return (
    
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          <img src={Logo} alt="logo" className="3xl:w-[280px]" />
        </div>
        <div className="flex items-center mr-8 space-x-6 text-white ">
          <Icon
            className="cursor-pointer 3xl:text-2xl"
            icon="akar-icons:shopping-bag"
          />
          <Profile handleProfileEvent={handleProfileEvent} />
          <Menu handleChange={handleChange} />
        </div>
      </div>
    
  );
}

export default Header;
