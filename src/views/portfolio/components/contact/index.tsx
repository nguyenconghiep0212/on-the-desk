import React, { useEffect, useState } from "react";
import SaveToContact from "assests/portfolio/save_to_contact.svg";
import { Icon } from "@iconify/react";
import { getBase64FromUrl } from "helper/convertToBase64";
import { generateBankQR } from "api";
import { Button, Input, Modal, Tooltip, message } from "antd";
import { GEN_QR } from "interface/card";
import IcAccount from "assests/icon/ic-account-blue.svg";
import "./style.scss";

// COMPONENT
import DownloadQR from "components/qr";
import EditDnD from "./dragAndDrop";
import SelectContact from "./selectContact.tsx";
import Contact from "components/contact/index.tsx";
import { handleCaptureClick, handleShare } from "helper/downloadDivAsImg.ts";
import { useRecoilState } from "recoil";
import {
  contactsData,
  portfolioEdit,
  userInfoPortfolio,
} from "store/portfolio.ts";

enum QR_TEMPLATE {
  COMPACT2 = "compact2",
  COMPACT = "compact",
  QRONLY = "qr_only",
  FULL = "print",
}

function Component({ data }) {
  const [isEdit] = useRecoilState(portfolioEdit);
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo] = useRecoilState(userInfoPortfolio);
  const [bankList, setBankList] = useState([]);
  const [viewTransferInfo, setViewTransferInfo] = useState(false);

  // DnD State
  const [dndItems, setDndItems] = useRecoilState(contactsData);

  const [QRbase64, setQRbase64] = useState({
    base64: "",
    bankNo: "",
    bankName: "",
    bankBin: "",
    transferAmount: null,
    transferDescription: "",
  });
  const [visibleQR, setVisibleQR] = useState(false);

  function getContactData() {
    const ar: any = [];
    data?.forEach((e) => {
      if (ar.map((f: any) => f.nameContact).includes(e.nameContact)) {
        const obj: any = ar.find((f: any) => f.nameContact === e.nameContact);
        obj.children.push({ ...e });
      } else {
        const temp = { ...e };
        temp.children = [e];
        ar.push(temp);
      }
    });
    setDndItems(ar);
  }

  async function generateVCF() {
    const vcard = {
      str_vcard: "BEGIN:VCARD\nVERSION:3.0\n",
      str_photo: `\nPHOTO;TYPE=JPEG;ENCODING=b:[${getBase64FromUrl(
        userInfo.avatar,
      )}]`,
      str_fullname: `\nFN:${userInfo.name}`,
      str_phone_work:
        "\nTEL;TYPE=home,voice;VALUE=uri:" +
        userInfo.contacts.find((e) => e.typeContact === "phone")?.infoDetail,
      str_end: "\nEND:VCARD",
      str_personal_website: `\nURL:https://onthedesk.vn/${userInfo.shortcut}`,
      str_url: userInfo.contacts
        .filter((e) => e.typeContact === "social")
        .map((e) => `\nURL:${e.infoDetail}`),
      str_banking: userInfo.contacts
        .filter((e) => e.typeContact === "bank")
        .map((e) => `\nURL:${e.nameContact}|${e.infoDetail}`),
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
        vcard.str_vcard += vcard.str_fullname;
        vcard.str_vcard += vcard.str_phone_work;
        vcard.str_vcard += vcard.str_photo;
        // vcard.build_address();
        vcard.str_vcard += vcard.str_personal_website;
        vcard.str_vcard += vcard.str_url.join("\n");
        vcard.str_vcard += vcard.str_banking.join("\n");
        vcard.str_vcard += vcard.str_end;
      },
    };
    vcard.save();
    let download = (content, filename) => {
      let uriContent = URL.createObjectURL(
        new Blob([content], { type: "text/plain" }),
      );
      let link = document.createElement("a");
      link.setAttribute("href", uriContent);
      link.setAttribute("download", filename);
      let event = new MouseEvent("click");
      link.dispatchEvent(event);
    };
    download(vcard.str_vcard, "card.vcf");
  }
  function onOpenContact(data) {
    if (data.infoDetail) {
      window.open(
        data.typeContact === "phone"
          ? `tel:${data.infoDetail}`
          : data.infoDetail,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      message.error("Đường dẫn không tồn tại");
    }
  }
  async function genQR(data) {
    if (data.infoDetail) {
      const params: GEN_QR = {
        accountNo: data.infoDetail.split("|")[1],
        accountName: data.infoDetail.split("|")[0],
        acqId: data.keyContact,
        template: QR_TEMPLATE.COMPACT,
      };
      const res = await generateBankQR(params);
      if (res) {
        setVisibleQR(true);
        setQRbase64({
          bankNo: data.infoDetail.split("|")[1],
          bankName: data.infoDetail.split("|")[0],
          base64: res.data.qrDataURL,
          bankBin: data.keyContact,
          transferAmount: null,
          transferDescription: "",
        });
      }
    } else {
      message.error("Đường dẫn không tồn tại");
    }
  }

  async function genTransferQR() {
    const params: GEN_QR = {
      accountNo: QRbase64.bankNo,
      accountName: QRbase64.bankName,
      acqId: QRbase64.bankBin,
      template: QR_TEMPLATE.COMPACT,
      amount: QRbase64.transferAmount,
      addInfo: QRbase64.transferDescription,
    };
    const res = await generateBankQR(params);
    if (res) {
      setQRbase64({ ...QRbase64, base64: res.data.qrDataURL });
    }
  }

  useEffect(() => {
    getContactData();
  }, []);
  useEffect(() => {
    console.log(dndItems.length);
  }, [QRbase64, dndItems, bankList]);
  function SaveContact() {
    return (
      <div
        className="flex items-center justify-start w-full cursor-pointer h-9"
        onClick={() => {
          generateVCF();
        }}
      >
        <div className="flex h-[inherit] w-10 items-center justify-center overflow-clip rounded-bl-md rounded-tl-md bg-[#d6d6cc]">
          <img
            src={SaveToContact}
            alt="platform logo"
            className="w-full rounded-bl-md rounded-tl-md"
          />
        </div>
        <div className="flex h-[inherit] w-[calc(100%-40px)] items-center justify-start rounded-br-md rounded-tr-md bg-[#908D84] px-4">
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
          <div className="relative flex h-full items-center justify-center space-y-[18px] backdrop-blur">
            <div
              className="absolute cursor-pointer right-5 top-5"
              onClick={() => setVisibleQR(false)}
            >
              <Icon className="w-5 h-5 text-white" icon="tabler:x" />
            </div>
            <div className="mx-6 flex w-max flex-col space-y-[18px]">
              <img src={QRbase64.base64} alt="QR" className="rounded-md" />
              <div className="space-y-3">
                <div className="flex justify-start space-x-2">
                  <img className="w-6 h-6" src={IcAccount} alt="account" />
                  <span className="text-white">{QRbase64.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-2 ">
                    <Icon
                      className="w-6 h-6 text-primary-blue-medium"
                      icon="solar:card-linear"
                    />
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
                {(userInfo.shortcut === "@admin" ||
                  userInfo.shortcut === "hiep-nguyen-cong") && (
                  <div>
                    {viewTransferInfo && (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <div className="flex w-full pr-2 space-x-2">
                            <Icon
                              className="w-6 h-6 text-primary-blue-medium"
                              icon="ph:info-bold"
                            />
                            <Input
                              placeholder="Nội dung chuyển khoản"
                              id="transferDes"
                              bordered={false}
                              value={QRbase64.transferDescription}
                              className="p-0 text-white"
                              onChange={(e) =>
                                setQRbase64({
                                  ...QRbase64,
                                  transferDescription: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                QRbase64.transferDescription,
                              );
                            }}
                          >
                            <Icon
                              className="w-6 h-6 text-white"
                              icon="tabler:copy"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex w-full pr-2 space-x-2 ">
                            <Icon
                              className="w-6 h-6 text-primary-blue-medium"
                              icon="tabler:report-money"
                            />
                            <Input
                              placeholder="Số tiền chuyển khoản"
                              id="transferAmount"
                              value={QRbase64.transferAmount}
                              bordered={false}
                              className="w-full p-0 text-white"
                              onChange={(e) => {
                                if (
                                  Number(e.target.value) ||
                                  e.target.value === ""
                                ) {
                                  setQRbase64({
                                    ...QRbase64,
                                    transferAmount:
                                      e.target.value === ""
                                        ? null
                                        : Number(e.target.value),
                                  });
                                } else {
                                  messageApi.open({
                                    type: "warning",
                                    content: "Vui lòng nhập số",
                                  });
                                }
                              }}
                            />
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                QRbase64.transferAmount,
                              );
                            }}
                          >
                            <Icon
                              className="w-6 h-6 text-white"
                              icon="tabler:copy"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col items-center space-y-[18px]">
                          <div
                            className="cursor-pointer rounded-lg border-[1px] border-solid border-white bg-[#ffffff2f] px-[9px] py-[6px] font-semibold text-white before:bg-[#303A49]"
                            onClick={() => {
                              genTransferQR();
                            }}
                          >
                            Tạo QR tự động điền
                          </div>
                          <div
                            className="flex items-center space-x-1 rounded-lg bg-[#1E2530] px-[9px] py-[6px] font-semibold text-primary-blue-medium"
                            style={{
                              boxShadow:
                                "2px 2px 2px 0px rgba(0, 25, 64, 0.50) inset, -2px -2px 2px 0px rgba(60, 173, 255, 0.25) inset",
                            }}
                          >
                            <Icon
                              className="h-[18px] w-[18px]"
                              icon="tabler:check"
                            />
                            <span>Tạo giao dịch chuyển khoản</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {!viewTransferInfo && (
                      <div className="flex justify-center mt-4">
                        <Button
                          className="gradient_btn !shadow-none"
                          onClick={() => setViewTransferInfo(true)}
                        >
                          Tạo giao dịch chuyển khoản
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

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
            </div>
            <div className="absolute bottom-[99999px]">
              <div className="DownloadQR">
                <DownloadQR QRData={QRbase64} />
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
            <SelectContact />
            <EditDnD />
            <SaveContact />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 <xs:grid-cols-1 3xl:grid-cols-5 ">
            {dndItems.map((e, index) => {
              return e.children.length > 1 ? (
                <Tooltip
                  key={index}
                  placement="bottom"
                  arrow={false}
                  trigger="click"
                  fresh={true}
                  title={
                    <div
                      className={`contact-tooltip space-y-5 lg:!w-[20vw] <xs:w-[90vw] xs:w-[50vw]`}
                    >
                      {e.children.map((f, j) => (
                        <div
                          key={j}
                          className="flex items-center px-3 space-x-3 cursor-pointer"
                          onClick={() => {
                            if (e.typeContact === "bank") {
                              genQR(f);
                              setBankList(e.children);
                            } else {
                              onOpenContact(f);
                            }
                          }}
                        >
                          <Icon
                            className="text-lg text-primary-blue-medium"
                            icon="solar:arrow-right-linear"
                          />
                          <div>{f.nameContact}</div>
                        </div>
                      ))}
                    </div>
                  }
                >
                  <div key={index}>
                    <Contact contact={e} event={() => {}} isMultiple={true} />
                  </div>
                </Tooltip>
              ) : (
                <Contact
                  contact={e}
                  event={() => {
                    if (e.typeContact === "bank") {
                      genQR(e.children[0]);
                    } else {
                      onOpenContact(e.children[0]);
                    }
                  }}
                  isMultiple={false}
                />
              );
            })}
            <SaveContact />
          </div>
        )}
      </div>
      {QR()}
      {contextHolder}
    </div>
  );
}

export default Component;
