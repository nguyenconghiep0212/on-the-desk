import { Icon } from "@iconify/react";
import { Input, Select } from "antd";
import BorderedDiv from "components/borderedDiv";
import React, { useEffect, useState } from "react";
import { getCities } from "api/vnProvinces";

function Component() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  async function fetchCities() {
    const res = await getCities('/p/');
    if (res) {
      setCities(res);
    }
  }
  async function fetchDistricts(id: number) {
    const res = await getCities(`/p/${id}?depth=2`);
    if (res) {
      setDistricts(res.districts);
    }
  }
  async function fetchWards(id: number) {
    const res = await getCities(`/d/${id}?depth=2`);
    if (res) {
      setWards(res.wards);
    }
  }
  useEffect(() => {
    fetchCities();
  }, []);
  useEffect(() => {}, [cities, districts,wards]);
  const slot = (
    <div>
      <span className="ml-2 text-[12px] font-semibold text-white lg:text-sm">
        Thông tin khách hàng
      </span>
      <div className="mt-[18px] space-y-3">
        <div className="flex items-center rounded-lg bg-[#151B23] px-2">
          <Icon className="w-4 h-4 text-primary-blue-medium" icon="bx:user" />
          <Input className="px-2 py-[6px] !shadow-none" placeholder="Họ tên" />
        </div>

        <div className="flex items-center rounded-lg bg-[#151B23] px-2">
          <Icon
            className="w-4 h-4 text-primary-blue-medium"
            icon="mdi:phone-outline"
          />
          <Input className="px-2 py-[6px] !shadow-none" placeholder="Số điện thoại" />
        </div>
        <div className="flex items-center rounded-lg bg-[#151B23] px-2">
          <Icon
            className="w-4 h-4 text-primary-blue-medium"
            icon="tdesign:location"
          />
          <Input
            className="px-2 py-[6px]  !shadow-none"
            placeholder="Số nhà, Tên đường"
          />
        </div>
        <div className="w-full">
          <Select
            suffixIcon={
              <Icon
                className="h-[18px] w-[18px] text-white"
                icon="pepicons-pop:angle-down"
              />
            }
            options={cities.map((e: any) => ({ value: e.code, label: e.name }))}
            className="w-full px-2 py-[6px] !shadow-none"
            placeholder="Tỉnh/ Thành"
            onChange={(e) => {
              console.log(e);
              fetchDistricts(e)
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            suffixIcon={
              <Icon
                className="h-[18px] w-[18px] text-white"
                icon="pepicons-pop:angle-down"
              />
            }
            className="px-2 py-[6px] !shadow-none"
            placeholder="Quận/ Huyện"
            options={districts.map((e: any) => ({ value: e.code, label: e.name }))}
            onChange={(e) => {fetchWards(e)}}
          />
          <Select
            className="px-2 py-[6px] !shadow-none"
            placeholder="Phường/ Xã"
            options={wards.map((e: any) => ({ value: e.code, label: e.name }))}
            suffixIcon={
              <Icon
                className="h-[18px] w-[18px] text-white"
                icon="pepicons-pop:angle-down"
              />
            } 
          />
        </div>
      </div>
    </div>
  );

  return <BorderedDiv slot={slot} background={null} />;
}

export default Component;
