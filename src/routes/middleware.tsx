import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLogin } from "../store/root.ts";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Component() {
  const [messageApi, contextHolder] = message.useMessage();
  let location = useLocation();
  const navigate = useNavigate();
  const [, setIsLogin] = useRecoilState(isLogin);
  const [cookies] = useCookies(["auth-id"]);

  function handleCheckAuth() {
    const restrictedPath = ["/admin"];
    if (restrictedPath.includes(location.pathname)) {
      if (process.env.REACT_APP_ADMIN_ID !== cookies["auth-id"]) {
        messageApi.open({
          type: "error",
          content: "Bạn không có quyền vào trang này!",
        });
        navigate("/");
      }
    }
  }

  function checkIsLogIn() {
    if (cookies["auth-token"]) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }

  useEffect(() => {
    checkIsLogIn();
    handleCheckAuth();
  }, [location]);
  return (
    <>
      {contextHolder}
      <Outlet />
    </>
  );
}

export default Component;
