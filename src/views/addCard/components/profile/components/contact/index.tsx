import { Icon } from "@iconify/react";
import React from "react";
import SaveToContact from "assests/portfolio/save_to_contact.svg";
import Contact from "components/contact";

function Component() {
  const mock = [
    {
      id: "6590ead7f67cd6a77b44430b",
      typeContact: "social",
      keyContact: "facebook",
      nameContact: "Facebook",
      children: [{}],
      infoDetail: null,
      linkIcon: "/images/contact/ic-facebook.svg",
      backgoundColor: null,
      backgroundColor: "#1877F2",
      templateId: "654369c94c2fd7e46ecdf279",
      status: 1,
    },
    {
      id: "65984648722e8e7122790050",
      typeContact: "social",
      keyContact: "zalo",
      nameContact: "Zalo",
      infoDetail: null,
      linkIcon: "/images/contact/ic-zalo.svg",
      backgoundColor: null,
      backgroundColor: "#0066FF",
      templateId: "654369c94c2fd7e46ecdf27a",
      status: 1,
    },
    {
      id: "659108f6b24ddcbedd0fa242",
      typeContact: "phone",
      keyContact: "phone",
      nameContact: "Số điện thoại",
      infoDetail: "1234456",
      linkIcon: "/images/contact/ic-phonecall.svg",
      backgoundColor: null,
      backgroundColor: "#0D7B2C",
      templateId: "654369c94c2fd7e46ecdf278",
      status: 1,
    },
    {
      id: "65984656722e8e7122790058",
      typeContact: "social",
      keyContact: "ggdrive",
      nameContact: "Google Drive",
      infoDetail: null,
      linkIcon: "/images/contact/ic-ggdrive.svg",
      backgoundColor: null,
      backgroundColor: "#28B446",
      templateId: "65489cde8953ee0aeddc5bc6",
      status: 1,
    },
    {
      id: "6598465c722e8e712279005d",
      typeContact: "e-commerce",
      keyContact: "shopee",
      nameContact: "Shopee",
      infoDetail: null,
      linkIcon: "/images/contact/ic-shopee.svg",
      backgoundColor: null,
      backgroundColor: "#EA501F",
      templateId: "65489cde8953ee0aeddc5bc8",
      status: 1,
    },
  ];
  return (
    <div className="p-3 space-y-3">
      {mock.map((e, i) => (
        <div key={i}>
          <Contact
            contact={e}
            event={() => {}}
            isMultiple={!!e.children?.length}
          />
        </div>
      ))}
      {/* SAVE TO CONTACT (DEFAULT) */}
      <div className="flex items-center justify-start w-full cursor-pointer h-9">
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
    </div>
  );
}

export default Component;
