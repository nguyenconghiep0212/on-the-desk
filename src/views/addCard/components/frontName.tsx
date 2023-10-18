import { Input, Select, Switch } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { cardSelector as storeCard } from "store/card";

function Component() {
  const [defaultCard, setDefaultCard] = useRecoilState(storeCard);
  const tempCard = Object.assign({}, defaultCard);

  function handleChangeEnableFrontText(e) {
    tempCard.enableFrontText = e;
    setDefaultCard(tempCard);
  }
  return (
    <div className="px-3 py-[10px] rounded-2xl space-y-[18px] bg-primary-blue-dark-max">
      <div className="flex justify-between">
        <div className="text-sm font-semibold text-white">Tên (mặt trước)</div>
        <Switch
          defaultChecked
          onChange={(e) => {
            handleChangeEnableFrontText(e);
          }}
        />
      </div>

      <Input placeholder="Nhập tối đa 36 ký tự" bordered={false} />
      <div className="flex items-center">
        <div className="w-1/3 text-white text-[12px] font-semibold">Font:</div>
        <div className="w-2/3">
          <Select
            defaultValue="montserrat"
            className="w-full"
            bordered={false}
            options={[{ value: "montserrat", label: "Montserrat" }]}
          />
        </div>
      </div>
    </div>
  );
}

export default Component;
