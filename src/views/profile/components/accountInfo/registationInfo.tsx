import React, { useEffect, useState } from "react";
import BorderedDiv from "components/borderedDiv/index";
import { Icon } from "@iconify/react";
import Divider from "components/divider/index";
import { useRecoilState } from "recoil";
import { userInfoStore } from "store/profileMenu";
import LogoGoogle from "assests/portfolio/logo_google.svg";
import { message } from "antd";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { addContact, deleteContact, editContact } from "api";

function Component({
  isEdit,
  setEdit,
}: {
  isEdit: boolean;
  setEdit: Function;
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo] = useRecoilState(userInfoStore);
  const [linkedAccount, setLinkedAccount] = useState<any>(null);
  const linkBtn = {
    nameContact: "Google",
    linkIcon: LogoGoogle,
    backgroundColor: "#4285F4",
  };

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // fetching userinfo can be done on the client or the server
      const result = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      // DEMO, FIX LATER
      const params = {
        nameContact: "Gmail",
        templateId: "65489cde8953ee0aeddc5bb5",
      };
      const res = await addContact({ contacts: [params] });
      console.log(res);
      if (res) {
        const params2 = {
          id: res.data[0].id,
          typeContact: "social",
          keyContact: "gmail",
          nameContact: "Gmail",
          infoDetail: result.email,
          linkIcon: "/images/contact/ic-gmail.svg",
          backgoundColor: null,
          backgroundColor: "#4285F4",
          templateId: "65489cde8953ee0aeddc5bb5",
          status: 1,
          contactId: res.data[0].id,
        };
        const res2 = await editContact(params2);
        if (res2) {
          window.location.reload();
        }
      }

      //
      // window.location.reload();
    },
    onError: (codeResponse) => {
      console.error("Lỗi email:", codeResponse);
      messageApi.open({
        type: "error",
        content: "Email không hợp lệ",
      });
    },
  });
  useEffect(() => {
    console.log("userInfo", userInfo);
    if (Object.keys(userInfo).length) {
      setLinkedAccount(userInfo.contacts.find((e) => e.keyContact === "gmail"));
    }
  }, [userInfo]);
  const slot = (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[18px] font-semibold text-white opacity-50">
          THÔNG TIN ĐĂNG KÝ
        </span>
        <Icon
          className="w-5 h-5 text-white cursor-pointer opacity-95"
          icon="tabler:edit"
          onClick={() => {
            setEdit("RegistationInfo");
          }}
        />
      </div>

      {/*  */}
      <div className="mt-[18px] flex flex-col">
        <div className="flex items-center   space-x-[6px] px-2 py-1 ">
          <Icon
            className="w-5 h-5 text-primary-blue-medium"
            icon="material-symbols:mail-outline"
          />
          <span className="text-[15px] text-white">tittoengongoe@otd.vn</span>
        </div>
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center  space-x-[6px] ">
            <Icon
              className="w-5 h-5 text-primary-blue-medium"
              icon="material-symbols:lock-outline"
            />
            <span className="text-[15px] text-white">******</span>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="px-8 py-2">
        <Divider />
      </div>

      {/*  */}

      <div className="space-y-2">
        <div className="flex items-center justify-between space-x-2">
          <span className="text-[15px] font-semibold text-white">
            Tài khoản liên kết
          </span>
          <Icon
            className="h-5 w-5 cursor-pointer text-[#F2994A]"
            icon="ph:info-bold"
          />
        </div>

        <div className="space-y-2">
          {/*  */}

          <div className="flex items-center space-x-2">
            <div
              className="flex h-9 w-full cursor-pointer items-center justify-start opacity-[0.99]"
              onClick={() => {
                if (!linkedAccount) {
                  handleLoginWithGoogle();
                }
              }}
            >
              <div className="flex h-[inherit] w-10 items-center justify-center rounded-bl-md rounded-tl-md bg-white">
                <img src={linkBtn.linkIcon} alt="platform logo" />
              </div>
              <div
                className="flex h-[inherit] w-[calc(100%-40px)] items-center justify-between rounded-br-md rounded-tr-md px-4"
                style={{
                  backgroundColor: `${linkBtn.backgroundColor}`,
                }}
              >
                <span className="text-white truncate">
                  {linkedAccount
                    ? linkedAccount.infoDetail
                    : linkBtn.nameContact}
                </span>
              </div>
            </div>

            <Icon
              className="h-[18px] w-[18px] cursor-pointer text-white opacity-95"
              icon={`${linkedAccount ? "mynaui:unlink" : "solar:link-bold"}`}
              onClick={async () => {
                if (linkedAccount) {
                  await deleteContact(linkedAccount.id);
                  window.location.reload();
                } else {
                  handleLoginWithGoogle();
                }
              }}
            />
          </div>

          {/*  */}
        </div>
      </div>
      {contextHolder}
    </div>
  );
  return (
    <BorderedDiv
      slot={slot}
      style={{
        background:
          "linear-gradient(106deg, rgba(8, 8, 8, 0.72) 0%, rgba(17, 17, 17, 0.72) 100%, rgba(8, 8, 8, 0.48) 100%)",
        padding: "18px 12px",
      }}
    />
  );
}

export default Component;
