import { ColorPicker, Radio, UploadProps, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { colors, gradient } from "./staticData";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { cardSelector as storeCard } from "store/addCard";
import { uploadImagesCard } from "api/index";

function Component() {
  const [defaultCard, setDefaultCard] = useRecoilState(storeCard);
  const tempCard = Object.assign({}, defaultCard);

  const [backgroundType, setBackgroundType] = useState("flat");

  const [flatColors, setFlatColors] = useState(colors);
  const [gradientColors, setGradientColors] = useState(gradient);

  const [isAddNew, setIsAddNew] = useState(false);
  const [firstColor, setFirstColor] = useState("#12417A");
  const [secondColor, setSecondColor] = useState("#12C0F1");

  useEffect(() => {}, [isAddNew, firstColor, secondColor]);
  useEffect(() => {}, [backgroundType]);

  function handleChangeBackground(e) {
    setBackgroundType(e.target.value);
  }

  function checkBackgroundType() {
    switch (backgroundType) {
      case "flat":
        return FlatColor();
      case "gradient":
        return GradientColor();
      case "image":
        return ImageBackground();
      default:
        break;
    }
  }

  function handleChangeBackgroundColor(value: string | null) {
    tempCard.backgroundColor = value;
    tempCard.backgroundImage = null;
    setDefaultCard(tempCard);
  }

  function handleChangeBackgroundImage(value: string | null) {
    tempCard.backgroundColor = null;
    tempCard.backgroundImage = value;
    setDefaultCard(tempCard);
  }

  function FlatColor() {
    return (
      <div className="flex flex-wrap space-y-1">
        {flatColors.map((e, i) => {
          return e ? (
            <div
              key={i}
              className="w-5 h-5 mr-1 rounded cursor-pointer"
              style={{ backgroundColor: e }}
              onClick={() => {
                handleChangeBackgroundColor(e);
              }}
            />
          ) : (
            <div
              key={i}
              className="w-5 h-5 mt-1 mr-1 rounded cursor-pointer"
              onClick={() => {
                handleChangeBackgroundColor(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clipPath="url(#clip0_2723_3153)">
                  <rect width="20" height="20" rx="3" fill="white" />
                  <line
                    x1="20.5281"
                    y1="0.532594"
                    x2="0.356182"
                    y2="20.5326"
                    stroke="#EB5757"
                    strokeWidth="1.5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2723_3153">
                    <rect width="20" height="20" rx="3" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          );
        })}
        <div className="flex items-center justify-center w-5 h-5 text-white bg-transparent border border-white border-dashed rounded cursor-pointer">
          <ColorPicker
            value={defaultCard.backgroundColor}
            onChangeComplete={(e) => {
              setFlatColors([...flatColors, e.toHexString()]);
              handleChangeBackgroundColor(e.toHexString());
            }}
          >
            <Icon icon="tabler:plus" />
          </ColorPicker>
        </div>
      </div>
    );
  }
  function GradientColor() {
    return (
      <div>
        <div className="flex flex-wrap space-y-1 ">
          {gradientColors.map((e, i) => {
            return e ? (
              <div
                key={i}
                className="w-5 h-5 mr-1 rounded cursor-pointer"
                style={{ background: e }}
                onClick={() => {
                  handleChangeBackgroundColor(e);
                }}
              />
            ) : (
              <div
                key={i}
                className="w-5 h-5 mt-1 mr-1 rounded cursor-pointer"
                onClick={() => {
                  handleChangeBackgroundColor(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#clip0_2723_3153)">
                    <rect width="20" height="20" rx="3" fill="white" />
                    <line
                      x1="20.5281"
                      y1="0.532594"
                      x2="0.356182"
                      y2="20.5326"
                      stroke="#EB5757"
                      strokeWidth="1.5"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2723_3153">
                      <rect width="20" height="20" rx="3" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            );
          })}
          <div
            className={`flex items-center justify-center w-5 h-5 text-white bg-transparent border border-white ${
              !isAddNew && "border-dashed"
            } rounded cursor-pointer`}
            onClick={() => {
              setIsAddNew(!isAddNew);
            }}
          >
            <Icon icon="tabler:plus" />
          </div>
        </div>

        {isAddNew && (
          <div className="space-y-3 mt-7">
            <div
              className="w-full h-5 border-2 border-white rounded"
              style={{
                background: `linear-gradient(270deg, ${secondColor} 0.11%, ${firstColor} 99.89%)`,
              }}
            ></div>
            <div className="flex justify-between">
              <ColorPicker
                value={firstColor}
                onChangeComplete={(e) => {
                  setGradientColors([
                    ...gradientColors,
                    `linear-gradient(270deg, ${secondColor} 0.11%, ${e.toHexString()} 99.89%)`,
                  ]);
                  setFirstColor(e.toHexString());
                  handleChangeBackgroundColor(
                    `linear-gradient(270deg, ${secondColor} 0.11%, ${e.toHexString()} 99.89%)`
                  );
                }}
              >
                <div
                  style={{ backgroundColor: firstColor }}
                  className="flex items-center justify-center w-5 h-5 text-white bg-transparent border-2 border-white rounded cursor-pointer"
                />
              </ColorPicker>
              <ColorPicker
                value={secondColor}
                onChangeComplete={(e) => {
                  setGradientColors([
                    ...gradientColors,
                    `linear-gradient(270deg, ${e.toHexString()} 0.11%, ${firstColor} 99.89%)`,
                  ]);
                  setSecondColor(e.toHexString());
                  handleChangeBackgroundColor(
                    `linear-gradient(270deg, ${e.toHexString()} 0.11%, ${firstColor} 99.89%)`
                  );
                }}
              >
                <div
                  style={{ backgroundColor: secondColor }}
                  className="flex items-center justify-center w-5 h-5 text-white bg-transparent border-2 border-white rounded cursor-pointer"
                />
              </ColorPicker>
            </div>
          </div>
        )}
      </div>
    );
  }
  function ImageBackground() {
    const { Dragger } = Upload;
    const props: UploadProps = {
      name: "file",
      multiple: true,
      action: async (file) => await uploadFile(file),
    };
    async function uploadFile(file) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadImagesCard(fd);
      if (res) handleChangeBackgroundImage(res.data);
    }

    return (
      <div className="h-60">
        <Dragger {...props}>
          <p className="flex items-center justify-center space-x-1 text-sm font-semibold !text-white ant-upload-text">
            <Icon icon="tabler:plus" />
            <span> Tải ảnh lên</span>
          </p>
          <p className="ant-upload-hint text-[12px] !text-white">
            <span>(khuyên dùng: 1024 x 639 px)</span>
          </p>
        </Dragger>
      </div>
    );
  }
  return (
    <div className="px-3 py-[10px] rounded-2xl bg-primary-blue-dark-max">
      <div className="text-sm font-semibold text-white">Nền</div>
      <div>
        <Radio.Group
          value={backgroundType}
          className="flex xs:w-full w-full overflow-x-auto !shadow-none !px-0 justify-start"
          defaultValue="smart_card"
          buttonStyle="solid"
          onChange={(e) => {
            handleChangeBackground(e);
          }}
        >
          <Radio.Button value="flat">Màu trơn</Radio.Button>
          <Radio.Button value="gradient">Gradient</Radio.Button>
          <Radio.Button value="image">Ảnh nền</Radio.Button>
        </Radio.Group>
      </div>
      <div>{checkBackgroundType()}</div>
    </div>
  );
}

export default Component;
