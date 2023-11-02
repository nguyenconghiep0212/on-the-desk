import { Icon } from "@iconify/react";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLogin } from "store/root";
import IconAccount from "assests/icon/ic-account.svg";
import { Popover } from "antd";

function Component({ profile_menu }) {
  const [, , removeCookie] = useCookies(["auth-token", "auth-id"]);
  const [, setLogin] = useRecoilState(isLogin);

  const navigate = useNavigate();
  const content = (
    <div className="relative z-1 ">
      {profile_menu.map((item, index) => (
        <div
          key={index}
          className="relative z-10 p-[1px] cursor-pointer h-9 w-40 menu-btn-bg"
          onClick={() => {
            item.onClick();
          }}
        >
          <div
            className="flex items-center w-full h-full px-3 space-x-1 text-white menu-btn"
            key={index}
          >
            <Icon className="text-base" icon={item.icon} />
            <div className="font-sans font-thin tracking-wide">
              {item.label}
            </div>
          </div>
        </div>
      ))}
      <div className="my-[6px] border-t-[1px] border-solid border-white border-opacity-50"></div>
      <div className="relative z-10 p-[1px] cursor-pointer h-9 w-40 menu-btn-bg">
        <div
          className="flex items-center w-full h-full px-3 space-x-1 text-white menu-btn"
          onClick={() => {
            removeCookie("auth-token");
            removeCookie("auth-id");
            setLogin(false);
            navigate("/login");
          }}
        >
          <Icon className="text-base" icon="mdi:logout" />
          <div className="font-sans font-thin tracking-wide">Đăng xuất</div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Popover
        align={{
          offset: [7, 10],
        }}
        placement="bottomRight"
        content={content}
        trigger="click"
      >
        <img
          className="cursor-pointer w-[24px] h-[24px]"
          src={IconAccount}
          alt="IconAccount"
        />
      </Popover>
    </div>
  );
}

export default Component;
