import { getComponentFromPackage } from "api";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { COMPONENT } from "interface/component";
import { Button, Input, Modal } from "antd";
import { Icon } from "@iconify/react";

// ASSETS
import Preview_Background from "assests/portfolio/preview_background.png";
import Preview_Avatar from "assests/portfolio/preview_avatar.png";
import Logo from "assests/landing/logo.svg";
import "./style.scss";

// STORE
import { selectedPackage as selectedPackageAtom } from "store/addCard";

// COMPONENT
import DynamicComponent from "./dynamicComponents.tsx";

function Component() {
  const [selectedPackage] = useRecoilState(selectedPackageAtom);
  const [packageComponents, setPackageComponents] = useState<COMPONENT[]>([]);
  const [showContact, setShowContact] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "Tên người dùng",
    description: "Mô tả",
    avatar: "",
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
    selectedPackage: selectedPackage,
  });
  async function fetchPackageComponents() {
    if (selectedPackage.id) {
      const res = await getComponentFromPackage(selectedPackage.id);
      if (res) {
        res.data.forEach((e) => {
          try {
            e.config = JSON.parse(e.config);
          } catch (error) {
            e.config = {};
            console.error("Lỗi config component", error);
          }
        });
        setPackageComponents(res.data);
      }
    }
  }
  useEffect(() => {}, [showContact, contactForm]);
  useEffect(() => {
    if (selectedPackage.showCallMe) {
      setShowContact(true);
    } else {
      setShowContact(false);
      fetchPackageComponents();
    }
    const temp = Object.assign({}, contactForm);
    temp.selectedPackage = selectedPackage;
    setContactForm(temp);
  }, [selectedPackage]);

  function Preview() {
    return (
      <div>
        <div
          id="background-cover"
          className="relative flex flex-col items-center justify-center w-full aspect-video "
        >
          <div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            style={{
              backgroundImage: `url('${Preview_Background}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(24, 25, 26, 0.00) 80.05%, #18191A 100%)",
            }}
          ></div>
          <img src={Logo} alt="Logo" className="z-10 h-[105px] w-[105px]" />
          <div className="z-10 mt-[14px] text-lg text-primary-blue-light">
            On the Desk Cover
          </div>
        </div>
        <div className="flex w-full -mt-5">
          <div className="relative">
            <img src={Preview_Avatar} alt="Logo" className="w-20 h-20" />
          </div>
          <div className="flex flex-col justify-end p-3 text-white">
            <div className="px-0 text-[18px] font-bold ">{userForm.name}</div>
            <div className="px-0 text-[12px] font-medium">
              {userForm.description}
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-6">
          {packageComponents.map((item, index) => (
            <div key={index} className="w-full rounded-2xl bg-[#1E2530]">
              <DynamicComponent is={item.key} alias={item.config.alias} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Contact() {
    const { TextArea } = Input;
    const slot = (
      <div className="space-y-3">
        <Input
          className="!shadow-none"
          placeholder="Họ tên (*)"
          onChange={(e) => {
            contactForm.name = e.target.value;
          }}
        />
        <Input
          className="!shadow-none"
          placeholder="Số điện thoại (*)"
          onChange={(e) => {
            contactForm.phone = e.target.value.match(/\d/g)?.join("");
          }}
        />
        <Input
          className="!shadow-none"
          placeholder="Email (*)"
          onChange={(e) => {
            contactForm.email = e.target.value;
          }}
        />
        <TextArea
          className="!shadow-none"
          placeholder="Lời nhắn"
          onChange={(e) => {
            contactForm.note = e.target.value;
          }}
        />
        <div className=" flex items-center justify-center rounded-lg bg-[#151b23] px-[12px] py-[6px] text-[18px] font-semibold text-white">
          Gói {contactForm.selectedPackage.name}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button className="flex w-full items-center justify-center text-[18px] font-semibold !text-primary-blue-medium !shadow-none">
            Gửi ngay
          </Button>
          <Button className="gradient_btn flex w-full items-center justify-center space-x-[6px] text-[18px] font-semibold !shadow-none">
            <Icon
              className="h-[22px] w-[22px]"
              icon="material-symbols:call-outline"
            />
            Liên hệ
          </Button>
        </div>
      </div>
    );
    return (
      <div
        className="rounded-2xl p-[18px]"
        style={{
          background: "rgba(12, 13, 13, 0.5)",
        }}
      >
        {slot}
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-6">
      {showContact ? <Contact /> : <Preview />}
    </div>
  );
}

export default Component;
