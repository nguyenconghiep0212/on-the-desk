import { Icon } from "@iconify/react";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLogin } from "store/root.ts";
import IconAccount from "assests/icon/ic-account.svg";
import { Popover } from "antd";

function Component({ profile_menu }) {
  const [cookies, , removeCookie] = useCookies([
    "auth-token",
    "auth-id",
    "current-user-avatar",
    "current-user-shortcut",
  ]);
  const [checkIsLogIn, setLogin] = useRecoilState(isLogin);
  const navigate = useNavigate();

 

  const signin = (
    <div className="relative ">
      <div
        className="relative z-10 p-[1px] cursor-pointer h-9 w-40 menu-btn-bg"
        onClick={() => {
          navigate("/addCard");
        }}
      >
        <div className="flex items-center w-full h-full px-3 space-x-1 text-white menu-btn">
          <Icon className="text-base" icon="solar:card-outline" />
          <div className="font-sans font-thin tracking-wide">Tạo thẻ</div>
        </div>
      </div>
      <div className="my-[6px] border-t-[1px] border-solid border-white border-opacity-50"></div>
      <div className="relative z-10 p-[1px] cursor-pointer h-9 w-40 menu-btn-bg">
        <div
          className="flex items-center w-full h-full px-3 space-x-1 text-white menu-btn"
          onClick={() => {
            navigate("/login")
          }}
        >
          <Icon className="text-base" icon="mdi:login" />
          <div className="font-sans font-thin tracking-wide">Đăng nhập</div>
        </div>
      </div>

      <div className="relative z-10 p-[1px] cursor-pointer h-9 w-40 menu-btn-bg">
        <div
          className="flex items-center w-full h-full px-3 space-x-1 text-white menu-btn"
          onClick={() => {
            navigate("/login?signup=true")
          }}
        >
          <Icon className="text-base" icon="tabler:user-plus" />
          <div className="font-sans font-thin tracking-wide">Đăng ký</div>
        </div>
      </div>
    </div>
  );
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
            removeCookie("current-user-avatar");
            removeCookie("current-user-shortcut");
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
      <Popover
        align={{
          offset: [7, 10],
        }}
        placement="bottomRight"
        content={checkIsLogIn ? content : signin}
        trigger="click"
      >
        <img
          className="cursor-pointer w-[24px] h-[24px] rounded-full"
          src={
            cookies["current-user-avatar"]
              ? cookies["current-user-avatar"]
              : IconAccount
          }
          alt="IconAccount"
        />
      </Popover> 
  );
}

export default Component;
