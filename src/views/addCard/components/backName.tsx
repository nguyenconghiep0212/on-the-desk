import { Input } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { cardSelector as storeCard } from "store/addCard";

function Component() {
  const [defaultCard, setDefaultCard] = useRecoilState(storeCard);
  const tempCard = Object.assign({}, defaultCard);

  function handleChangeBackText(e) {
    tempCard.backText = e.target.value;
    setDefaultCard(tempCard);
  }
  return (
    <div className="px-3 py-[10px] rounded-2xl space-y-[18px] bg-primary-blue-dark-max">
      <div className="flex justify-between">
        <div className="text-[12px] font-semibold text-white">Tên (mặt sau)</div>
      </div>

      <Input
        placeholder="Nhập tối đa 36 ký tự"
        bordered={false}
        onChange={(e) => {
          handleChangeBackText(e);
        }}
      />
    </div>
  );
}

export default Component;
