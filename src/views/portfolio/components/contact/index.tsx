import React, { useEffect, useState } from "react";
import { platforms, keyToUrl } from "./platforms";
import SaveToContact from "assests/portfolio/save_to_contact.svg";
import { EditDnD, onOpenContact } from "./dragAndDrop";
import { Icon } from "@iconify/react";
// import { getBase64FromUrl } from "helper/formatImage";

function Contact({ data, userInfo, isEdit }) {
  console.log("userInfo", userInfo);
  async function generateVCF() {
    const vcard = {
      str_vcard: "BEGIN:VCARD\nVERSION:3.0\n",
      // str_photo: "PHOTO;ENCODING=BASE64;TYPE=GIF::" + await getBase64FromUrl(userInfo.avatar),
      str_fullname: `\nFN:${userInfo.name}`,
      str_phone_work:
        "\nTEL;TYPE=home,voice;VALUE=uri:" +
        userInfo.contacts.find((e) => e.platformKey === "phone").contactValue,
      str_end: "\nEND:VCARD",
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
        // vcard.str_vcard += vcard.str_photo;
        vcard.str_vcard += vcard.str_fullname;
        vcard.str_vcard += vcard.str_phone_work;
        // vcard.build_address();
        vcard.str_vcard += vcard.str_end;
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
  return (
    <div className="my-3">
      <div className="">
        {isEdit ? (
          <div className="space-y-2">
            <div className="border border-white border-dashed rounded-lg p-[6px] text-white flex items-center space-x-3 cursor-pointer">
              <Icon icon="tabler:plus" className="w-6 h-6 " />
              <span className="text-[12px] tracking-wide">Thêm mới</span>
            </div>
            {EditDnD({ data })}
            {saveContact()}
          </div>
        ) : (
          <div className="grid <xs:grid-cols-1 grid-cols-2 gap-2 3xl:grid-cols-5 lg:grid-cols-3 ">
            {data.map((e, index) => (
              <div
                key={index}
                className="flex items-center justify-start w-full cursor-pointer h-9"
                onClick={() => {
                  onOpenContact(e.url);
                }}
              >
                <div
                  className="flex items-center justify-center w-10 h-[inherit] rounded-tl-md rounded-bl-md"
                  style={{
                    background: platforms.find((f) => f.key === e.platform)
                      ?.color,
                  }}
                >
                  <img
                    src={
                      keyToUrl.find(
                        (item) =>
                          item.key ===
                          platforms.find((f) => f.key === e.platform)?.key
                      )?.url
                    }
                    alt="platform logo"
                  />
                </div>
                <div
                  className="flex items-center justify-start w-[calc(100%-40px)] h-[inherit] px-4 rounded-tr-md rounded-br-md"
                  style={{
                    background: `${
                      platforms.find((f) => f.key === e.platform)
                        ?.background_color
                    }`,
                  }}
                >
                  <span
                    className="truncate"
                    style={{
                      color: ["#ffffff", "#fff"].includes(
                        platforms.find((f) => f.key === e.platform)?.color
                      )
                        ? "black"
                        : "white ",
                    }}
                  >
                    {e.name}
                  </span>
                </div>
              </div>
            ))}
            {saveContact()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
