import React, { useEffect, useState } from "react";
import { currentTab } from "store/root.ts";
import { useRecoilState } from "recoil";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Logo from "assests/logo.svg";
import { Icon } from "@iconify/react";

function Header() {
  const [value, setValue] = useRecoilState(currentTab);
  const items: TabsProps["items"] = [
    {
      key: "product",
      label: "Sản phẩm",
    },
    {
      key: "solution",
      label: "Giải pháp",
    },
    {
      key: "feature",
      label: "Tính năng",
    },
    {
      key: "service",
      label: "Dịch vụ",
    },
    {
      key: "feedback",
      label: "Phản hồi",
    },
    {
      key: "signup",
      label: "Đăng ký",
    },
    {
      key: "instruction",
      label: "Hướng dẫn",
    },
  ];

  const handleChange = (newValue: string) => {
    setValue(newValue);
    console.log(value);
  };
  return (
    <div className="flex items-center justify-between mx-16 my-2 ">
      <div className="flex items-center space-x-6">
        <img src={Logo} alt="logo" className="w-8 h-8"/>
        <Tabs
          defaultActiveKey="1"
          className="mainNav"
          items={items}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center mr-8 space-x-6 text-white ">
        <Icon icon="mdi:cart-outline"/>
        <span className="font-sans text-sm font-thin">Đăng nhập</span>
      </div>
    </div>
  );
}

export default Header;
