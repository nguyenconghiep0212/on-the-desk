import { Icon } from "@iconify/react";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { addContact as addContactApi, listContactTemplate } from "api";

function Component({ data, setDndItems, setContactList }) {
  const [addContact, setAddContact] = useState(false);
  const [contactTemplate, setContactTemplate] = useState([
    {
      id: "654369c94c2fd7e46ecdf279",
      typeContact: "social",
      nameContact: "Facebook",
      keyContact: "facebook",
      linkIcon: "/hiep-nguyen-cong/Card/b77c15d6e2f14414b2776c2d39dcdd86.svg",
      backgoundColor: "#1877F2",
      status: 1,
    },
    {
      id: "654369c94c2fd7e46ecdf27d",
      typeContact: "social",
      nameContact: "Viber",
      keyContact: "viber",
      linkIcon: "/hiep-nguyen-cong/Card/c2a98a5045794d21a0bb3f75a44bd4f3.svg",
      backgoundColor: "#834995",
      status: 1,
    },
    {
      id: "1",
      typeContact: "bank",
      nameContact: "SHB",
      keyContact: "970443",
      linkIcon: "/hiep-nguyen-cong/Card/6b21f3da478f45938c65a76475abce85.svg",
      backgoundColor: "#4274EB",
      status: 1,
    },
    {
      id: "2",
      typeContact: "bank",
      nameContact: "MB",
      keyContact: "970422",
      linkIcon: "/hiep-nguyen-cong/Card/592f725518e94ef08b072f49a50c030c.svg",
      backgoundColor: "#004A99",
      status: 1,
    },
  ]);
  const [filteredContactList, setFilteredContactList] = useState([]);
  async function fetchTemplate(){
  const res = await listContactTemplate()
  if(res){
    setContactTemplate(res.data) 
    setFilteredContactList(res.data);
  }
}
  useEffect(() => {
      fetchTemplate()
      

  }, []);
  useEffect(() => {}, [filteredContactList, addContact, contactTemplate]);
  return (
    <div>
      {addContact || (
        <div
          className="border border-white border-dashed rounded-lg p-[6px] text-white flex items-center space-x-3 cursor-pointer"
          onClick={() => setAddContact(true)}
        >
          <Icon icon="tabler:plus" className="w-6 h-6 " />
          <span className="text-[12px] tracking-wide">Thêm mới</span>
        </div>
      )}
      {addContact && (
        <div className="space-y-2">
          <Input
            placeholder="Tìm kiếm"
            prefix={
              <Icon
                className="text-[22px] text-primary-blue-medium"
                icon="akar-icons:search"
              />
            }
            suffix={
              <Icon
                className="text-[20px] cursor-pointer"
                icon="ic:round-close"
                onClick={() => setAddContact(false)}
              />
            }
            onChange={(e) => {
              if (e.target.value) {
                setFilteredContactList(
                  contactTemplate.filter((f) =>
                    f.nameContact.includes(e.target.value)
                  )
                );
              } else {
                setFilteredContactList(contactTemplate);
              }
            }}
          />
          <div className="max-h-[30vh] space-y-2 overflow-auto">
            {filteredContactList.map((e, i) => (
              <div
                key={i}
                className="flex items-center justify-start w-full cursor-pointer h-9"
                onClick={async () => {
                  setDndItems(data.concat([e]));
                  setContactList(data.concat([e]));
                  const { id: _, ...rest }: any = e;
                  await addContactApi({
                    contacts: [{ ...rest, templateId: e.id }],
                  });
                }}
              >
                <div
                  className={`flex items-center justify-center w-10 h-[inherit] rounded-tl-md rounded-bl-md ${
                    e.keyContact === "phone" ? "bg-[#01B634]" : "bg-white"
                  }`}
                >
                  <img
                    src={`${process.env.REACT_APP_BASE_IMG}${e.linkIcon}`}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Component;
