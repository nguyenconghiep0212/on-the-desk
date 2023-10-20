import { Icon } from "@iconify/react";
import React from "react";
import SaveToContact from "assests/portfolio/save_to_contact.svg";

function Component() {
  return (
    <div className="p-3 space-y-3">
      <div className="border border-white border-dashed rounded-lg p-[6px] text-white flex items-center space-x-3 cursor-pointer">
        <Icon icon="tabler:plus" className="w-6 h-6 " />
        <span className="text-[12px] tracking-wide">Thêm mới</span>
      </div>
      {/* SAVE TO CONTACT (DEFAULT) */}
      <div className="flex items-center justify-start w-full cursor-pointer h-9">
        <div className="bg-[#d6d6cc] flex items-center justify-center overflow-clip w-10 h-[inherit] rounded-tl-md rounded-bl-md">
          <img
            src={SaveToContact}
            alt="platform logo"
            className="w-full rounded-tl-md rounded-bl-md"
          />
        </div>
        <div className="flex bg-[#908D84] items-center justify-start w-[calc(100%-40px)] h-[inherit] px-4 rounded-tr-md rounded-br-md">
          <span className="text-white truncate">Lưu danh bạ</span>
        </div>
      </div>
    </div>
  );
}

export default Component;
