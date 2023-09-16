import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { data, galleries, customer } from "views/mock.ts";
import Feedback from "../components/feedback/index";

interface Info {
  thumbnail: string;
  customer: {
    avatar_url: string;
    name: string;
    gallery_name: string;
  };
  user: {
    avatar_url: string;
    name: string;
  };
  feedback: any;
}

function Component() {
  const [gallery, setGallery] = useState<any>([]);
  const [info, setInfo] = useState<Info>({
    thumbnail: "",
    customer: {
      avatar_url: "",
      name: "",
      gallery_name: "",
    },
    user: {
      avatar_url: "",
      name: "",
    },
    feedback: {
      alias: "",
      data: [],
    },
  });
  const params = useParams();
  const navigate = useNavigate();
  function getInfo() {
    const temp = data.components
      .find((e) => e.key === "gallery")
      ?.data.find((e) => e.customer_id === params.customerId);
    const customerInfo = customer.find((e) => e.id === params.customerId);
    console.log(customerInfo);
    const obj = {
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
      feedback: {
        alias: data.components.find((e) => e.key === "feedback").alias,
        data: data.components
          .find((e) => e.key === "feedback")
          ?.data.filter((e) => e.customer_id === customerInfo?.id),
      },
    };
    setInfo(obj);
    console.log(obj);
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
    <div className="w-full h-full sm:flex sm:flex-col sm:items-center">
      <div className="h-full px-3 pb-3 sm:w-1/2">
        {/* INFO */}
        <div className="relative w-full h-1/3 sm:h-2/5 lg:h-3/5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${info.thumbnail})`,
              WebkitFilter: `blur(24px)`,
            }}
          ></div>
          <div className="absolute top-0 left-0">
            <Button variant="text" className="!px-0" onClick={handleBack}>
              <Icon
                className="text-2xl  ml-[-16px] text-white"
                icon="ep:back"
              />
            </Button>
          </div>
          <div
            className="absolute top-0 w-3/4 h-full -translate-x-1/2 3xl:w-3/5 left-1/2"
            style={{
              backgroundImage: `url(${info.thumbnail})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div
          id="customer"
          className="relative z-10 flex items-center space-x-2 "
        >
          <div className=" w-20 h-20 ml-[20%] mt-[-25px]">
            <img
              src={info.customer.avatar_url}
              alt="customer_avatar"
              className="z-20 h-full rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[#72FFFF] text-xl font-semibold">
              {info.customer.name}
            </span>
            <span className="text-[#72FFFF] text-sm font-thin">
              {info.customer.gallery_name}
            </span>
          </div>
        </div>
        <div id="user">
          <div className="ml-[20%] h-6 w-10 border-r border-[#72FFFF] text-white" />
          <div className="flex space-x-2">
            <div className="ml-[20%] w-20 h-20 scale-75 -mt-3 border-[#72FFFF] border-2 rounded-full">
              <img
                className="h-full"
                src={info.user.avatar_url}
                alt="user_avatar"
              />
            </div>
            <span className="mt-4 text-lg font-semibold text-white">
              {info.user.name}
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-6">
          {/* GALLERY */}
          <div className="grid grid-cols-2 gap-4 overflow-auto">
            {masonryGrid()}
          </div>
          {/* FEEDBACK */}
          <div className="p-3 rounded-2xl w-full bg-[#1E2530]">
            <Feedback alias={info.feedback.alias} data={info.feedback.data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;