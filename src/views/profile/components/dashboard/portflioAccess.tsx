import React from "react";
import BorderedDiv from "components/borderedDiv";
import { Icon } from "@iconify/react";
function Component() {
  return (
    <div>
      <BorderedDiv
        slot={
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white opacity-50">TRUY CẬP HỒ SƠ</span>
              <Icon
                className="text-white cursor-pointer"
                icon="ph:dots-three-outline-vertical-fill"
              />
            </div>
            <div
              className="flex items-center justify-between text-white cursor-pointer"
              onClick={() => {}}
            >
              <div className="flex items-center space-x-2 ">
                <span className="text-lg font-bold">130</span>
              </div>
              <Icon className="opacity-50" icon="tabler:chevron-right" />
            </div>
            <div className="mt-1 flex items-center space-x-[18px]">
              <div className="flex items-center space-x-[6px]">
                <Icon
                  className="w-6 h-6 text-primary-blue-medium"
                  icon="ph:target"
                />
                <div className="flex items-center text-[#27AE60]">
                  <Icon icon="tabler:arrow-up" />
                  <span className="font-semibold">4%</span>
                </div>
              </div>
              <div className="flex items-center space-x-[6px]">
                <Icon
                  className="w-6 h-6 text-primary-blue-medium"
                  icon="solar:calendar-broken"
                />
                <div className="flex items-center text-[#EB5757]">
                  <Icon icon="tabler:arrow-down" />
                  <span className="font-semibold">6%</span>
                </div>
              </div>
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
