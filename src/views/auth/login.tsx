import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { Button, Input } from "antd";
// import jwt_decode from "jwt-decode";
import "./index.scss";
import { useCookies } from 'react-cookie';

// COMPONENT
import Logo from "assests/landing/footer_banner.svg";
import IconAccount from "assests/icon/ic-account.svg";
import Footer from "views/footer/index";
import { Icon } from "@iconify/react";

// IMAGE
import Hero1_banner from "assests/landing/hero_1.svg";
import LoginBlurFiller from "assests/login/login_blur_background_filler.png";
import IcMail from "assests/login/ic-mail.svg";
import IcArrowLeft from "assests/icon/ic-arrow-left.svg";
import IcLock from "assests/login/ic-lock.svg";
import LogoGoogle from "assests/login/logo_google.svg";

// API
import {signIn} from 'api/index'
import { LOGIN } from "interface/auth";
function Login() {
  const [checkPassword, setCheckPassword] = useState(false);
  const [cookies, setCookie] = useCookies(['auth-token']);
  const [loginCred ] = useState<LOGIN>({username:'', password:''})
  const navigate = useNavigate();
  function returnToHomePage() {
    navigate("/");
  }

  async function handleLogin(){
    const res = await signIn(loginCred)
    if(res){
      if(res.code === 200){
        setCookie('auth-token',res.data.token)
        navigate("/");
     
      }else{
      setCheckPassword(true)

      }
    }else{
      setCheckPassword(true)
    }
  }

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // decodeJWT(tokenResponse )
      console.log("tokenResponse", tokenResponse);
    },
    onError: (codeResponse) => {
      console.log("Thất bại:", codeResponse);
    },
  });

  // function decodeJWT(credentialEncode){
  //   console.log('credentialEncode',credentialEncode)
  //   const credential = jwt_decode(credentialEncode.credential)
  //   console.log('credential',credential)
  // }

  useEffect(() => {}, [checkPassword])
  return (
    <div className="flex flex-col h-full overflow-auto bg-[#1E2530] pt-[22px] 2xl:px-[120px] 3xl:px-[240px] lg:px-[60px] md:px-[40px] px-5  ">
      {/* HEADER */}
      <div className="flex-[0 0 auto] hidden lg:block">
        <div className="flex justify-between  ">
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

      <div className="lg:hidden block">
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
        <div className="flex w-full items-center justify-center h-full">
          {/* >768PX */}
          <div className=" w-full hidden grid-cols-12 gap-5 lg:grid">
            {/* LEFT */}
            <div className="flex flex-col justify-center col-span-7">
              <div className="">
                <img src={Hero1_banner} alt="LOGO" />
              </div>
              <div className="flex flex-col items-center mobile:items-center space-y-1 md:flex-row space-x-2 2xl:text-xl  italic">
                <div className="text-xl font-light text-white">Everythinks</div>
                <div className="text-xl font-bold text-primary-blue-medium  ">
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
                <div className=" text-2xl  font-bold track whitespace-nowrap	opacity-50">
                  Create your own life
                </div>
                <div className="flex items-end space-x-2 opacity-50  whitespace-nowrap">
                  <div className="text-lg mb-2">with</div>
                  <div className=" text-2xl   font-bold">your own style</div>
                </div>
                <div className="h-full w-full space-y-9 mt-9 login-form-bg px-9 py-[105px]">
                  <div className="space-y-4">
                    <Input
                      prefix={<img src={IcMail} alt="username" />}
                      placeholder="Email"
                      onChange={(e) => {loginCred.username = e.target.value}}
                    />
                    <Input.Password
                      prefix={<img src={IcLock} alt="password" />}
                      placeholder="Mật khẩu"
                      onChange={(e) => {loginCred.password = e.target.value}}
                    />
                    <div className="flex text-[17px] xl:text-[18px] justify-between">
                      {checkPassword ? (
                        <span className="flex items-center  ">
                          <Icon
                            className="text-[#EB5757] mb-[1px] mr-1"
                            icon="ph:x"
                          />
                          Mật khẩu sai
                        </span>
                      ) : (
                        <span></span>
                      )}
                      <span className="text-[17px] xl:text-[18px] italic font-semibold">
                        Quên mật khẩu?
                      </span>
                    </div>
                  </div>
                  <div className="space-y-[18px]">
                    <Button className="gradient_btn text-white font-semibold w-full" onClick={() => {handleLogin()}}>
                      Đăng nhập
                    </Button>
                    <Button
                      className=" bg-white text-[#333] font-semibold w-full"
                      onClick={() => {
                        handleLoginWithGoogle();
                      }}
                    >
                      <div className="flex justify-center items-center space-x-2">
                        <img src={LogoGoogle} alt="LogoGoogle" />
                        <span className="text-black">
                          Đăng nhập bằng Google
                        </span>
                      </div>
                    </Button>
                  </div>
                  <div className="flex justify-center w-full space-x-1">
                    <div>Bạn chưa có tài khoản?</div>
                    <div className="italic font-semibold">Đăng ký</div>
                  </div>
                </div>
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
                <div className="flex items-end space-x-2 opacity-50   ">
                  <div className="<2xs:text-[12px] text-lg <xs:text-sm mb-2 <sm:mb-1">
                    with
                  </div>
                  <div className="text-2xl <sm:text-xl <xs:text-lg <3xs:text-base font-bold text-end whitespace-nowrap">
                    your own style
                  </div>
                </div>
                <div className="h-full w-full space-y-9 mt-9 login-form-bg <2xs:py-9 px-5 py-12">
                  <div className="space-y-4">
                    <Input
                      prefix={<img src={IcMail} alt="username" />}
                      placeholder="Email"
                      onChange={(e) => {loginCred.username = e.target.value}}
                    />
                    <Input.Password
                      prefix={<img src={IcLock} alt="password" />}
                      placeholder="Mật khẩu"
                      onChange={(e) => {loginCred.password = e.target.value}}
                    />
                    <div className="flex <xs:text-[12px] text-[18px] xl:text-[18px] justify-between space-x-2">
                      {checkPassword ? (
                        <span className="flex items-center">
                          <Icon
                            className="text-[#EB5757] mb-[1px] mr-1"
                            icon="ph:x"
                          />
                          Mật khẩu sai
                        </span>
                      ) : (
                        <span></span>
                      )}
                      <span className=" <xs:text-[12px] text-[18px] xl:text-[18px] italic font-semibold">
                        Quên mật khẩu?
                      </span>
                    </div>
                  </div>
                  <div className="space-y-[18px]">
                    <Button className="gradient_btn text-white font-semibold w-full" onClick={() => {handleLogin()}}>
                      Đăng nhập
                    </Button>
                    <Button
                      className=" bg-white text-[#333] font-semibold w-full"
                      onClick={() => {
                        handleLoginWithGoogle();
                      }}
                    >
                      <div className="flex justify-center items-center space-x-2 px-[6px]">
                        <img src={LogoGoogle} alt="LogoGoogle" />
                        <span className="text-black <2xs:text-[12px] <3xs:text-[10px]">
                          Đăng nhập bằng Google
                        </span>
                      </div>
                    </Button>
                  </div>
                  <div className="flex  <xs:text-[12px] space-x-1 justify-center w-full">
                    <div>Bạn chưa có tài khoản?</div>
                    <div className="italic font-semibold">Đăng ký</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*     <Button onClick={googleLogout}>Logout</Button> */}
        </div>
      </div>

      <div className="flex-[0 0 auto] ">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
