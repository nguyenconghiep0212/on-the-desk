import { Icon } from "@iconify/react";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { addContact as addContactApi, listContactTemplate } from "api";
import { normalizeVietnamese } from "helper/formatString";

function Component({ dndItems, setDndItems }) {
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
  ]);
  const [filteredContactList, setFilteredContactList] = useState([]);
  async function fetchTemplate() {
    const res = await listContactTemplate();
    if (res) {
      setContactTemplate(
        res.data.filter(
          (e) => !dndItems.map((f) => f.templateId).includes(e.id)
        )
      );
      setFilteredContactList(
        res.data.filter(
          (e) => !dndItems.map((f) => f.templateId).includes(e.id)
        )
      );
    }
  }
  async function handleAddContact(e) {
    const { id: _, ...rest }: any = e;
    const res = await addContactApi({
      contacts: [{ ...rest, templateId: e.id }],
    });
    if (res) {
      setDndItems(
        dndItems.concat([{ ...res.data[0], children: [res.data[0]] }])
      );
      
      setContactTemplate(contactTemplate.filter((f) => f.id !== e.id));
      setFilteredContactList(contactTemplate.filter((f) => f.id !== e.id));
    }
  }
  useEffect(() => {
    fetchTemplate();
  }, []);
  useEffect(() => {}, [filteredContactList, addContact, contactTemplate]);
  useEffect(() => {
    fetchTemplate();
  }, [dndItems]);
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
                  contactTemplate.filter((f: any) =>
                    normalizeVietnamese(f.nameContact)
                      .toLowerCase()
                      .includes(
                        normalizeVietnamese(e.target.value).toLowerCase()
                      )
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
                  handleAddContact(e);
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
