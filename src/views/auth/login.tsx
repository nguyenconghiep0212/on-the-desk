import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Button, Input, message } from "antd";
import "./index.scss";
import { useCookies } from "react-cookie";

// COMPONENT
import Logo from "assests/landing/footer_banner.svg";
import IconAccount from "assests/icon/ic-account.svg";
import Footer from "../../components/footer/index.tsx";
import { Icon } from "@iconify/react";

// IMAGE
import Hero1_banner from "assests/landing/hero_1.svg";
import LoginBlurFiller from "assests/login/login_blur_background_filler.png";
import IcMail from "assests/login/ic-mail.svg";
import IcAccount from "assests/login/ic-account.svg";
import IcArrowLeft from "assests/icon/ic-arrow-left.svg";
import IcLock from "assests/login/ic-lock.svg";
import LogoGoogle from "assests/login/logo_google.svg";

// API
import { signIn, googleSignIn, signUp, getUserProfileByToken } from "../../api/index.ts";
import { AUTH_FORM } from "../../interface/auth.ts";
import { normalizeVietnamese } from "../../helper/formatString.ts";
function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [cookie, setCookie] = useCookies([
    "auth-token",
    "auth-id", 
    "current-user-shortcut",
    "current-user-avatar",
  ]);
  const [checkPassword, setCheckPassword] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginCred] = useState<AUTH_FORM>({
    name: "",
    username: "",
    password: "",
  });
  const [validateSignUpPassword, setValidateSignUpPassword] =
    useState<Nullable<Boolean>>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function returnToHomePage() {
    navigate("/");
  }

  async function handleSignUp() {
    try {
      const params = loginCred;
      params.shortcut = normalizeVietnamese(
        loginCred.name.replaceAll(" ", "-")
      );
      if (validateSignUpPassword) {
        const res = await signUp(params);
        if (res) {
          if (res.code === 200) {
            setCookie("auth-token", res.data.token);
            setCookie("auth-id", res.data.id);
            await getUserProfile();
            navigate(-1);
          } else {
            messageApi.open({
              type: "error",
              content: res.message,
            });
          }
        } else {
          messageApi.open({
            type: "error",
            content:
              "Tài khoản không hợp lệ, vui lòng kiểm tra lại thông tin !",
          });
        }
      }
    } catch (e) {
      messageApi.open({
        type: "error",
        content: "Tài khoản không hợp lệ, vui lòng kiểm tra lại thông tin !",
      });
      console.error("Lỗi signup:", e);
    }
  }

  async function handleLogin() {
    try {
      const { name, ...params } = loginCred;
      const res = await signIn(params);
      if (res) {
        setCookie("auth-token", res.data.token);
        setCookie("auth-id", res.data.id);
        await getUserProfile();
      } else {
        setCheckPassword(false);
      }
    } catch (e: any) {
      setCheckPassword(false);
      console.error("Lỗi login:", e);
      messageApi.open({
        type: "error",
        content: "Tên tài khoản hoặc mật khẩu không đúng!",
      });
    }
  }
  async function handleGoogleSignIn(token: string) {
    const res = await googleSignIn(token);
    if (res) {
      setCookie("auth-token", res.data.token);
      setCookie("auth-id", res.data.id);
      await getUserProfile();
    }
  }
  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleGoogleSignIn(tokenResponse.access_token);
    },
    onError: (codeResponse) => {
      console.error("Lỗi email:", codeResponse);
      messageApi.open({
        type: "error",
        content: "Email không hợp lệ",
      });
    },
  });

  async function getUserProfile() {
    try {
      const res = await getUserProfileByToken();
      if (res) {
        console.log("set current user cookie", res.data);
        setCookie("current-user-shortcut", res.data.shortcut);
        setCookie("current-user-avatar", res.data.avatar);
         navigate(-1);
      }
    } catch (e) {
      console.error("lỗi lấy user profile:", e);
    }
  }
  useEffect(() => {}, [checkPassword, isSignUp]);
  useEffect(() => {
    console.log(cookie);
  }, [cookie]);
  useEffect(() => {
    if (searchParams.get("signup")) {
      setIsSignUp(true);
    }
  }, []);
  const loginForm = () => {
    return (
      <div className="h-full w-full space-y-9 mt-9 login-form-bg px-9 py-[105px]">
        <div className="space-y-4">
          {isSignUp && (
            <Input
              prefix={
                <div className="flex justify-center w-6">
                  <img src={IcAccount} alt="username" />
                </div>
              }
              placeholder="Họ tên"
              onChange={(e) => {
                loginCred.name = e.target.value;
              }}
            />
          )}
          <Input
            prefix={<img src={IcMail} alt="username" />}
            placeholder="Email"
            onChange={(e) => {
              loginCred.username = e.target.value;
            }}
            onPressEnter={() => {
              handleLogin();
            }}
          />
          <Input.Password
            prefix={<img src={IcLock} alt="password" />}
            placeholder="Mật khẩu"
            onChange={(e) => {
              loginCred.password = e.target.value;
            }}
            onPressEnter={() => {
              handleLogin();
            }}
          />
          {isSignUp && (
            <Input.Password
              prefix={<img src={IcLock} alt="password" />}
              placeholder="Xác nhận mật khẩu"
              onBlur={(e) => {
                if (loginCred.password !== e.target.value) {
                  setValidateSignUpPassword(false);
                } else {
                  setValidateSignUpPassword(true);
                }
              }}
            />
          )}
          <div className="flex text-[17px] xl:text-[18px] justify-between">
            {isSignUp ? (
              validateSignUpPassword === false && (
                <span className="flex items-center ">
                  <Icon className="text-[#EB5757] mb-[1px] mr-1" icon="ph:x" />
                  Mật khẩu chưa khớp
                </span>
              )
            ) : checkPassword ? (
              <div />
            ) : (
              <span className="flex items-center ">
                <Icon className="text-[#EB5757] mb-[1px] mr-1" icon="ph:x" />
                Mật khẩu sai
              </span>
            )}

            {isSignUp || (
              <span className="text-[17px] xl:text-[18px] italic font-semibold">
                Quên mật khẩu?
              </span>
            )}
          </div>
        </div>
        <div className="space-y-[18px]">
          <Button
            className="w-full font-semibold text-white gradient_btn !shadow-none"
            onClick={() => {
              if (isSignUp) {
                handleSignUp();
              } else {
                handleLogin();
              }
            }}
          >
            {isSignUp ? "Đăng ký" : "Đăng nhập"}
          </Button>
          <Button
            className=" !bg-white text-[#333] font-semibold w-full !shadow-none"
            onClick={() => {
              handleLoginWithGoogle();
            }}
          >
            <div className="flex items-center justify-center space-x-2">
              <img src={LogoGoogle} alt="LogoGoogle" />
              <span className="text-black <2xs:text-[10px]">
                Đăng nhập bằng Google
              </span>
            </div>
          </Button>
        </div>
        {isSignUp ? (
          <div className="flex justify-center w-full space-x-1">
            <div>Bạn đã có tài khoản?</div>
            <div
              className="italic font-semibold cursor-pointer"
              onClick={() => setIsSignUp(false)}
            >
              Đăng nhập
            </div>
          </div>
        ) : (
          <div className="flex justify-center w-full space-x-1">
            <div>Bạn chưa có tài khoản?</div>
            <div
              className="italic font-semibold cursor-pointer"
              onClick={() => setIsSignUp(true)}
            >
              Đăng ký
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-auto bg-[#1E2530] pt-[22px] 2xl:px-[120px] 3xl:px-[240px] lg:px-[60px] md:px-[40px] px-5  ">
      {contextHolder}
      {/* HEADER */}
      <div className="flex-[0 0 auto] hidden lg:block">
        <div className="flex justify-between ">
          <img
            src={Logo}
            alt="Logo"
            className="cursor-pointer"
            onClick={() => {
              returnToHomePage();
            }}
          />
          <img
            className="text-xl cursor-pointer menu-bg-activated"
            src={IconAccount}
            alt="IconAccount"
          />
        </div>
      </div>

      <div className="block lg:hidden">
        <img
          className="cursor-pointer"
          src={IcArrowLeft}
          alt="IcArrowLeft"
          onClick={() => {
            returnToHomePage();
          }}
        />
      </div>
      {/*  */}

      <div className="flex-auto">
        <div className="flex items-center justify-center w-full h-full">
          {/* >768PX */}
          <div className="hidden w-full grid-cols-12 gap-5 lg:grid">
            {/* LEFT */}
            <div className="flex flex-col justify-center col-span-7">
              <div className="">
                <img src={Hero1_banner} alt="LOGO" />
              </div>
              <div className="flex flex-col items-center space-x-2 space-y-1 italic mobile:items-center md:flex-row 2xl:text-xl">
                <div className="text-xl font-light text-white">Everythinks</div>
                <div className="text-xl font-bold text-primary-blue-medium ">
                  On the Desk
                </div>
              </div>
              <div className="text-sm text-white">
                Thẻ thông minh hàng đầu Việt Nam kết nối và tối ưu cho từng cá
                nhân và doanh nghiệp một cách nhanh chóng dễ dàng.
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative col-span-5 overflow-x-visible">
              <div className="absolute w-[130%] h-[120%] translate-x-24 -translate-y-10 right-0 top-0 z-[2]">
                <img
                  className="w-full h-full"
                  alt="LoginBlurFiller"
                  src={LoginBlurFiller}
                />
              </div>
              <div className="relative  flex flex-col h-full z-[5] items-end text-white ">
                <div className="text-2xl font-bold opacity-50 track whitespace-nowrap">
                  Create your own life
                </div>
                <div className="flex items-end space-x-2 opacity-50 whitespace-nowrap">
                  <div className="mb-2 text-lg">with</div>
                  <div className="text-2xl font-bold ">your own style</div>
                </div>
                {loginForm()}
              </div>
            </div>
          </div>

          {/* <768PX */}
          <div className="flex md:px-[144px] lg:hidden w-full">
            <div className="relative w-full overflow-x-visible">
              <div className="absolute w-[130%] h-[150%] translate-x-1/4 -translate-y-20 right-0 top-0 z-[2]">
                <img
                  className="w-full h-full"
                  alt="LoginBlurFiller"
                  src={LoginBlurFiller}
                />
              </div>

              <div className="relative flex flex-col h-full z-[5] items-end text-white ">
                <div className="text-2xl <sm:text-xl <xs:text-lg <3xs:text-base font-bold text-end	opacity-50 whitespace-nowrap">
                  Create your own life
                </div>
                <div className="flex items-end space-x-2 opacity-50 ">
                  <div className="<2xs:text-[12px] text-lg <xs:text-sm mb-2 <sm:mb-1">
                    with
                  </div>
                  <div className="text-2xl <sm:text-xl <xs:text-lg <3xs:text-base font-bold text-end whitespace-nowrap">
                    your own style
                  </div>
                </div>
                {loginForm()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-[0 0 auto] ">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
