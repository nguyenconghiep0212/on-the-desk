import React, { useEffect, useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Icon } from "@iconify/react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { formatNumber } from "helper/formatNumber.ts";
import { getGalleryByUserId } from "api";
import { GALLERY, UPDATE_GALLERY } from "interface/gallery";
import { Button, Input, Modal, Upload, UploadProps } from "antd";

function Gallery({ alias, data, userInfo, isEdit }) {
  const [updateGallery, setUpdateGallery] = useState<UPDATE_GALLERY>({});
  const [addVisible, setAddVisible] = useState(false);
  const { Dragger } = Upload;
  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const [isAllFilter, setIsAllFilter] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [filteredGallery, setFilteredGallery] = useState<GALLERY[]>([]);
  const [filteredTag, setFilteredTag] = useState<string[]>(["all"]);
  const [filterTag, setFilterTag] = useState<{ key: string; alias: string }[]>(
    []
  );
  let [allGallery, setAllGallery] = useState<GALLERY[]>([]);
  function addAlbumData() {
    setAddVisible(true);
  }
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
    return navigate(`/${params.userId}/${customerId}`);
  }

  function showAllFilter() {
    setIsAllFilter(true);
  }

  async function getGalleryData() {
    const res = await getGalleryByUserId(userInfo.shortcut);
    if (res) {
      if (res.data) {
        setAllGallery(res.data.gals);
        handleClickFilterTag("all");
        const filter = [
          { key: "all", alias: "Filter off" },
          res.data.topics.map((e) => {
            return { key: e, alias: e };
          }),
        ].flat();
        setFilterTag(filter);
      } else {
      }
    }
  }
  useEffect(() => {
    getGalleryData();
  }, []);

  useEffect(() => {
    handleFilterGallery();
  }, [filteredTag]);
  useEffect(() => {}, [filteredGallery]);
  return (
    <div>
      <div className="text-[#B6B6B6] font-bold  text-base mb-4">{alias}</div>
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
                    className={`font-semibold filter-tag${
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
                    className="font-semibold cursor-pointer filter-tag"
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
        {isEdit && (
          <div>
            <div className="space-y-4">
              <Dragger {...props}>
                <p className="flex items-center justify-center space-x-1 text-sm font-semibold !text-white ant-upload-text">
                  <Icon icon="tabler:plus" />
                  <span> Chọn ảnh bìa</span>
                </p>
              </Dragger>
              <Input placeholder="Tên album" bordered={false} className="p-0" />
              <div className="cursor-pointer flex items-center justify-center px-3 py-1 text-white border border-white border-dashed rounded w-max text-[12px] space-x-1 font-semibold">
                <Icon className="w-4 h-4" icon="tabler:plus" />
                <span> Gắn thẻ</span>
              </div>
            </div>

            <div className="text-right">
              <Button
                className="gradient_btn"
                onClick={() => {
                  addAlbumData();
                }}
              >
                Thêm ảnh
              </Button>
            </div>
            <Modal
              className="modalFullScreen"
              open={addVisible}
              closeIcon={false}
              footer={null}
              afterClose={() => {
                setAddVisible(false);
              }}
            >
              <div className="relative flex flex-col items-center justify-center h-full">
                <div
                  className="absolute cursor-pointer top-5 right-5"
                  onClick={() => setAddVisible(false)}
                >
                  <Icon className="w-5 h-5 text-white" icon="tabler:x" />
                </div>
              </div>
            </Modal>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 3xl:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
          {filteredGallery.map((e, index) => (
            <div
              key={index}
              className="space-y-1 cursor-pointer"
              onClick={() => {
                redirectToGallery(e.customerShortcut);
              }}
            >
              <div className="relative flex items-center justify-center h-32 bg-black xl:h-44 2xl:h-64 rounded-2xl overflow-clip ">
                <LazyLoadComponent>
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url('${e.galleryThumb}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                </LazyLoadComponent>

                <div className="absolute bottom-0 right-0 flex items-center justify-center px-2 py-1 space-x-1 text-white bg-black bg-opacity-40 rounded-br-2xl rounded-tl-2xl">
                  <Icon className="!text-base  " icon="ri:stack-fill" />
                  <div className="text-sm ">
                    {formatNumber(e.galleryImageCount)}
                  </div>
                </div>
              </div>

              <div className="font-bold text-white ">{e.galleryName}</div>
              <div className="flex items-center space-x-2 cursor-pointer text-primary-blue-medium">
                <Icon icon="carbon:partnership" className="!min-w-[16px]" />
                <span className="text-[12px] truncate">{e.customerName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
