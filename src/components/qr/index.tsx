import { Icon } from "@iconify/react";
import React, { ReactElement } from "react";
import IcAccount from "assests/icon/ic-account-blue.svg";
import Banner from "assests/landing/footer_banner.svg";
import "./style.scss";
interface QRData {
  base64: string;
  bankName: string;
  bankNo: string;
  transferDescription: string | null;
  transferAmount: number | null;
 
}
function Component({ QRData, action }: { QRData: QRData,  action: ReactElement;}) {
  return (
    <div className="relative flex items-center justify-center p-2 bg-transparent DownloadQR">
      <div className="download-qr-border" />
      <div className="relative flex items-center justify-center space-y-[18px] backdrop-blur p-[18px] w-[252px] bg-[#181d25] rounded-xl download-qr">
        <div className="flex flex-col w-max space-y-[18px]">
          <img src={QRData.base64} alt="QR" className="rounded-md" />
          <div className="space-y-3">
            <div className="flex items-start justify-start space-x-2">
              <img className="w-5 h-5" src={IcAccount} alt="account" />
              <span className="text-white text-[12px]">{QRData.bankName}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-start space-x-2 ">
                <Icon
                  className="w-5 h-5 text-primary-blue-medium"
                  icon="solar:card-linear"
                />
                <span id="BankNo" className="text-white text-[12px]">
                  {QRData.bankNo}
                </span>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(QRData.bankNo);
                }}
              >
                <Icon className="w-5 h-5 text-white" icon="tabler:copy" />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-start w-full pr-2 space-x-2">
                <Icon
                  className="w-5 h-5 min-w-[1.25rem] text-primary-blue-medium"
                  icon="ph:info-bold"
                />
                <span id="transferDes" className="p-0 text-[12px] text-white">
                  {QRData.transferDescription}
                </span>
              </div>
              <div className="cursor-pointer">
                <Icon className="w-5 h-5 text-white" icon="tabler:copy" />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-start w-full pr-2 space-x-2 ">
                <Icon
                  className="w-5 h-5 text-primary-blue-medium"
                  icon="tabler:report-money"
                />
                <span id="transferAmount" className="text-white text-[12px]">
                  {QRData.transferAmount
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  <span className="ml-1">VND</span>
                </span>
              </div>
              <div className="cursor-pointer">
                <Icon className="w-5 h-5 text-white" icon="tabler:copy" />
              </div>
            </div>

            {action}
          </div>

          <div className="flex items-center justify-center space-x-1 bg-transparent">
            <span className="text-[10px] font-semibold text-primary-blue-medium">
              Powered by
            </span>
            <img src={Banner} className="h-[10px]" alt="Banner" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Component;
