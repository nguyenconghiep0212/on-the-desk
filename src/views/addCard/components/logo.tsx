import { Icon } from "@iconify/react";
import { Radio, Switch, Upload, UploadProps, message } from "antd";
import { uploadImagesCard } from "api";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { cardSelector as storeCard } from "store/addCard";

function Component() {
  const [defaultCard, setDefaultCard] = useRecoilState(storeCard);
  const tempCard = Object.assign({}, defaultCard);

  const [logoType, setLogoType] = useState("image");
  const [uploadedFile, setUploadFile] = useState({});

  function handleChangeLogoType(e) {
    setLogoType(e.target.value);
  }

  function handleChangeEnableLogo(e) {
    tempCard.enableLogo = e;
    setDefaultCard(tempCard);
  }

  function FileUpload() {
    const { Dragger } = Upload;
    const props: UploadProps = {
      name: "file",
      multiple: true,
      action: async (file) => await uploadFile(file),
    };
    async function uploadFile(file) {
      setUploadFile(file);
      const fd = new FormData();
      fd.append("LogoImage", file);
      const res = await uploadImagesCard(fd);
      if (res) {
        tempCard.logo = process.env.REACT_APP_BASE_IMG + res.data.logoImage;
        setDefaultCard(tempCard);
      }
    }

    useEffect(() => {}, [logoType, uploadedFile]);

    return (
      <div className="h-60">
        <Dragger {...props} className="logo-upload">
          {uploadedFile && (
            <div className="flex items-center justify-center mb-2 font-semibold truncate text-primary-blue-medium">
              <span className="max-w-[30%] truncate">{uploadedFile.name}</span>
            </div>
          )}
          <p className="ant-upload-text flex items-center justify-center space-x-1 text-sm font-semibold !text-white">
            <Icon icon="tabler:plus" />
            <span> Tải ảnh lên</span>
          </p>
          <p className="ant-upload-hint text-[12px] !text-white">
            <span>
              (khuyên dùng: 512 x 512 px {logoType === "logo" && "tách nền"})
            </span>
          </p>
        </Dragger>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-primary-blue-dark-max px-3 py-[10px]">
      <div className="flex justify-between">
        <div className="text-[12px] font-semibold text-white">
          Hình đại diện/ Logo
        </div>

        <Switch
          value={tempCard.enableLogo}
          defaultChecked
          onChange={(e) => {
            handleChangeEnableLogo(e);
          }}
        />
      </div>
      <div
        className={`${
          tempCard.enableLogo ? "max-h-96  " : "max-h-0 "
        } flex flex-col overflow-auto transition-all duration-500 ease-in-out`}
      >
        <Radio.Group
          value={logoType}
          className="flex justify-start overflow-x-auto !px-0 !shadow-none"
          defaultValue="smart_card"
          buttonStyle="solid"
          onChange={(e) => {
            handleChangeLogoType(e);
          }}
        >
          <Radio.Button
            className="!h-6 px-2  py-1 text-[12px] leading-4"
            value="image"
          >
            Hình đại diện
          </Radio.Button>
          <Radio.Button
            className="!h-6 px-2  py-1 text-[12px] leading-4"
            value="logo"
          >
            Logo
          </Radio.Button>
        </Radio.Group>
        <FileUpload />
      </div>
    </div>
  );
}

export default Component;
