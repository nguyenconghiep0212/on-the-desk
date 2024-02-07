import { Icon } from "@iconify/react";
import { Button } from "antd";
import BorderedDiv from "components/borderedDiv";
import React from "react";
import { useRecoilState } from "recoil";
import { userInfoStore } from "store/profileMenu";

function Component() {
  const [userInfo] = useRecoilState(userInfoStore);

  return (
    <div>
      <BorderedDiv
        slot={
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white opacity-50">THÔNG TIN GÓI</span>
              <Icon
                className="text-white cursor-pointer"
                icon="ph:dots-three-outline-vertical-fill"
              />
            </div>
            <div className="gradient-text mb-[30px] text-[24px] font-bold tracking-wide text-primary-blue-medium">
              {userInfo.package.packageName}
            </div>

            <div className="flex justify-end">
              <Button
                className="flex items-center justify-center space-x-[6px] !border !border-solid !border-white !bg-[#414954] !shadow-none"
                onClick={() => {}}
              >
                <Icon className="h-[18px] w-[18px]" icon="tabler:plus" />
                <span className="text-[12px]">Yêu cầu tính năng</span>
              </Button>
            </div>
          </div>
        }
        style={{
          background:
            "linear-gradient(106deg, rgba(8, 8, 8, 0.72) 0%, rgba(17, 17, 17, 0.72) 100%, rgba(8, 8, 8, 0.48) 100%)",
          padding: "18px 12px",
        }}
      />
    </div>
  );
}

export default Component;
