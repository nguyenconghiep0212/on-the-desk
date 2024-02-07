import React, { useEffect, useState } from "react";
import BorderedDiv from "components/borderedDiv/index";
import { Icon } from "@iconify/react";
import { Input } from "antd";
import { useRecoilState } from "recoil";
import { userInfoStore } from "store/profileMenu";

function Component({
  isEdit,
  setEdit,
}: {
  isEdit: boolean;
  setEdit: Function;
}) {
  const [userInfo] = useRecoilState(userInfoStore);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {}, [userInfo]);
  const slot = (
    <div className="">
      <div className="flex items-center justify-between">
        <span className="text-[18px] font-semibold text-white opacity-50">
          THÔNG TIN CÁ NHÂN
        </span>
        <Icon
          className="w-5 h-5 text-white cursor-pointer opacity-95"
          icon="tabler:edit"
          onClick={() => {
            setEdit("PersonalInfo");
          }}
        />
      </div>
      <div className="mt-[18px] flex w-full space-x-[18px]">
        <div
          className="h-[108px] w-[108px] min-w-[108px] rounded-full"
          style={{
            backgroundImage: `url('${userInfo.avatar}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="w-full space-y-2">
          <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4 text-white" icon="bx:user" />
            {isEdit ? (
              <Input
                bordered={false}
                className="p-0 text-[15px] text-white"
                value={userInfo.name}
              />
            ) : (
              <span className="text-[15px] text-white">{userInfo.name}</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Icon
              className="w-4 h-4 text-white "
              icon="solar:calendar-broken"
            />
            {isEdit ? (
              <Input
                bordered={false}
                className="p-0 text-[15px] text-white"
                value="20/04/2023"
              />
            ) : (
              <span className="text-[15px] text-white">20/04/2023</span>
            )}
          </div>
          <div className="flex items-start justify-between">
            <div>
              {userInfo.contacts?.filter((e) => e.typeContact === "phone")
                .length > 1 ? (
                <div className="flex flex-col items-start justify-between w-full space-y-2">
                  {userInfo.contacts
                    ?.filter((e) => e.typeContact === "phone")
                    .map((e, i) => {
                      if (showContact) {
                        return (
                          <div className="flex space-x-2" key={i}>
                            <Icon
                              className={`h-4  w-4 text-white ${
                                i !== 0 && "invisible"
                              }`}
                              icon="tabler:phone"
                            />
                            {isEdit ? (
                              <Input
                                bordered={false}
                                className="p-0 text-white"
                                value={e.infoDetail}
                              />
                            ) : (
                              <span className="text-[15px] text-white">
                                {e.infoDetail}
                              </span>
                            )}
                          </div>
                        );
                      } else {
                        return i === 0 ? (
                          <div className="flex space-x-2" key={i}>
                            <Icon
                              className="w-4 h-4 text-white"
                              icon="tabler:phone"
                            />
                            {isEdit ? (
                              <Input
                                bordered={false}
                                className="p-0 text-[15px] text-white"
                                value={e.infoDetail}
                              />
                            ) : (
                              <span className="text-[15px] text-white">
                                {e.infoDetail}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div key={i}></div>
                        );
                      }
                    })}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-white" icon="tabler:phone" />
                  <span className="text-[15px] text-white">
                    {userInfo.contacts?.filter((e) => e.typeContact === "phone")
                      .length
                      ? userInfo.contacts?.filter(
                          (e) => e.typeContact === "phone",
                        )[0].infoDetail
                      : "(số điện thoại)"}
                  </span>
                </div>
              )}
            </div>
            <div>
              <Icon
                className="h-[18px] w-[18px] cursor-pointer text-white opacity-50"
                icon={
                  showContact ? "tabler:chevron-down" : "tabler:chevron-right"
                }
                onClick={() => {
                  setShowContact(!showContact);
                }}
              />
            </div>
          </div>
        </div>
      </div>
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
