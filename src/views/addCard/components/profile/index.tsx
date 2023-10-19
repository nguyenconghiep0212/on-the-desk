import { getComponentFromPackage } from "api";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedPackage as selectedPackageAtom } from "store/addCard";
import DynamicComponent from "./dynamicComponents";
import { COMPONENT } from "interface/component";

function Component() {
  const [selectedPackage] = useRecoilState(selectedPackageAtom);
  const [packageComponents, setPackageComponents] = useState<COMPONENT[]>([]);
  async function fetchPackageComponents() {
    if (selectedPackage.id) {
      const res = await getComponentFromPackage(selectedPackage.id);
      if (res) {
        res.data.forEach((e) => {
          try {
            e.config = JSON.parse(e.config);
          } catch (error) {
            e.config = {};
            console.error("Lỗi config component", error);
          }
        });
        setPackageComponents(res.data);
      }
    }
  }
  useEffect(() => {
    fetchPackageComponents();
  }, [selectedPackage]);
  return (
    <div>
      {packageComponents.map((item) => (
        <div className="p-3 rounded-2xl w-full bg-[#1E2530]">
          <DynamicComponent is={item.key} alias={item.config.alias} />
        </div>
      ))}
    </div>
  );
}

export default Component;
