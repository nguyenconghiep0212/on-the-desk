import React, { useEffect, useState } from "react";
import { filter, customer } from "views/mock.ts";
import { Chip } from "@mui/material";
import { Icon } from "@iconify/react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { formatNumber } from "helper/formatNumber.ts";

function Gallery({ alias, data }) {
  const [isAllFilter, setIsAllFilter] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [filteredGallery, setFilteredGallery] = useState<any>([]);
  const [filteredTag, setFilterTag] = useState<string[]>(["all"]);

  function handleClickFilterTag(data: string) {
    if (data !== "all") {
      if (filteredTag.includes("all")) {
        filteredTag.splice(filteredTag.indexOf("all"), 1);
      }

      if (!filteredTag.includes(data)) {
        setFilterTag([...filteredTag, data]);
      } else {
        const index = filteredTag.findIndex((e) => e === data);
        if (index > -1) {
          const arr = filteredTag.filter((e, i) => i !== index);
          setFilterTag(arr);
        }
      }
    } else {
      setFilterTag(["all"]);
    }
  }

  function handleFilterGallery() {
    if (filteredTag.includes("all")) {
      setFilteredGallery(data);
    } else {
      const arr: any = [];
      data.forEach((e) => {
        if (filteredTag.includes(e.key)) {
          arr.push(e);
        }
      });
      setFilteredGallery(arr);
    }
  }

  function redirectToGallery(customerId: string) {
    return navigate(`/portfolio/${params.userId}/gallery/${customerId}`);
  }

  function showAllFilter() {
    setIsAllFilter(true);
  }
  useEffect(() => {
    handleFilterGallery();
  }, [filteredTag]);
  return (
    <div>
      <div className="text-[#B6B6B6] font-bold text-lg mb-4">{alias}</div>
      <div className="space-y-4">
        <div className="">
          {filter
            .filter((_, index) => index <= (isAllFilter ? filter.length : 12))
            .map((e, index) => (
              <div
                key={index}
                className="!mb-2 inline-flex  !mr-2 cursor-pointer rounded-lg bg-[#2f353f]"
              >
                <div
                  className={`h-full filter-tag${
                    filteredTag.includes(e.key) ? "-checked" : ""
                  }-bg `}
                >
                  <Chip
                    key={index}
                    label={e.alias}
                    className={`filter-tag${
                      filteredTag.includes(e.key) ? "-checked" : ""
                    }`}
                    onClick={() => {
                      handleClickFilterTag(e.key);
                    }}
                  />
                </div>
              </div>
            ))}
          {!isAllFilter ? (
            filter.length > 12 ? (
              <div className="!mb-2 !mr-2 inline-flex cursor-pointer rounded-lg bg-[#2f353f]">
                <div className="h-full filter-tag-bg">
                  <Chip
                    label={
                      "(+" +
                      filter.filter((_, index) => index > 12).length +
                      ")"
                    }
                    className="cursor-pointer filter-tag"
                    onClick={showAllFilter}
                  />
                </div>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 3xl:grid-cols-5 lg:grid-cols-3">
          {filteredGallery.map((e, index) => (
            <div key={index} className="space-y-2">
              <div
                className="relative flex items-center justify-center h-32 bg-white xl:h-44 2xl:h-64 rounded-2xl"
                style={{
                  backgroundImage: `url(${e.thumbnail})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute bottom-0 right-0 flex items-center justify-center p-1 space-x-1 text-white bg-black w-14 bg-opacity-40 rounded-br-2xl rounded-tl-2xl">
                  <Icon className="!text-xl" icon="ri:stack-fill" />
                  <div className="text-sm font-thin">
                    {formatNumber(e.totalImages)}
                  </div>
                </div>
              </div>

              <div className="font-bold text-white">{e.alias}</div>
              <div
                className="text-[#72FFFF] flex space-x-2 items-center  cursor-pointer"
                onClick={() => {
                  redirectToGallery(e.customer_id);
                }}
              >
                <Icon icon="carbon:partnership" />
                <span className="text-sm">
                  {customer.find((f) => f.id === e.customer_id)?.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
