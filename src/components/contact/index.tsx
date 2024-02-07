import { Icon } from "@iconify/react";
import React from "react";

function Component({
  contact,
  isMultiple = false,
  event,
}: {
  contact: any;
  isMultiple: Boolean;
  event: Function;
}) {
  return (
    <div
      className="flex items-center justify-start w-full cursor-pointer h-9"
      onClick={() => {
        event();
      }}
    >
      <div
        className={`flex items-center justify-center w-10 h-[inherit] rounded-tl-md rounded-bl-md ${
          contact.keyContact === "phone" ? "bg-[#01B634]" : "bg-white"
        }`}
      >
        <img
          src={`${process.env.REACT_APP_BASE_IMG}${contact.linkIcon}`}
          alt="platform logo"
        />
      </div>
      <div
        className="flex items-center justify-between w-[calc(100%-40px)] h-[inherit] px-4 rounded-tr-md rounded-br-md"
        style={{
          backgroundColor: `${contact.backgroundColor}`,
        }}
      >
        <span className="text-white truncate">{contact.nameContact}</span>
        {isMultiple ? (
          <Icon
            className="text-lg text-white"
            icon="solar:alt-arrow-down-linear"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Component;
