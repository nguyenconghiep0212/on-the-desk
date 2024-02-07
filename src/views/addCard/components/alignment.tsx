import { Radio } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { cardSelector as storeCard } from "store/addCard";

function Component() {
  const [defaultCard, setDefaultCard] = useRecoilState(storeCard);
  const tempCard = Object.assign({}, defaultCard);
  function handleChangeAlignment(e) {
    tempCard.alignment = e.target.value;
    setDefaultCard(tempCard);
  }
  return (
    <div className="px-3 py-[10px] rounded-2xl bg-primary-blue-dark-max">
      <div className="  font-semibold text-[12px] text-white">Bố cục</div>
      <div>
        <Radio.Group
          value={tempCard.alignment}
          className="flex h-full w-full overflow-x-auto !shadow-none !px-0 justify-start"
          defaultValue="smart_card"
          buttonStyle="solid"
          onChange={(e) => {
            handleChangeAlignment(e);
          }}
        >
          <Radio.Button className="px-2 py-1 !h-6 leading-4 text-[12px]" value="start">
            Căn trái
          </Radio.Button>
          <Radio.Button className="px-2 py-1  !h-6 leading-4 text-[12px]" value="center">
            Căn giữa
          </Radio.Button>
          <Radio.Button className=" px-2 py-1 !h-6 leading-4 text-[12px]" value="end">
            Căn phải
          </Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
}

export default Component;
