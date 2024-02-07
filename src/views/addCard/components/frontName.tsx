import { Button, ColorPicker, Input, Select, Switch } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { cardSelector as storeCard } from "store/addCard";
import { colors, fontFamilies } from "./staticData";
import { Icon } from "@iconify/react";
function Component() {
  const [defaultCard, setDefaultCard] = useRecoilState(storeCard);
  const tempCard = Object.assign({}, defaultCard);
  const [presetColors, setPresetColors] = useState(colors);
  const [colorPickerShow, setColorPickerShow] = useState(false);
  function handleChangeEnableFrontText(e) {
    tempCard.enableFrontText = e;
    setDefaultCard(tempCard);
  }
  function handleChangeFrontText(e) {
    tempCard.frontText = e.target.value;
    setDefaultCard(tempCard);
  }
  function handleChangeFontFamily(e) {
    tempCard.fontFamily = e;
    setDefaultCard(tempCard);
  }
  const colorPickerRef = useRef(null);

  useOutsideAlerter();
  function useOutsideAlerter() {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          colorPickerRef.current &&
          !colorPickerRef.current.contains(event.target)
        ) {
          setColorPickerShow(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [colorPickerRef]);
  }
  useEffect(() => {}, []);
  return (
    <div className=" rounded-2xl bg-primary-blue-dark-max px-3 py-[10px]">
      <div className="flex justify-between">
        <div className="text-[12px] font-semibold text-white">Tên (mặt trước)</div>
        <Switch
          value={tempCard.enableFrontText}
          defaultChecked
          onChange={(e) => {
            handleChangeEnableFrontText(e);
          }}
        />
      </div>
      <div
        className={`${
          tempCard.enableFrontText ? "mt-[18px]   max-h-96 " : "max-h-0  "
        } flex flex-col overflow-auto transition-all duration-500 ease-in-out`}
      >
        <Input
          placeholder="Nhập tối đa 36 ký tự"
          bordered={false}
          onChange={(e) => {
            handleChangeFrontText(e);
          }}
        />
        <div className="flex items-center mt-3">
          <div className="w-1/3 text-[12px] text-white">Font:</div>
          <div className="w-2/3">
            <Select
              className="!bg-[rgb(11, 18, 28)] w-full pl-3"
              bordered={false}
              value={tempCard.fontFamily || "Montserrat"}
              options={fontFamilies
                .filter((e) => e !== tempCard.fontFamily)
                .map((e) => {
                  return { value: e, label: e };
                })}
              onChange={(e) => {
                handleChangeFontFamily(e);
              }}
              optionRender={(option) => (
                <div style={{ fontFamily: option.value }}>{option.label}</div>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col mt-4 space-y-3">
          <div className="text-[12px] text-white">Màu:</div>
          <div className="flex flex-wrap space-y-1">
            {presetColors.map((e, i) => {
              return e ? (
                <div
                  key={i}
                  className="w-5 h-5 mr-1 rounded cursor-pointer"
                  style={{ backgroundColor: e }}
                  onClick={() => {
                    setDefaultCard({ ...tempCard, frontTextColor: e });
                  }}
                />
              ) : (
                <div
                  key={i}
                  className="w-5 h-5 mt-1 mr-1 rounded cursor-pointer"
                  onClick={() => {
                    setDefaultCard({ ...tempCard, frontTextColor: "" });
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
              open={colorPickerShow}
              placement="bottom"
              value={defaultCard.backgroundColor}
              disabledAlpha={true}
              onChangeComplete={(e) => {
                tempCard.frontTextColor = e.toHexString();
                setDefaultCard(tempCard);
              }}
              panelRender={(panel) => (
                <div ref={colorPickerRef} className="custom-panel">
                  {panel}
                  <div className="mt-4 text-right">
                    <Button
                      size="small"
                      className="gradient_btn rounded-lg px-[9px] py-[6px] !shadow-none"
                      onClick={() => {
                        setPresetColors([
                          ...presetColors,
                          tempCard.frontTextColor,
                        ]);
                        setDefaultCard(tempCard);
                        setColorPickerShow(false);
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
                    setColorPickerShow(true);
                  }}
                />
              </div>
            </ColorPicker>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
