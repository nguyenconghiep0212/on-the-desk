import React, { useEffect, useState } from "react";
import SaveToContact from "assests/portfolio/save_to_contact.svg";
import { EditDnD, onOpenContact } from "./dragAndDrop";
import { Icon } from "@iconify/react";
import { getBase64FromUrl } from "helper/convertToBase64";
import { generateBankQR } from "api";
import { Button, Modal } from "antd";
import { GEN_QR } from "interface/card";

import IcAccount from "assests/icon/ic-account-blue.svg";
import IcCard from "assests/icon/ic-card-blue.svg";
import uuid from "react-uuid";

function Contact({ data, userInfo, isEdit }) {
  console.log(data);
  const [dndItems, setDndItems] = useState(
    data.map((e) => {
      return { ...e, id: uuid() };
    })
  );
  const [QRbase64, setQRbase64] = useState({
    base64: "",
    bankNo: "",
    bankName: "",
  });
  const [visibleQR, setVisibleQR] = useState(false);

  async function generateVCF() {
    const vcard = {
      str_vcard: "BEGIN:VCARD\nVERSION:3.0\n",
      str_photo: `\nPHOTO;TYPE=JPEG;ENCODING=b:[${getBase64FromUrl(
        userInfo.avatar
      )}]`,
      str_fullname: `\nFN:${userInfo.name}`,
      str_phone_work:
        "\nTEL;TYPE=home,voice;VALUE=uri:" +
        userInfo.contacts.find((e) => e.platformKey === "phone").contactValue,
      str_end: "\nEND:VCARD",
      str_personal_website: `\nURL:https://onthedesk.vn/${userInfo.shortcut}`,
      str_url: userInfo.contacts
        .filter(
          (e) => e.platformKey !== "phone" && !e.platformKey.includes("bank")
        )
        .map((e) => `\nURL:${e.contactValue}`),
      str_banking: userInfo.contacts
        .filter((e) => e.platformKey.includes("bank"))
        .map((e) => `\nURL:${e.platformName}|${e.contactValue}`),
      build_address: function () {
        var org_street = "phung khoang",
          org_city = "ha noi",
          org_region = "ha noi",
          org_post = "00000",
          org_country = "VN";
        vcard.str_vcard +=
          "\nADR;TYPE=work:;;" +
          org_street +
          ";" +
          org_city +
          ";" +
          org_region +
          ";" +
          org_post +
          ";" +
          org_country;
      },
      save: function () {
        console.log(vcard.str_url);
        vcard.str_vcard += vcard.str_fullname;
        vcard.str_vcard += vcard.str_phone_work;
        vcard.str_vcard += vcard.str_photo;
        // vcard.build_address();
        vcard.str_vcard += vcard.str_personal_website;
        vcard.str_vcard += vcard.str_url.join("\n");
        vcard.str_vcard += vcard.str_banking.join("\n");
        vcard.str_vcard += vcard.str_end;
        console.log(vcard);
      },
    };
    vcard.save();
    let download = (content, filename) => {
      let uriContent = URL.createObjectURL(
        new Blob([content], { type: "text/plain" })
      );
      let link = document.createElement("a");
      link.setAttribute("href", uriContent);
      link.setAttribute("download", filename);
      let event = new MouseEvent("click");
      link.dispatchEvent(event);
    };
    download(vcard.str_vcard, "card.vcf");
  }

  async function genQR(data) {
    const params: GEN_QR = {
      accountNo: data.url.split("|")[1],
      accountName: data.url.split("|")[0],
      acqId: "970422", // MB BANK, check https://api.vietqr.io/v2/banksto get bank list
      template: "compact",
    };
    const res = await generateBankQR(params);
    if (res) {
      setVisibleQR(true);
      setQRbase64({
        bankNo: data.url.split("|")[1],
        bankName: data.url.split("|")[0],
        base64: res.data.qrDataURL,
      });
      console.log(res);
    }
  }

  function saveContact() {
    return (
      <div
        className="flex items-center justify-start w-full cursor-pointer h-9"
        onClick={() => {
          generateVCF();
        }}
      >
        <div className="bg-[#d6d6cc] flex items-center justify-center overflow-clip w-10 h-[inherit] rounded-tl-md rounded-bl-md">
          <img
            src={SaveToContact}
            alt="platform logo"
            className="w-full rounded-tl-md rounded-bl-md"
          />
        </div>
        <div className="flex bg-[#908D84] items-center justify-start w-[calc(100%-40px)] h-[inherit] px-4 rounded-tr-md rounded-br-md">
          <span className="text-white truncate">Lưu danh bạ</span>
        </div>
      </div>
    );
  }
  function QR() {
    return (
      <div>
        <Modal
          className="modalFullScreen"
          open={visibleQR}
          closeIcon={false}
          footer={null}
          afterClose={() => {
            setVisibleQR(false);
          }}
        >
          <div className="relative flex items-center justify-center h-full space-y-[18px] backdrop-blur">
            <div
              className="absolute cursor-pointer top-5 right-5"
              onClick={() => setVisibleQR(false)}
            >
              <Icon className="w-5 h-5 text-white" icon="tabler:x" />
            </div>
            <div className="flex flex-col mx-6 w-max space-y-[18px]">
              <img src={QRbase64.base64} alt="QR" className="rounded-md" />
              <div className="space-y-3">
                <div className="flex justify-start space-x-2">
                  <img className="w-6 h-6" src={IcAccount} alt="account" />
                  <span className="text-white">{QRbase64.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-2 ">
                    <img className="w-6 h-6" src={IcCard} alt="card" />
                    <span id="BankNo" className="text-white">
                      {QRbase64.bankNo}
                    </span>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(QRbase64.bankNo);
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" icon="tabler:copy" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-3">
                <Button className="!shadow-none bg-[#ffffff4d] !border !border-solid !border-white">
                  <Icon className="w-[18px] h-[18px]" icon="tabler:download" />
                </Button>
                <Button className="!shadow-none bg-[#ffffff4d] !border !border-solid !border-white">
                  <Icon className="w-[18px] h-[18px]" icon="uil:share" />
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  return (
    <div className="my-3">
      <div className="">
        {isEdit ? (
          <div className="space-y-2">
            <div className="border border-white border-dashed rounded-lg p-[6px] text-white flex items-center space-x-3 cursor-pointer">
              <Icon icon="tabler:plus" className="w-6 h-6 " />
              <span className="text-[12px] tracking-wide">Thêm mới</span>
            </div>
            {EditDnD({ dndItems, setDndItems })}
            {saveContact()}
          </div>
        ) : (
          <div className="grid <xs:grid-cols-1 grid-cols-2 gap-2 3xl:grid-cols-5 lg:grid-cols-3 ">
            {data.map((e, index) => (
              <div
                key={index}
                className="flex items-center justify-start w-full cursor-pointer h-9"
                onClick={() => {
                  if (e.platform.includes("bank")) {
                    genQR(e);
                  } else {
                    onOpenContact(e.url);
                  }
                }}
              >
                <div
                  className={`flex items-center justify-center w-10 h-[inherit] rounded-tl-md rounded-bl-md ${
                    e.keyContact === "phone" ? "bg-[#01B634]" : "bg-white"
                  }`}
                >
                  <img
                    src={`https://cdn.onthedesk.vn${e.linkIcon}`}
                    alt="platform logo"
                  />
                </div>
                <div
                  className="flex items-center justify-start w-[calc(100%-40px)] h-[inherit] px-4 rounded-tr-md rounded-br-md"
                  style={{
                    backgroundColor: `${e.backgoundColor}`,
                  }}
                >
                  <span className="text-white truncate">{e.nameContact}</span>
                </div>
              </div>
            ))}
            {saveContact()}
          </div>
        )}
      </div>
      {QR()}
    </div>
  );
}

export default Contact;
