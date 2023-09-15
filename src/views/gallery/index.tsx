import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { data, galleries, customer } from "views/mock.ts";

function Component() {
  const [gallery, setGallery] = useState<any>([]);
  const [info, setInfo] = useState({});
  const params = useParams();
  let obj = {};
  obj = getInfo();
  function getInfo() {
    const temp = data.components
      .find((e) => e.key === "gallery")
      ?.data.find((e) => e.customer_id === params.customerId);
    const customerInfo = customer.find((e) => e.id === params.customerId);
    return {
      thumbnail: temp.thumbnail,
      customer: {
        avatar_url: customerInfo.avatar_url,
        name: customerInfo.name,
        gallery_name: temp.alias,
      },
      user: {
        avatar_url: data.personal_info.avatar_url,
        name: data.personal_info.name,
      },
    };
  }

  function masonryGrid() {
    const grid: any = [];
    for (let i = 0; i < Math.ceil(gallery.length); i++) {
      grid.push(
        <div key={i} className="rounded-2xl">
          <img src={gallery[i]} alt="gallery_src" className="rounded-2xl" />
        </div>
      );
    }
    return grid;
  }

  function getCustomerGallery() {
    const arr = galleries.find(
      (e) => e.customer_id === params.customerId
    )?.images;
    setGallery(arr);
  }
  useEffect(() => {
    getCustomerGallery();
    // setInfo(obj);
  }, [obj]);
  return (
    <div>
      {/* INFO */}
      <div className="relative">
        <div
          className="w-full h-full "
          style={{
            backgroundImage: `url(${info.thumbnail})`,
            WebkitFilter: `blur(24px)`,
          }}
        />
      </div>
      {/* GALLERY */}
      <div className="p-3">
        <div className="grid grid-cols-2 gap-4 overflow-auto">
          {masonryGrid()}
        </div>
      </div>
    </div>
  );
}

export default Component;
