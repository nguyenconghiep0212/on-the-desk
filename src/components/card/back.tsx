import React, { useEffect } from "react";
// ICON
import DefaultQR from "../../assests/card/default-qr.svg";
import SignalRight from "../../assests/card/signal-right.svg";
import SignalLeft from "../../assests/card/signal-left.svg";
import Banner from "../../assests/card/banner-ext.svg";
import Logo_SVG from "../../assests/landing/logo.svg";
import { QRCode } from "antd";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLogin } from "store/root.ts";
import { useQuery } from "helper/getQuery";

function Component({ card }) {
  const pathParams = useParams();
  const [checkLogin] = useRecoilState(isLogin);
  const query = useQuery("shortcut");

  useEffect(() => {
    console.log(query, "query");
  }, []);
  return (
    <div
      className=" h-[176px] w-[280px] space-y-3 rounded-lg"
      style={
        card.backgroundImage
          ? {
              background: "#091323",
            }
          : {
              background: card.backgroundColor || "#091323",
            }
      }
    >
      <div
        className="relative flex flex-col items-center justify-center w-full h-full rounded-lg"
        style={
          card.backgroundColor && !card.backgroundImage
            ? { background: "rgb(0,0,0,0.39)" }
            : {}
        }
      >
        <div className="absolute left-1/2 top-4 -translate-x-1/2 text-[12px] text-white">
          {card.backText || "Your text here"}
        </div>
        <img
          src={SignalLeft}
          alt="SignalLeft"
          className="absolute left-10 top-1/2 !h-[15%] -translate-y-full"
        />

        {checkLogin ? (
          <QRCode
            className="aspect-square !h-1/2 !w-max"
            errorLevel="H"
            value={
              pathParams.userShortcut
                ? `https://onthedesk.vn/${pathParams.userShortcut}${
                    query ? `/${query}` : ""
                  }`
                : "https://onthedesk.vn/"
            }
            icon={Logo_SVG}
            color="#0083C7"
            bgColor="rgba(0, 0, 0, 0.50)"
          />
        ) : (
          <img src={DefaultQR} alt="DefaultQR" className="!h-1/2" />
        )}
        <img
          src={SignalRight}
          alt="SignalRight"
          className="absolute right-10 top-1/2 !h-[15%] -translate-y-full"
        />
        <div className="absolute text-white bottom-2">
          <div className="text-[6px]">
            Chạm gần điện thoại thông minh của bạn hoặc quét mã QR
          </div>
          <div className="flex items-center justify-center space-x-2 text-[8px]">
            <span>Designed by</span>
            <img src={Banner} alt="banner" className="!h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
