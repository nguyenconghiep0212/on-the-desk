import React from "react";
import { platforms, keyToUrl } from "./platforms";
// import vCard from "vcards-js";
import SaveToContact from "assests/portfolio/save_to_contact.svg";

function Contact({ alias, data, userInfo }) {
  function generateVCF() {
    // const vcf = vCard();

    // vcf.firstName = userInfo.name;
    // vcf.photo.attachFromUrl(userInfo.avatar, "JPEG");
    // vcf.cellPhone = userInfo.contacts.find(
    //   (e) => e.platformKey === "phone"
    // ).contactValue;
    // const linkElement = document.createElement("a");
    // linkElement.setAttribute("href", `data:${vcf.getFormattedString()}`);
    // linkElement.setAttribute("download", "card.vcf");

    // linkElement.style.display = "none";

    // document.body.appendChild(linkElement);
    // linkElement.click();
    // document.body.removeChild(linkElement);
  }
  function onpenContact(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <div className="my-3">
      <div className="grid <xs:grid-cols-1 grid-cols-2 gap-2 3xl:grid-cols-5 lg:grid-cols-3 ">
        {data.map((e, index) => (
          <div
            key={index}
            className="flex items-center justify-start w-full cursor-pointer h-9"
            onClick={() => {
              onpenContact(e.url);
            }}
          >
            <div
              className="flex items-center justify-center w-10 h-[inherit] rounded-tl-md rounded-bl-md"
              style={{
                background: platforms.find((f) => f.key === e.platform)?.color,
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
                  platforms.find((f) => f.key === e.platform)?.background_color
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
        {/* SAVE TO CONTACT (DEFAULT) */}
        <div
          className="flex items-center justify-start w-full cursor-pointer h-9"
          onClick={() => {
            generateVCF();
          }}
        >
          <div className="bg-[#d6d6cc] flex items-center justify-center overflow-clip w-10 h-[inherit] rounded-tl-md rounded-bl-md">
            <img src={SaveToContact} alt="platform logo" className="w-full rounded-tl-md rounded-bl-md" />
          </div>
          <div className="flex bg-[#908D84] items-center justify-start w-[calc(100%-40px)] h-[inherit] px-4 rounded-tr-md rounded-br-md">
            <span className="text-white truncate">Lưu danh bạ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
