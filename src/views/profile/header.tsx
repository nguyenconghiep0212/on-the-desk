import { Icon } from "@iconify/react";
import { Button, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import IcUpgrade from "assests/icon/ic-upgrade.svg";
import IcMenuLeft from "assests/icon/ic-burger-left.svg";
import BorderedDiv from "components/borderedDiv/index";
import { selectedMenuStore } from "store/profileMenu";
import { useRecoilState } from "recoil";
import Divider from "components/divider";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isLogin } from "store/root.ts";

function Component() {
  const [_, , removeCookie] = useCookies([
    "auth-token",
    "auth-id",
    "current-user-avatar",
    "current-user-shortcut",
  ]);
  const [__, setLogin] = useRecoilState(isLogin);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuStore);
  const [menu, setMenu] = useState([
    {
      name: "Tài khoản",
      key: "accountInfo",
      icon: "bx:user",
      children: [
        { name: "Thông tin tài khoản", key: "accountInfo", selected: false },
        { name: "Quản lý dịch vụ", key: "accountPackage", selected: false },
        { name: "Quản lý thẻ", key: "accountCard", selected: false },
        { name: "Quản lý hồ sơ", key: "accountPortfolio", selected: false },
      ],
      selected: true,
    },
    {
      name: "Thống kê",
      key: "dashboard",
      icon: "bi:bar-chart-fill",
      children: [],
      selected: false,
    },
    {
      name: "Đơn hàng",
      key: "cart",
      icon: "mdi:cart-outline",
      children: [],
      selected: false,
    },
  ]);

  function selectMenu(selectMenu, parentMenu = {}) {
    console.log(selectMenu, parentMenu);
    menu.forEach((e) => {
      if (e.children.length) e.children.forEach((f) => (f.selected = false));
      if (e.selected) e.selected = false;
    });
    selectMenu.selected = true;
    if (Object.keys(parentMenu).length) {
      parentMenu.selected = true;
    }
    if (selectMenu.children?.length) {
      selectMenu.children[0].selected = true;
    }
    setMenu([...menu]);
    setSelectedMenu(selectMenu.key);
  }
  useEffect(() => {
    console.log(selectedMenu, "selectedMenu");
    const temp = menu.find((e) => {
      if (e.children.length) {
        if (e.children.map((f) => f.key).includes(selectedMenu)) {
          return e;
        }
      } else {
        if (e.key === selectedMenu) {
          return e;
        }
      }
    });
    selectMenu(
      temp?.children.length
        ? temp?.children.find((e) => e.key === selectedMenu)
        : temp,
      temp,
    );
  }, [selectedMenu]);
  useEffect(() => {}, [openMenu, menu]);
  return (
    <div
      className="sticky inline-flex items-center justify-between w-full px-5 py-3 backdrop-blur"
      style={{
        background:
          "linear-gradient(180deg, rgba(11, 18, 28, 0.64) 0%, rgba(4, 14, 29, 0.48) 100%)",
      }}
    >
      <img
        className="cursor-pointer"
        src={IcMenuLeft}
        alt="IcMenuLeft"
        onClick={() => {
          setOpenMenu(true);
        }}
      />
      <div>
        <Button className="gradient_btn flex items-center justify-center space-x-1 !shadow-none">
          <img className="h-[18px] w-[18px] " src={IcUpgrade} alt="IcUpgrade" />
          <span className="text-[12px] font-semibold">Nâng cấp</span>
        </Button>
      </div>
      <Drawer
        title={null}
        placement="left"
        closable={false}
        onClose={() => {
          setOpenMenu(false);
        }}
        open={openMenu}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-3">
              <Icon
                className="w-6 h-5 text-white cursor-pointer"
                icon="tabler:x"
                onClick={() => {
                  setOpenMenu(false);
                }}
              />
            </div>
            <div className="space-y-6 text-white">
              {menu.map((e, i) => (
                <div key={i}>
                  <div
                    className={`flex items-center space-x-2 ${
                      e.selected || "opacity-50"
                    } cursor-pointer`}
                    onClick={() => {
                      selectMenu(e);
                    }}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        e.selected && "text-primary-blue-medium"
                      }`}
                      icon={e.icon}
                    />
                    <span
                      className={`font-semibold ${e.selected && "text-white"}`}
                    >
                      {e.name}
                    </span>
                  </div>
                  <div className="ml-[30px] mt-[10px] space-y-3">
                    {e.children.length ? (
                      e.children.map((f, j) => (
                        <div
                          className="cursor-pointer"
                          key={j}
                          onClick={() => {
                            selectMenu(f, e);
                          }}
                        >
                          {f.selected ? (
                            <BorderedDiv
                              slot={<div>{f.name}</div>}
                              style={{
                                borderRadius: "8px ",
                                display: "flex",
                                padding: "6px 12px",
                                alignItems: "center",
                                backdropFilter: "blur(30px)",
                                background:
                                  "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), radial-gradient(89.49% 100% at 50.82% 100%, rgba(50, 173, 230, 0.48) 0%, rgba(57, 57, 57, 0.00) 59.9%, rgba(57, 57, 57, 0.23) 100%), linear-gradient(180deg, rgba(17, 17, 17, 0.60) 0%, rgba(17, 17, 17, 0.80) 100%)",
                              }}
                            />
                          ) : (
                            <div
                              className={`px-3 py-[6px] ${
                                e.selected || "opacity-50"
                              }`}
                            >
                              {f.name}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="space-y-6 font-semibold text-white opacity-80">
            <div className="w-2/3">
              <Divider />
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Icon
                className="w-6 h-6"
                icon="material-symbols:contact-support-outline"
              />
              <span>Hỗ trợ</span>
            </div>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => {
                removeCookie("auth-token");
                removeCookie("auth-id");
                removeCookie("current-user-avatar");
                removeCookie("current-user-shortcut");
                setLogin(false);
                navigate("/login");
              }}
            >
              <Icon className="w-6 h-6" icon="mdi:login" />
              <span>Đăng xuất</span>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Component;
