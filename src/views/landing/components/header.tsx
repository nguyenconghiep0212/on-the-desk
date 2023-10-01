import React, { useEffect, useState } from "react";
import { currentTab } from "store/root.ts";
import { useRecoilState } from "recoil";
import { Popover, Tabs } from "antd";
import Logo from "assests/landing/footer_banner.svg";
import { Icon } from "@iconify/react";

function Menu({ handleChange }) {
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
          className="relative z-10 px-3 py-2 cursor-pointer hover:p-0 menu-btn-bg"
          onClick={() => {
            handleChange(item.key);
          }}
        >
          <div
            className="flex items-center w-full h-full space-x-1 text-white menu-btn"
            key={index}
          >
            <Icon icon={item.icon} />
            <div className="font-sans font-thin tracking-wide">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <Popover placement="bottomRight" content={content} trigger="click">
      <Icon className="cursor-pointer" icon="gg:menu-right" />
    </Popover>
  );
}

function Header() {
  const [value, setValue] = useRecoilState(currentTab);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    console.log(value);
  };
  return (
    <div className="flex items-center justify-between py-6 ">
      <div className="flex items-center ">
        <img src={Logo} alt="logo" />
      </div>
      <div className="flex items-center mr-8 space-x-6 text-white ">
        <Icon
          className="cursor-pointer"
          icon="streamline:shopping-bag-hand-bag-1-shopping-bag-purse-goods-item-products"
        />
        <Icon className="cursor-pointer" icon="line-md:account" />
        <Menu handleChange={handleChange} />
      </div>
    </div>
  );
}

export default Header;
