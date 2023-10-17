import { Radio } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { cardSelector as storeCard } from "store/card";

function Component() {
  const [defaultCard, setDefaultCard] = useRecoilState(storeCard);

  function handleChangeAlignment(e) {
    const obj = { alignment: "",
    logo: "",
    frontText: "",
    backText: "",
    backgroundColor: "",
    backgroundImage: "",}
    obj.alignment = e.target.value;
    setDefaultCard(obj);
  }
  return (
    <div>
      <div className="text-[#B6B6B6] font-bold text-base mb-4">Bố cục</div>
      <div className="grid grid-cols-3 gap-2">
        <Radio.Group
          className="flex xs:w-full   <xs:w-[510px] xs:justify-center"
          defaultValue="smart_card"
          buttonStyle="solid"
          onChange={(e) => {
            handleChangeAlignment(e);
          }}
        >
          <Radio.Button value="start">Căn trái</Radio.Button>
          <Radio.Button value="center">Căn giữa</Radio.Button>
          <Radio.Button value="end">Căn phải</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
}

export default Component;
