import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { data, galleries, customer } from "views/mock.ts";

function Component() {
  const [gallery, setGallery] = useState<any>([]);
  const [info, setInfo] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  function getInfo() {
    const temp = data.components
      .find((e) => e.key === "gallery")
      ?.data.find((e) => e.customer_id === params.customerId);
    const customerInfo = customer.find((e) => e.id === params.customerId);
    setInfo({
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
    });
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

  function handleBack() {
    return navigate(-1);
  }
  useEffect(() => {
    getCustomerGallery();
    getInfo();
  }, []);
  return (
    <div className="w-full h-full">
      {/* INFO */}
      <div className="relative w-full h-1/3">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${info.thumbnail})`,
            WebkitFilter: `blur(24px)`,
          }}
        ></div>
        <div className="absolute top-0 left-0">
          <Button variant="text" className="!px-0" onClick={handleBack}>
            <Icon className="text-2xl  ml-[-16px] text-white" icon="ep:back" />
          </Button>
        </div>

        <div className="absolute top-0 w-3/4 h-full -translate-x-1/2 left-1/2">
          <img src={info.thumbnail} alt="thumbnail" className="w-full h-full" />
        </div>
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
