import { Radio } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { cardSelector as storeCard } from "store/card";

function Component() {
  const [defaultCard, setDefaultCard] = useRecoilState(storeCard);
const tempCard = Object.assign({},defaultCard)
  function handleChangeAlignment(e) {
    
    tempCard.alignment = e.target.value;
    setDefaultCard(tempCard);
  }
  return (
    <div className="px-3 py-[10px] rounded-2xl bg-primary-blue-dark-max">
      <div className="text-sm font-semibold text-white">Bố cục</div>
      <div>
        <Radio.Group
        value={tempCard.alignment}
          className="flex xs:w-full <xs:w-[510px] !shadow-none !px-0 justify-start"
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
