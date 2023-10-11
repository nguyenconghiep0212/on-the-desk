import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { Button } from "antd";
// import jwt_decode from "jwt-decode";
import "./index.scss";
// COMPONENT
import Logo from "assests/landing/footer_banner.svg";
import IconAccount from "assests/icon/ic-account.svg";
import Footer from "views/footer/index";
// IMAGE
import Hero1_banner from "assests/landing/hero_1.svg";


function Login() {
  const navigate = useNavigate();
  function returnToHomePage() {
    navigate("/");
  }

  const handleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // decodeJWT(tokenResponse )
      console.log("tokenResponse", tokenResponse);
    },
    onError: (codeResponse) => {
      console.log("Thất bại:", codeResponse);
    },
  });

  function handleRedirectLanding() {}
  // function decodeJWT(credentialEncode){
  //   console.log('credentialEncode',credentialEncode)
  //   const credential = jwt_decode(credentialEncode.credential)
  //   console.log('credential',credential)
  // }
  return (
    <div className="flex flex-col h-full bg-[#1E2530]">
      {/* HEADER */}
      <div className="flex-[0 0 auto]">
        <div className="flex justify-between 2xl:px-[120px] 3xl:px-[240px] lg:px-[60px] md:px-[40px] py-[22px] ">
          <img
            src={Logo}
            alt="Logo"
            className="cursor-pointer"
            onClick={() => {
              returnToHomePage();
            }}
          />
          <img
            className="text-2xl cursor-pointer menu-bg-activated"
            src={IconAccount}
            alt="IconAccount"
          />
        </div>
      </div>
      {/*  */}

      <div className="flex-auto">
        <div className="flex items-center justify-center h-full">
          {/* >768PX */}
          <div className="grid invisible grid-cols-12 gap-5 2xl:px-[120px] md:visible">
            <div className="flex flex-col justify-center col-span-7">
              <div className="">
                <img src={Hero1_banner} alt="LOGO"/>
                <div className="-mt-16 shadow-login-logo" />
              </div>
              <div></div>
            </div>
            <div className="col-span-5">
              <div>
                <span className="text-lg text-white">Everythinks</span>
              </div>
            </div>
          </div>

          {/* <768PX */}
          <div className="visible md:invisible">
            <div>mob</div>
          </div>
          {/* <Button
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </Button>
          <Button onClick={googleLogout}>Logout</Button> */}
        </div>
      </div>

      <div className="flex-[0 0 auto]">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
