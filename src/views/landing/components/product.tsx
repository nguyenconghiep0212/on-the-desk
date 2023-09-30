import React from "react";
import Logo from "assests/logo.svg";
import Logo_white from "assests/logo_white.svg";
import Hero1_banner from "assests/hero_1.svg";
import Hero2_banner from "assests/hero_2.svg";
import Hero3_banner from "assests/hero_3.svg";
import Instruction_placeholder from "assests/instruction_default.svg";
import { Button, Radio } from "antd";
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
          <Button className="flex items-center hover:scale-105">
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
        <img src={Hero1_banner} alt="hero1" className="scale-125" />
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
  const instructions = [
    {
      url: Instruction_placeholder,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
    {
      url: Instruction_placeholder,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
    {
      url: Instruction_placeholder,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
    {
      url: Instruction_placeholder,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
  ];
  return (
    <div className="flex flex-col space-y-5">
      <span className="text-[45px] font-sans font-bold text-primary-blue-medium">
        Hướng dẫn sử dụng
      </span>
      <Radio.Group
        className="w-fit"
        defaultValue="smart_card"
        buttonStyle="solid"
        onChange={() => {}}
      >
        <Radio.Button value="smart_card">Thẻ thông minh</Radio.Button>
        <Radio.Button value="online_portfolio">Hồ sơ trực tuyến</Radio.Button>
        <Radio.Button value="compatible_device">
          Thiết bị tương thích
        </Radio.Button>
      </Radio.Group>
      <div className="flex !mt-8 space-x-4">
        {instructions.map((item, index) => (
          <div className="space-y-6 transition-all duration-300 cursor-pointer instruction_card hover:scale-105">
            <img src={item.url} alt="instruction_default" />
            <div className="text-[14px] tracking-wide font-sans font-thin">
              {item.description}
            </div>
            <div className="text-right">
              <span className="font-sans instruction_index">{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex justify-center !mt-16 space-x-3">
      <div className="small_star">*</div>
      <div className="medium_star">*</div>
      <div className="large_star">*</div>
      <div className="medium_star">*</div>
      <div className="small_star">*</div>
    </div>
  );
}

function Environment() {
  return (
    <div className="flex flex-col !mt-8 items-center">
      <div className="text-primary-blue-medium text-[45px] font-bold">
        Hệ sinh thái toàn diện
      </div>
      <div className="font-sans italic font-thin tracking-wide text-center text-white">
        On the Desk cung cấp giải pháp bao gồm thẻ thông minh, hồ sơ trực tuyến
        được cá nhân hoá và dịch vụ phát triển giao diện nội dung phù hợp với
        mọi nhu cầu của cá nhân và doanh nghiệp.
      </div>

      <Button className="flex items-center mt-12 space-x-1 text-white environment_btn">
        <img src={Logo_white} alt="logo" className="w-6 pt-1 " />
        <span className="font-sans text-lg tracking-wide">Bắt đầu ngay</span>
      </Button>
    </div>
  );
}
function Product() {
  return (
    <div className="py-32 space-y-36">
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <Instruction />
      <Divider />
      <Environment />
    </div>
  );
}

export default Product;
