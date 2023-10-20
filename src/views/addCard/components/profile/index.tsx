import { getComponentFromPackage } from "api";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedPackage as selectedPackageAtom } from "store/addCard";
import DynamicComponent from "./dynamicComponents";
import { COMPONENT } from "interface/component";
import Logo from "assests/landing/logo.svg";
import { Input } from "antd";
import IcCamera from "assests/icon/ic-camera-blue.svg";

function Component() {
  const [selectedPackage] = useRecoilState(selectedPackageAtom);
  const [packageComponents, setPackageComponents] = useState<COMPONENT[]>([]);

  const [userForm, setUserForm] = useState({
    name: "Tên người dùng",
    description: "Mô tả",
    avatar: "",
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
  useEffect(() => {
    fetchPackageComponents();
  }, [selectedPackage]);
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
        {packageComponents.map((item) => (
          <div className="rounded-2xl w-full bg-[#1E2530]">
            <DynamicComponent is={item.key} alias={item.config.alias} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Component;
