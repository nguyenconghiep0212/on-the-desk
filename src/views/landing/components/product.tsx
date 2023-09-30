import React from "react";
import Logo from "assests/logo.svg";
import Hero1_banner from "assests/hero_1.svg";
import Hero2_banner from "assests/hero_2.svg";
import Hero3_banner from "assests/hero_3.svg";
import { Button } from "antd";
import { Icon } from "@iconify/react";

function Hero1() {
  return (
    <div className="grid grid-cols-3 gap-2 ">
      <div className="flex flex-col justify-start col-span-2 pr-6 space-y-2">
        <div className="flex space-x-2 text-[48px] italic">
          <span className="font-sans font-thin text-primary-blue-medium">
            Everythinks
          </span>
          <span className="font-sans font-bold text-primary-blue-medium">
            On The Desk
          </span>
        </div>
        <div className="font-sans text-lg font-thin tracking-wide text-white !my-6">
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
          <span className="font-sans text-lg italic font-semibold text-primary-blue-medium">
            your own life with your own style
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img src={Hero1_banner} alt="hero1"  className="scale-125"/>
        <div className="scale-x-150 shadow" />
      </div>
    </div>
  );
}

function Hero2() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col items-center justify-center">
        <img src={Hero2_banner} alt="hero2" className="scale-125" />
      </div>
      <div className="flex flex-col items-start justify-center col-span-2 ml-4">
        <span className="text-[45px] font-sans font-bold text-primary-blue-medium">
          Cá nhân hóa
        </span>
        <span className="-mt-2 font-sans text-lg italic font-light text-primary-blue-medium">
          Phong cách của bạn là duy nhất
        </span>
        <div className="mt-3 text-white">
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:dot" />
            <span className="font-sans text-lg font-thin tracking-wide">
              Đặc quyền <span className="font-bold">thiết kế riêng</span> thẻ
              thông minh và hồ sơ trực tuyến.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:dot" />
            <span className="font-sans text-lg font-thin tracking-wide">
              Giao diện hiện đại phù hợp với phong cách và công việc của bạn.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:dot" />
            <span className="font-sans text-lg font-thin tracking-wide">
              Kết nối và chia sẻ thông tin ấn tượng ngay từ lần đầu tiên.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero3() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col justify-center col-span-2 text-white">
        <span className="text-[45px] font-sans font-bold text-primary-blue-medium">
          Tối ưu doanh nghiệp
        </span>
        <span className="-mt-2 font-sans text-lg italic font-light text-primary-blue-medium">
          Hiện đại hoá doanh nghiệp và cách vận hành
        </span>
        <div className="mt-3 text-white">
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:dot" />
            <span className="font-sans text-lg font-thin tracking-wide">
              Phát triển nội dung số chuyên nghiệp không giới hạn.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:dot" />
            <span className="font-sans text-lg font-thin tracking-wide">
              Tối ưu chi phí vận hành.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:dot" />
            <span className="font-sans text-lg font-thin tracking-wide">
              Nâng cao trải nghiệm khách hàng.
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img src={Hero3_banner} alt="hero1" className="scale-150" />
        <div className="ml-4 shadow mt-14" />
      </div>
    </div>
  );
}

function Instruction() {
  return <div></div>;
}
function Product() {
  return (
    <div className="mt-32 space-y-36">
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <Instruction />
    </div>
  );
}

export default Product;
