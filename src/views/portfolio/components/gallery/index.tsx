import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { formatNumber } from "helper/formatNumber.ts";
import { getGalleryByUserId } from "api";
import { GALLERY } from "interface/gallery";
import ThumbnailPlaceholder from "assests/gallery_thumbnail_placeholder.jpg";

function Gallery({ alias, data, userInfo }) {
  const [isAllFilter, setIsAllFilter] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [filteredGallery, setFilteredGallery] = useState<GALLERY[]>([]);
  const [filteredTag, setFilteredTag] = useState<string[]>(["all"]);
  const [filterTag, setFilterTag] = useState<{ key: string; alias: string }[]>(
    []
  );
  let [allGallery, setAllGallery] = useState<GALLERY[]>([]);

  function handleClickFilterTag(data: string) {
    if (data !== "all") {
      if (filteredTag.includes("all")) {
        filteredTag.splice(filteredTag.indexOf("all"), 1);
      }

      if (!filteredTag.includes(data)) {
        setFilteredTag([...filteredTag, data]);
      } else {
        const index = filteredTag.findIndex((e) => e === data);
        if (index > -1) {
          const arr = filteredTag.filter((e, i) => i !== index);
          setFilteredTag(arr);
        }
      }
    } else {
      setFilteredTag(["all"]);
    }
  }

  function handleFilterGallery() {
    if (filteredTag.includes("all")) {
      setFilteredGallery(allGallery);
    } else {
      const arr: any = [];
      allGallery.forEach((e) => {
        let temp = false;
        e.topics.forEach((f) => {
          if (filteredTag.includes(f)) {
            temp = true;
          }
        });
        if (temp) {
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

  async function getGalleryData() {
    const res = await getGalleryByUserId(userInfo.shortcut);
    if (res) {
      setAllGallery(res.data.gals);
      handleClickFilterTag('all')
      const filter = [
        { key: "all", alias: "Tất cả" },
        res.data.topics.map((e) => {
          return { key: e, alias: e };
        }),
      ].flat();
      setFilterTag(filter);
    }
  }
  useEffect(() => {
    getGalleryData();
  }, []);

  useEffect(() => {
    handleFilterGallery();
  }, [filteredTag]);
  return (
    <div>
      <div className="text-[#B6B6B6] font-bold text-lg mb-4">{alias}</div>
      <div className="space-y-4">
        <div className="">
          {filterTag
            .filter(
              (_, index) => index <= (isAllFilter ? filterTag.length : 12)
            )
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
                  <div
                    key={index}
                    className={`filter-tag${
                      filteredTag.includes(e.key) ? "-checked" : ""
                    }`}
                    onClick={() => {
                      handleClickFilterTag(e.key);
                    }}
                  >
                    {e.alias}
                  </div>
                </div>
              </div>
            ))}
          {!isAllFilter ? (
            filterTag.length > 12 ? (
              <div className="!mb-2 !mr-2 inline-flex cursor-pointer rounded-lg bg-[#2f353f]">
                <div className="h-full filter-tag-bg">
                  <div
                    className="cursor-pointer filter-tag"
                    onClick={showAllFilter}
                  >
                    {"(+" +
                      filterTag.filter((_, index) => index > 12).length +
                      ")"}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 3xl:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
          {filteredGallery.map((e, index) => (
            <div
              key={index}
              className="space-y-1 cursor-pointer"
              onClick={() => {
                redirectToGallery(e.customerName);
              }}
            >
              <div
                className="relative flex items-center justify-center h-32 bg-white xl:h-44 2xl:h-64 rounded-2xl"
                style={{
                  backgroundImage: `${
                    e.galleryThumb
                      ? `url(${e.galleryThumb})`
                      : `url(${ThumbnailPlaceholder})`
                  }`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute bottom-0 right-0 flex items-center justify-center p-1 space-x-1 text-white bg-black w-14 bg-opacity-40 rounded-br-2xl rounded-tl-2xl">
                  <Icon className="!text-xl" icon="ri:stack-fill" />
                  <div className="text-sm font-thin">
                    {formatNumber(e.galleryImageCount)}
                  </div>
                </div>
              </div>

              <div className="font-bold text-white">{e.galleryName}</div>
              <div className="text-[#72FFFF] flex space-x-2 items-center  cursor-pointer">
                <Icon icon="carbon:partnership" />
                <span className="text-sm">{userInfo.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
