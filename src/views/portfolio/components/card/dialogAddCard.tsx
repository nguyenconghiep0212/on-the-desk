import { Icon } from "@iconify/react";
import { Button, Checkbox, Modal, Select, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import FrontCard from "components/card/front.tsx";
import { presetCards, card as storeCard } from "store/addCard";
import { mock_card } from "./cardPresets.ts";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fetchCustomerList } from "api";

function Component({ attr, onClose }: { attr: any; onClose: Function }) {
  const presetStore = useRecoilValue(presetCards);
  const [presets, setPresets] = useState([]);
  const [cookies] = useCookies(["current-user-shortcut"]);
  const setAddCard = useSetRecoilState(storeCard);
  const cardFilter = [
    {
      key: "1",
      label: "Thẻ hồ sơ",
      children: " ",
    },
    {
      key: "2",
      label: "Thẻ thư viện",
      children: "",
    },
  ];
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  function handleAddCard(albumShortcut = "") {
    navigate(
      `/${cookies["current-user-shortcut"]}/addCard${
        albumShortcut ? `?shortcut=${albumShortcut}` : ""
      } `,
    );
  }
  function onChangeFilter() {}
  async function getCustomerList() {
    const res = await fetchCustomerList();
    if (res) {
      setCustomers(res.data);
    }
  }
  useEffect(() => {
    setAddCard(mock_card);
    getCustomerList();
  }, []);
  useEffect(() => {}, [presets]);
  useEffect(() => {
    setPresets([...presetStore]);
  }, [presetStore]);
  return (
    <Modal {...attr}>
      <div className="flex flex-col items-center h-full py-5 backdrop-blur">
        <div className="flex justify-between w-full px-8 ">
          <div className="font-semibold text-white">Chọn mẫu</div>
          <Icon
            icon="tabler:x"
            className=" cursor-pointer text-[24px] text-white"
            onClick={() => onClose()}
          />
        </div>
        <div className="flex w-[100vw] flex-col px-8">
          <Tabs
          className="mt-6 "
            defaultActiveKey="1"
            items={cardFilter}
            onChange={onChangeFilter}
          />
          <Swiper
            className=" z-1 !h-[210px] add-card-swiper"
            slidesPerView={1}
            pagination={true}
            modules={[Pagination]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {presets.map((e: any, i) => (
              <SwiperSlide className=" !h-[inherit] !bg-[inherit] " key={i}>
                <div className="relative w-min">
                  <div className="absolute right-3 top-3">
                    <Checkbox
                      className="circle"
                      checked={e.selected}
                      onChange={(event) => {
                        let ar: any = [...presets];
                        ar.forEach(
                          (f, j) => (ar[j] = { ...f, selected: false }),
                        );
                        ar[i] = { ...ar[i], selected: event.target.checked };
                        console.log(ar, ar[i]);
                        setPresets(ar);
                        if (event.target.checked) {
                          setAddCard({ ...e });
                        } else {
                          setAddCard(mock_card);
                        }
                      }}
                    />
                  </div>
                  <FrontCard card={e} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col space-y-3">
            <Button
              className="w-full !shadow-none backdrop-blur"
              style={{
                border: "0.5px solid white",
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 100%)",
              }}
              onClick={() => {
                handleAddCard();
              }}
            >
              <div className="flex items-center space-x-[6px]">
                <Icon className="h-[18px] w-[18px]" icon="tabler:plus" />
                <span className="text-[12px] font-semibold text-white">
                  Thêm thẻ cho hồ sơ
                </span>
              </div>
            </Button>
            <Select
              options={customers.map((e) => ({
                value: e.shortcut,
                label: e.customerName,
              }))}
              className="w-full px-[9px] py-[6px] !shadow-none backdrop-blur"
              style={{
                border: "0.5px solid white",
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 100%)",
              }}
              placeholder={
                <div className="flex items-center space-x-2">
                  <Icon
                    className="h-[18px] w-[18px] text-white"
                    icon="pepicons-pop:angle-down"
                  />
                  <span className="text-[12px] font-semibold text-white">
                    Thêm thẻ cho thư viện
                  </span>
                </div>
              }
              onChange={(e) => {
                handleAddCard(e);
              }}
              dropdownRender={(menu) => <div className="gradient">{menu}</div>}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Component;
