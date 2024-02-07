import { Icon } from "@iconify/react";
import React from "react";
// COMPONENTS
import BorderedDiv from "components/borderedDiv";
import Divider from "components/divider";
function Component({
  isEdit,
  setEdit,
}: {
  isEdit: boolean;
  setEdit: Function;
}) {
  const userLocation = [
    {
      name: "Hoàng Cẩm Đào",
      streetName: "11 Đinh Tiên Hoàng",
      wards: "P. Hàng Trống",
      district: "Q. Hoàn Kiếm",
      city: "Hà Nội",
      phone: "0915666888",
      isDefault: true,
    },
    {
      name: "Rosie",
      streetName: "12 Đinh Tiên Hoàng",
      wards: "P. Hàng Trống",
      district: "Q. Hoàn Kiếm",
      city: "Hà Nội",
      phone: "0915666888",
      isDefault: false,
    },
  ];
  function LocationItem(data) {
    return (
      <div className="mb-3 space-y-3 text-[12px] text-white">
        <div className="flex space-x-2 ">
          <span className="font-semibold">{data.name}</span>
          {data.isDefault ? <span className="italic">(Mặc định)</span> : <></>}
        </div>
        <div className="ml-2 ">{data.streetName}</div>
        <div className="grid grid-cols-2 gap-1 ml-2">
          <div>{data.wards}</div>
          <div>{data.district}</div>
        </div>
        <div className="grid grid-cols-2 gap-1 ml-2">
          <div>{data.city}</div>
          <div>{data.phone}</div>
        </div>
        <Divider />
      </div>
    );
  }
  const slot = (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-white opacity-50">
          QUẢN LÝ ĐỊA CHỈ
        </span>
        <Icon
          className="w-4 h-4 text-white cursor-pointer"
          icon="tabler:edit"
          onClick={() => {
            setEdit("LocationInfo");
          }}
        />
      </div>
      <div className="mt-[18px]">
        {userLocation.map((e, i) => (
          <div key={i}>{LocationItem(e)}</div>
        ))}
      </div>
    </div>
  );
  return (
    <BorderedDiv
      slot={slot}
      style={{
        background:
          "linear-gradient(106deg, rgba(8, 8, 8, 0.72) 0%, rgba(17, 17, 17, 0.72) 100%, rgba(8, 8, 8, 0.48) 100%)",
        padding: "18px 12px",
      }}
    />
  );
}

export default Component;
