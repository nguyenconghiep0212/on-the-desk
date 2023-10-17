import { Radio } from "antd";
import React, { useEffect, useState } from "react";
import { colors } from "./staticData";

function Component() {
  const [backgroundType, setBackgroundType] = useState("flat");
  function handleChangeBackground(e) {
    setBackgroundType(e.target.value);
  }
  useEffect(() => {}, [backgroundType]);

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

  function FlatColor() {
    
    return (
      <div className="flex space-x-1">
        {colors.map((e, i) => {
          return e ? (
              <div key={i} className={`!bg-[${e}] rounded w-5 h-5`} ></div>
            ) : ( 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_2723_3153)">
                    <rect width="20" height="20" rx="3" fill="white" />
                    <line
                      x1="20.5281"
                      y1="0.532594"
                      x2="0.356182"
                      y2="20.5326"
                      stroke="#EB5757"
                      stroke-width="1.5"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2723_3153">
                      <rect width="20" height="20" rx="3" fill="white" />
                    </clipPath>
                  </defs>
                </svg> 
            ); 
        })}
      </div>
    );
  }
  function GradientColor() {
    return <div></div>;
  }
  function ImageBackground() {
    return <div></div>;
  }
  return (
    <div className="px-3 py-[10px] rounded-2xl bg-primary-blue-dark-max">
      <div className="text-sm font-semibold text-white">Nền</div>
      <div>
        <Radio.Group
          value={backgroundType}
          className="flex xs:w-full <xs:w-[510px] !shadow-none !px-0 justify-start"
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
