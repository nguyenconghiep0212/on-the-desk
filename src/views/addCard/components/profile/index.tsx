import { getComponentFromPackage } from "api";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedPackage as selectedPackageAtom } from "store/addCard";
import DynamicComponent from "./dynamicComponents";
import { COMPONENT } from "interface/component";
import Logo from "assests/landing/logo.svg";
import { Button, Input } from "antd";
import IcCamera from "assests/icon/ic-camera-blue.svg";
import { Icon } from "@iconify/react";

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
          className="relative flex items-center justify-center w-full opacity-50 aspect-video"
        >
          <img src={Logo} alt="Logo" className="w-1/4" />
          <div
            className="absolute flex items-center justify-center w-6 h-6 rounded cursor-pointer bottom-6 right-5"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.08) 100%)",
            }}
          >
            <img
              src={IcCamera}
              alt="IcCamera"
              className="text-primary-blue-dark "
            />
          </div>
        </div>
        <div className="flex w-full -mt-5">
          <div className="relative">
            <img src={Logo} alt="Logo" className="w-20 h-20" />
            <div
              className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 rounded cursor-pointer"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.31) 0%, rgba(255, 255, 255, 0.08) 100%)",
              }}
            >
              <img
                src={IcCamera}
                alt="IcCamera"
                className="text-primary-blue-dark "
              />
            </div>
          </div>
          <div className="flex flex-col justify-end p-3">
            <Input
              className="text-[18px] font-bold px-0"
              bordered={false}
              value={userForm.name}
            />
            <Input
              className="text-[12px] font-medium px-0"
              bordered={false}
              value={userForm.description}
            />
          </div>
        </div>
        <div className="mt-6 space-y-6">
          {packageComponents.map((item, index) => (
            <div key={index} className="rounded-2xl w-full bg-[#1E2530]">
              <DynamicComponent is={item.key} alias={item.config.alias} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Contact() {
    const { TextArea } = Input;

    return (
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
        <div className=" text-white font-semibold text-[18px] px-[12px] rounded-lg bg-primary-blue-dark-max py-[6px] flex justify-center items-center">
          Gói {contactForm.selectedPackage.name}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button className="flex items-center justify-center !text-primary-blue-medium text-[18px] font-semibold !shadow-none w-full">
            Gửi ngay
          </Button>
          <Button className="!shadow-none w-full flex items-center justify-center text-[18px] font-semibold gradient_btn space-x-[6px]">
            <Icon
              className="w-[22px] h-[22px]"
              icon="material-symbols:call-outline"
            />
            Liên hệ
          </Button>
        </div>
      </div>
    );
  }
  return <div>{showContact ? Contact() : Preview()}</div>;
}

export default Component;
