import React, { useEffect, useState } from "react";
import { currentTab } from "store/root.ts";
import { useRecoilState } from "recoil";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Logo from "assests/footer_banner.svg";
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
    <div className="flex items-center justify-between py-6 ">
      <div className="flex items-center ">
        <img src={Logo} alt="logo"  /> 
      </div>
      <div className="flex items-center mr-8 space-x-6 text-white ">
        <Icon icon="streamline:shopping-bag-hand-bag-1-shopping-bag-purse-goods-item-products"/>
        <Icon icon="line-md:account"/>
        <Icon icon="gg:menu-right"/>
      </div>
    </div>
  );
}

export default Header;
