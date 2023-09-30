import React from "react";
import Logo from "assests/logo.svg";
import Hero1_banner from "assests/hero_1.svg";
import { Button } from "antd";

function Hero1() {
  return (
    <div className="grid grid-cols-2 gap-2 ">
      <div className="flex flex-col justify-start space-y-2">
        <div className="flex space-x-2 text-[38px] italic">
          <span className="font-sans font-thin text-primary-blue-medium">
            Everythinks
          </span>
          <span className="font-sans font-bold text-primary-blue-medium">
            On The Desk
          </span>
        </div>

        <div className="font-sans font-thin tracking-wide text-white !my-6">
          Thẻ thông minh hàng đầu Việt Nam kết nối và tối ưu cho từng cá nhân và
          doanh nghiệp một cách nhanh chóng dễ dàng.
        </div>
        <div className="flex items-center space-x-3">
          <Button className="flex items-center">
            <img src={Logo} alt="logo" className="w-4 mr-1" />
            <span className="font-semibold text-primary-blue-medium">
              Create
            </span>
          </Button>

          <span className="font-sans italic font-semibold text-primary-blue-medium">
            your own life with your own style
          </span>
        </div>
      </div>
      <div>
        <img src={Hero1_banner} alt="" />
        <div className="shadow" />
      </div>
    </div>
  );
}

function Hero2() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div></div>
    </div>
  );
}

function Product() {
  return (
    <div className="space-y-20 ">
      <Hero1 />
      <Hero2 />
    </div>
  );
}

export default Product;
