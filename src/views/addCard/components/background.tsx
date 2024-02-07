import { ColorPicker, Radio, UploadProps, Upload, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { colors, gradient } from "./staticData";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { cardSelector as storeCard } from "store/addCard";
import { uploadImagesCard } from "api/index";

function Component() {
  const [defaultCard, setDefaultCard] = useRecoilState(storeCard);
  const tempCard = Object.assign({}, defaultCard);

  const [backgroundType, setBackgroundType] = useState("flat");

  const [colorPickerShowFlat, setColorPickerShowFlat] = useState(false);
  const [colorPickerShowFirstGradient, setColorPickerShowFirstGradient] =
    useState(false);
  const [colorPickerShowSecondGradient, setColorPickerShowSecondGradient] =
    useState(false);

  const [flatColors, setFlatColors] = useState(colors);
  const [gradientColors, setGradientColors] = useState(gradient);

  const [flatColorSelect, setFlatColorSelect] = useState("");
  const [gradientFirstColorSelect, setGradientFirstColorSelect] = useState("");
  const [gradientSecondColorSelect, setGradientSecondColorSelect] =
    useState("");

  const [isAddNew, setIsAddNew] = useState(false);
  const [firstColor, setFirstColor] = useState("#12417A");
  const [secondColor, setSecondColor] = useState("#12C0F1");

  const colorPickerFlatRef = useRef(null);
  const colorPickerGradientFirstRef = useRef(null);
  const colorPickerGradientSecRef = useRef(null);
  useOutsideAlerter();

  function useOutsideAlerter() {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          colorPickerFlatRef.current &&
          !colorPickerFlatRef.current.contains(event.target)
        ) {
          setColorPickerShowFlat(false);
        }
        if (
          colorPickerGradientFirstRef.current &&
          !colorPickerGradientFirstRef.current.contains(event.target)
        ) {
          setColorPickerShowFirstGradient(false);
        }
        if (
          colorPickerGradientSecRef.current &&
          !colorPickerGradientSecRef.current.contains(event.target)
        ) {
          setColorPickerShowSecondGradient(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [
      colorPickerFlatRef,
      colorPickerGradientFirstRef,
      colorPickerGradientSecRef,
    ]);
  }
  useEffect(() => {}, [isAddNew, firstColor, secondColor, backgroundType]);

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
    tempCard.backgroundImage = process.env.REACT_APP_BASE_IMG + value;
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

        <ColorPicker
          open={colorPickerShowFlat}
          placement="bottom"
          value={defaultCard.backgroundColor}
          disabledAlpha={true}
          onChangeComplete={(e) => {
            handleChangeBackgroundColor(e.toHexString());
            setFlatColorSelect(e.toHexString());
          }}
          panelRender={(panel) => (
            <div ref={colorPickerFlatRef} className="custom-panel">
              {panel}
              <div className="mt-4 text-right">
                <Button
                  size="small"
                  className="gradient_btn rounded-lg px-[9px] py-[6px] !shadow-none"
                  onClick={() => {
                    setFlatColors([...flatColors, flatColorSelect]);
                    setColorPickerShowFlat(false);
                  }}
                >
                  <span className=" text-[12px] font-semibold">Chọn</span>
                </Button>
              </div>
            </div>
          )}
        >
          <div className="flex items-center justify-center w-5 h-5 text-white bg-transparent border border-white border-dashed rounded cursor-pointer">
            <Icon
              icon="tabler:plus"
              onClick={() => {
                setColorPickerShowFlat(true);
              }}
            />
          </div>
        </ColorPicker>
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
                  const pattern1 = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/;
                  const match1 = e.match(pattern1);
                  if (match1) {
                    const colorCode = match1[1];
                    setSecondColor(`#${colorCode}`)
                  }

                  const pattern2 = /#[A-Fa-f0-9]{6}\b/g;
                  const match2 = e.match(pattern2);
                  if (match2 && match2.length >= 2) {
                    const colorCode = match2[1];
                    setFirstColor(colorCode)
                  }
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
            className={`flex h-5 w-5 items-center justify-center border border-white bg-transparent text-white ${
              !isAddNew && "border-dashed"
            } cursor-pointer rounded`}
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
            />
            <div className="flex justify-between">
              <ColorPicker
                open={colorPickerShowFirstGradient}
                disabledAlpha={true}
                placement="bottom"
                value={firstColor}
                onChangeComplete={(e) => {
                  handleChangeBackgroundColor(
                    `linear-gradient(270deg, ${secondColor} 0.11%, ${e.toHexString()} 99.89%)`,
                  );
                  setGradientFirstColorSelect(e.toHexString());
                }}
                panelRender={(panel) => (
                  <div
                    ref={colorPickerGradientFirstRef}
                    className="custom-panel"
                  >
                    {panel}
                    <div className="mt-4 text-right">
                      <Button
                        size="small"
                        className="gradient_btn rounded-lg px-[9px] py-[6px] !shadow-none"
                        onClick={() => {
                          setGradientColors([
                            ...gradientColors,
                            `linear-gradient(270deg, ${secondColor} 0.11%, ${gradientFirstColorSelect} 99.89%)`,
                          ]);
                          setFirstColor(gradientFirstColorSelect);
                        }}
                      >
                        <span
                          className=" text-[12px] font-semibold"
                          onClick={() => {
                            setColorPickerShowFirstGradient(false);
                          }}
                        >
                          Chọn
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
              >
                <div
                  style={{ backgroundColor: firstColor }}
                  className="flex items-center justify-center w-5 h-5 text-white bg-transparent border-2 border-white rounded cursor-pointer"
                  onClick={() => {
                    setColorPickerShowFirstGradient(true);
                  }}
                />
              </ColorPicker>
              <ColorPicker
                open={colorPickerShowSecondGradient}
                disabledAlpha={true}
                placement="bottom"
                value={secondColor}
                onChangeComplete={(e) => {
                  handleChangeBackgroundColor(
                    `linear-gradient(270deg, ${e.toHexString()} 0.11%, ${firstColor} 99.89%)`,
                  );
                  setGradientSecondColorSelect(e.toHexString());
                }}
                panelRender={(panel) => (
                  <div ref={colorPickerGradientSecRef} className="custom-panel">
                    {panel}
                    <div className="mt-4 text-right">
                      <Button
                        size="small"
                        className="gradient_btn rounded-lg px-[9px] py-[6px] !shadow-none"
                        onClick={() => {
                          setGradientColors([
                            ...gradientColors,
                            `linear-gradient(270deg, ${gradientSecondColorSelect} 0.11%, ${firstColor} 99.89%)`,
                          ]);
                          setSecondColor(gradientSecondColorSelect);
                        }}
                      >
                        <span
                          className=" text-[12px] font-semibold"
                          onClick={() => {
                            setColorPickerShowSecondGradient(false);
                          }}
                        >
                          Chọn
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
              >
                <div
                  style={{ backgroundColor: secondColor }}
                  className="flex items-center justify-center w-5 h-5 text-white bg-transparent border-2 border-white rounded cursor-pointer"
                  onClick={() => {
                    setColorPickerShowSecondGradient(true);
                  }}
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
      fd.append("BackgroundImage", file);
      const res = await uploadImagesCard(fd);
      if (res) handleChangeBackgroundImage(res.data.backgroundImage);
    }

    return (
      <div className="h-60">
        <Dragger {...props} className="background-upload">
          <p className="ant-upload-text flex items-center justify-center space-x-1 text-sm font-semibold !text-white">
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
    <div className="rounded-2xl bg-primary-blue-dark-max px-3 py-[10px]">
      <div className="text-[12px] font-semibold text-white">Nền</div>
      <div>
        <Radio.Group
          value={backgroundType}
          className="flex w-full justify-start overflow-x-auto !px-0 !shadow-none xs:w-full"
          defaultValue="smart_card"
          buttonStyle="solid"
          onChange={(e) => {
            handleChangeBackground(e);
          }}
        >
          <Radio.Button
            className="!h-6 px-2  py-1 text-[12px] leading-4"
            value="flat"
          >
            Màu trơn
          </Radio.Button>
          <Radio.Button
            className="!h-6 px-2  py-1 text-[12px] leading-4"
            value="gradient"
          >
            Gradient
          </Radio.Button>
          <Radio.Button
            className="!h-6 px-2  py-1 text-[12px] leading-4"
            value="image"
          >
            Ảnh nền
          </Radio.Button>
        </Radio.Group>
      </div>
      <div>{checkBackgroundType()}</div>
    </div>
  );
}

export default Component;
