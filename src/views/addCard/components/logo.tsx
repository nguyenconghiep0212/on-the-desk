import { Icon } from "@iconify/react";
import { Radio, Switch, Upload, UploadProps, message } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { cardSelector as storeCard } from "store/card";

function Component() {
  const [defaultCard, setDefaultCard] = useRecoilState(storeCard);
  const tempCard = Object.assign({}, defaultCard);

  const [logoType, setLogoType] = useState("image");
  function handleChangeLogoType(e) {
    setLogoType(e.target.value);
  }

  function handleChangeEnableLogo(e) {
    tempCard.enableLogo = e;
    setDefaultCard(tempCard);
  }

  useEffect( () => {} , [logoType])
  function FileUpload() {
    const { Dragger } = Upload;
    const props: UploadProps = {
      name: "file",
      multiple: true,
      action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
      onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
      },
    };
    return (
      <div className="h-60">
        <Dragger {...props}>
          <p className="flex items-center justify-center space-x-1 text-sm font-semibold !text-white ant-upload-text">
            <Icon icon="tabler:plus" />
            <span> Tải ảnh lên</span>
          </p>
          <p className="ant-upload-hint text-[12px] !text-white">
            <span>(khuyên dùng: 512 x 512 px {logoType === 'logo' && 'tách nền'})</span>
          </p>
        </Dragger>
      </div>
    );
  }

  return (
    <div className="px-3 py-[10px] rounded-2xl bg-primary-blue-dark-max">
      <div className="flex justify-between">
        <div className="text-sm font-semibold text-white">
          Hình đại diện/ Logo
        </div>

        <Switch
          defaultChecked
          onChange={(e) => {
            handleChangeEnableLogo(e);
          }}
        />
      </div>
      <Radio.Group
        value={logoType}
        className="flex overflow-x-auto !shadow-none !px-0 justify-start"
        defaultValue="smart_card"
        buttonStyle="solid"
        onChange={(e) => {
          handleChangeLogoType(e);
        }}
      >
        <Radio.Button value="image">Hình đại diện</Radio.Button>
        <Radio.Button value="logo">Logo</Radio.Button>
      </Radio.Group>
      {FileUpload()}
    </div>
  );
}

export default Component;
