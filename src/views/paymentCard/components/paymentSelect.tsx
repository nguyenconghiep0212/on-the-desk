import { Icon } from "@iconify/react";
import { Button } from "antd";
import BorderedDiv from "components/borderedDiv";
import { handleCaptureClick, handleShare } from "helper/downloadDivAsImg";
import React, { useState } from "react";
import VNPayIcon from "assests/card/VNPay.svg";
import Logo from "assests/landing/logo.svg";
import QR from "components/qr/index";

function Component({
  QRData,
  genTransferQR,
}: {
  QRData: any;
  genTransferQR: Function;
}) {
  const [optionsPay, setOptionsPay] = useState([
    {
      label: "VNPay QR",
      value: "vn_pay",
      icon: VNPayIcon,
      isSelected: true,
    },
    {
      label: "Chuyển khoản trực tiếp",
      value: "bank_transfer",
      icon: Logo,
      isSelected: false,
    },
  ]);
  const [showOptionsPay, setShowOptionsPay] = useState(false);

  const action = (
    <div className="flex justify-center space-x-3">
      <Button
        className="!border !border-solid !border-white bg-[#ffffff4d] !shadow-none"
        onClick={() => {
          handleCaptureClick({
            selector: ".DownloadQR",
            fileName: "OnTheDeskQR.png",
          });
        }}
      >
        <Icon className="h-[18px] w-[18px]" icon="tabler:download" />
      </Button>
      <Button
        className="!border !border-solid !border-white bg-[#ffffff4d] !shadow-none"
        onClick={() => {
          handleShare(".DownloadQR");
        }}
      >
        <Icon className="h-[18px] w-[18px]" icon="uil:share" />
      </Button>
    </div>
  );
  const slot = (
    <div>
      <div className="flex items-center justify-between">
        <span className="ml-2 text-[12px] font-semibold text-white lg:text-sm">
          Phương thức thanh toán
        </span>
        <Icon className="h-6 w-6 text-[#F2994A]" icon="ph:info" />
      </div>
      <div className="mt-[18px] transition-all duration-300">
        {optionsPay
          .filter((e) => {
            if (showOptionsPay) {
              return e;
            } else {
              if (e.isSelected) {
                return e;
              }
            }
          })
          .map((e, i) => (
            <div
              key={i}
              className="flex cursor-pointer items-center  justify-between rounded-lg bg-[#151B23] px-2 py-1"
              onClick={() => {
                if (e.isSelected) {
                  setShowOptionsPay(!showOptionsPay);
                } else {
                  if (e.value === "bank_transfer") {
                    genTransferQR();
                  }
                  optionsPay.forEach((f) => (f.isSelected = false));
                  e.isSelected = true;
                  setOptionsPay([...optionsPay]);
                  setShowOptionsPay(false);
                }
              }}
            >
              <div className="space-x-1">
                <img className="w-4 h-4" src={e.icon} alt="icon" />
                <span className="text-[12px] text-white opacity-60">
                  {e.label}
                </span>
              </div>
              {e.isSelected ? (
                <Icon
                  className="text-primary-blue-medium"
                  icon="tabler:check"
                />
              ) : (
                <></>
              )}
            </div>
          ))}
      </div>

      {optionsPay.find((e) => e.isSelected)?.value === "bank_transfer" ? (
        <div className="flex justify-center">
          <div className="DownloadQR w-min">
            <QR QRData={QRData} action={action} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
  return <BorderedDiv slot={slot} background={null} />;
}

export default Component;
