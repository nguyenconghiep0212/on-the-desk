import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { fetchPackageList } from "api";
import { Icon } from "@iconify/react";
import { selectedPackage as selectedPackageAtom} from 'store/addCard'
import { useRecoilState } from "recoil";

function Component() {
  const [selectedPackage, setSelectedPackage] = useRecoilState(selectedPackageAtom);
  const [packages, setPackages] = useState([]);
  async function getPackageList() {
    const res = await fetchPackageList();
    if (res) {
      setPackages(res.data);
      setSelectedPackage(res.data.find(e => e.name === "PRO"))
    }
  }
  useEffect(() => {}, [selectedPackage]);
  useEffect(() => {
    getPackageList();
  }, []);
  return (
    <div className="flex flex-col  px-3 py-[10px] rounded-2xl space-y-[18px] bg-primary-blue-dark-max">
      <div className="text-sm font-semibold text-white">Chọn gói dịch vụ</div>

      <div className="flex p-2 space-x-3 overflow-x-scroll ">
        {packages.map((item: any, index: number) => (
          <div
            style={
              item.objectTarget === "Corporation"
                ? {
                    background:
                      "linear-gradient(127deg, #05224A 30.25%, #2F66B3 100%)",
                    boxShadow:
                      "2px 2px 8px 0px #001940, -2px -2px 8px 0px rgba(60, 173, 255, 0.50)",
                  }
                : {}
            }
            className="relative !min-w-[270px] default_card cursor-pointer h-fit !px-4 !pt-12 !pb-6"
            key={index}
          >
            {/* STICKER */}
            <div className="absolute top-0 right-0 p-[10px] text-white rounded-bl-[18px] rounded-tr-[18px] bg-primary-blue-medium">
              {item.objectTarget}
            </div>

            {/* CONTENT */}
            <div className="space-y-6 ">
              <div>
                {/* NAME */}
                <div className="text-[24px] mb-[30px] font-bold tracking-wide gradient-text text-primary-blue-medium">
                  {item.name}
                </div>{" "}
                {/* DESCRIPTION */}
                {item.features.map(
                  (item_child: string, index_child: number) => (
                    <div
                      key={index_child}
                      className={`${
                        index === 1
                          ? "last:font-bold"
                          : index === 2
                          ? `last:font-bold ${
                              index_child === item.features.length - 2
                                ? "font-bold"
                                : ""
                            }`
                          : ""
                      } tracking-wide text-[16px]`}
                    >
                      {item_child}
                    </div>
                  )
                )}
              </div>
              {/* PRICE */}
              <div className="ml-2">
                <div>
                  {item.showContactPrice ? (
                    <div className="text-[28px] font-bold tracking-wide ">
                      Liên hệ
                    </div>
                  ) : (
                    <div>
                      <div className="flex space-x-1 text-primary-blue-dark">
                        <div className="line-through">
                          {item.originalPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </div>
                        <div className="text-xs align-top">đ</div>
                      </div>
                      <div className="flex space-x-1 font-bold">
                        <div className="text-[28px] ">
                          {item.promotionPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </div>
                        <div className="text-sm align-top">đ</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* BUTTON */}

              <Button
                className={`${
                  selectedPackage.id !== item.id
                    ? "gradient_btn !text-white"
                    : "inverted_btn !text-primary-blue-medium"
                }`}
                onClick={() => {
                  setSelectedPackage(item);
                }}
              >
                <div className="flex items-center space-x-2 ">
                  <Icon icon="tabler:check" />
                  <span className="font-semibold">
                    {selectedPackage.id !== item.id ? "Chọn" : "Đang chọn"}
                  </span>
                </div>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Component;
