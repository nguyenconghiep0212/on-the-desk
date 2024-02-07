import { Icon } from "@iconify/react";
import { Input } from "antd";
import { fetchPackageList, getUserProfile } from "api";
import BorderedDiv from "components/borderedDiv";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Component({
  numberOfCard,
  setNumberOfCard,
  userPackage,
  setUserPackage,
}: {
  numberOfCard: number;
  setNumberOfCard: Function;
  userPackage: any;
  setUserPackage: Function;
}) {
  const routeParams = useParams();

  async function getPackageInfo() {
    const res = await getUserProfile(routeParams.userShortcut);
    if (res) { 
      const res2 = await fetchPackageList();
      if (res2) {
        setUserPackage({
          name: res.data.package.packageName,
          price: res2.data.find((e) => e.id === res.data.package.id)
            .originalPrice,
        });
      }
    }
  }

  useEffect(() => {
    getPackageInfo();
  }, []);

  const slot = (
    <div>
      <span className="ml-2 text-[12px] font-semibold text-white lg:text-sm">
        Thông tin đơn hàng
      </span>
      <div className="mt-[18px] space-y-3">
        <div className="flex items-center space-x-[6px] rounded-lg bg-[#151B23] p-2">
          <Icon
            className="w-4 h-4 text-primary-blue-medium"
            icon="lucide:archive"
          />
          <span className="font-normal text-white">Gói {userPackage.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white">Số lượng thẻ:</span>
          <div className="flex space-x-1">
            <div
              className="cursor-pointer rounded-sm bg-[#202a36] px-3 py-1 text-white"
              onClick={() => {
                if (numberOfCard > 1) {
                  setNumberOfCard(numberOfCard - 1);
                }
              }}
            >
              -
            </div>
            <div className="flex w-14 cursor-pointer items-center justify-center rounded-sm bg-[#18191A] p-1 text-white">
              <Input
                className="!shadow-none"
                value={numberOfCard}
                onChange={(e) => {
                  if (Number(e.target.value)) {
                    setNumberOfCard(e.target.value);
                  }
                }}
              />
            </div>
            <div
              className="cursor-pointer rounded-sm bg-[#202a36] px-3 py-1 text-white"
              onClick={() => {
                setNumberOfCard(numberOfCard + 1);
              }}
            >
              +
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white">Thành tiền:</span>
          <div className="flex">
            <span className="font-bold text-white">
              {(numberOfCard * userPackage.price)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            <span className="text-xs align-top text-[12px] font-bold text-white">
              đ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  return <BorderedDiv slot={slot} background={null} />;
}

export default Component;
