import React, { useEffect, useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Icon } from "@iconify/react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { formatNumber } from "helper/formatNumber.ts";
import { getGalleryByUserId, createGallery, uploadGallery } from "api";
import { GALLERY, UPDATE_GALLERY } from "interface/gallery";
import { Button, Input, Modal, Upload, UploadProps } from "antd";

function Gallery({ alias, data, userInfo, isEdit }) {
  const [newGallery, setNewGallery] = useState<UPDATE_GALLERY>({
    customerId: "",
    customerName: "",
    index: 0,
    name: "",
    data: [],
    thumb: "",
    topics: [],
    shortcut: "",
  });
  const [addVisible, setAddVisible] = useState(false);
  const { Dragger } = Upload;
  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: async (file) => await uploadFile(file, "thumb"),
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const propsChild: UploadProps = {
    name: "file",
    multiple: true,
    action: async (file) => await uploadFile(file, "data"),
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

  async function uploadFile(file, mode) {
    const fd = new FormData();
    fd.append("files", file);
    const res = await uploadGallery(fd);
    if (res) {
      if (mode === "thumb") {
        setNewGallery({
          ...newGallery,
          thumb: `https://cdn.onthedesk.vn${res.data[0]}`,
        });
      }
      if (mode === "data") {
        const arr = newGallery.data.concat([
          {
            name: "",
            ref: `https://cdn.onthedesk.vn${res.data[0]}`,
            caption: "",
            index: newGallery.data.length,
            dimension: "",
            sizeOnDisk: file.size,
          },
        ]);
        setNewGallery({
          ...newGallery,
          data: arr,
        });
      }
    }
  }

  function addAlbumData() {
    setAddVisible(true);
  }
  function addNewTag() {
    setNewGallery({ ...newGallery, topics: [...newGallery.topics, ""] });
  }
  function removeTag(i) {
    const arr = newGallery.topics.filter((el, index) => i !== index);
    setNewGallery({ ...newGallery, topics: arr });
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
          { key: "all", alias: "Tất cả" },
          res.data.topics.map((e) => {
            return { key: e, alias: e };
          }),
        ].flat();
        setFilterTag(filter);
      } else {
      }
    }
  }

  async function createNewGallery() {
    console.log(newGallery);
    const res = await createGallery(newGallery);
    if (res) {
      setAddVisible(false);
    }
  }

  useEffect(() => {
    getGalleryData();
  }, []);

  useEffect(() => {
    handleFilterGallery();
  }, [filteredTag]);
  useEffect(() => {}, [filteredGallery, newGallery]);
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

        {/* THÊM THƯ VIỆN ẢNH MỚI */}
        {isEdit && (
          <div>
            <div className="space-y-4">
              {newGallery.thumb ? (
                <div
                  className="h-[360px] rounded"
                  style={{
                    backgroundImage: `url('${newGallery.thumb}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
              ) : (
                <Dragger {...props} className="">
                  <p className="flex min-h-[360px] items-center justify-center space-x-1 text-sm font-semibold !text-white ant-upload-text">
                    <Icon icon="tabler:plus" />
                    <span> Chọn ảnh bìa</span>
                  </p>
                </Dragger>
              )}

              <Input
                placeholder="Tên album"
                bordered={false}
                className="p-0"
                onChange={(e) => {
                  setNewGallery({ ...newGallery, name: e.target.value });
                }}
              />
              <div className="grid grid-cols-5 gap-1">
                <div
                  className="cursor-pointer flex items-center justify-center px-3 py-1 text-white border border-white border-dashed rounded w-full text-[12px] space-x-1 font-semibold"
                  onClick={() => addNewTag()}
                >
                  <Icon className="w-4 h-4" icon="tabler:plus" />
                  <span> Gắn thẻ</span>
                </div>

                {newGallery.topics.map((e, i) => (
                  <div
                    key={i}
                    className="inline-flex cursor-pointer rounded-lg bg-[#2f353f]"
                  >
                    <div className="h-full filter-tag-bg">
                      <div
                        key={i}
                        className="flex items-start justify-center space-x-1 font-semibold filter-tag"
                      >
                        <div
                          className="!h-4 !w-4"
                          onClick={() => {
                            removeTag(i);
                          }}
                        >
                          <Icon
                            className="text-[#EB5757] h-4 w-4"
                            icon="tabler:trash"
                          />
                        </div>

                        <Input
                          value={e}
                          className="p-0"
                          bordered={false}
                          onChange={(e) => {
                            const arr = [...newGallery.topics];
                            arr[i] = e.target.value;
                            setNewGallery({ ...newGallery, topics: arr });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
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
              <div className="relative flex flex-col items-center justify-center h-full space-y-2 backdrop-blur">
                <div
                  className="absolute cursor-pointer top-5 right-5"
                  onClick={() => setAddVisible(false)}
                >
                  <Icon className="w-5 h-5 text-white" icon="tabler:x" />
                </div>
                <div className="flex flex-col items-center w-full h-full my-6 space-y-10 overflow-auto">
                  <div className="space-y-10">
                    {newGallery.data?.map((e, i) => (
                      <div className="relative rounded w-[255px]">
                        <div
                          className="absolute top-[6px] right-[6px] cursor-pointer"
                          onClick={() => {
                            const temp = newGallery.data.filter(
                              (f) => f.ref !== e.ref
                            );
                            setNewGallery({ ...newGallery, data: temp });
                          }}
                        >
                          <Icon
                            className="text-[#EB5757] h -4 w-4"
                            icon="tabler:trash"
                          />
                        </div>
                        <img
                          className="rounded"
                          src={e.ref}
                          alt="gallery data"
                        />
                        <Input
                          className="p-0"
                          bordered={false}
                          placeholder="Tên ảnh"
                          onChange={(e) => {
                            const temp = newGallery;
                            temp.data[i].name = e.target.value;
                            setNewGallery(temp);
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Dragger {...propsChild} className="flex h-[255px]">
                      <p className="flex w-[255px] aspect-square items-center justify-center space-x-1 text-sm font-semibold !text-white ant-upload-text">
                        <Icon icon="tabler:plus" />
                        <span> Tải ảnh lên</span>
                      </p>
                    </Dragger>
                    <div className="space-x-2 text-right">
                      <Button
                        className="!shadow-none "
                        onClick={() => setAddVisible(false)}
                      >
                        Hủy
                      </Button>
                      <Button
                        className="!shadow-none gradient_btn"
                        onClick={() => createNewGallery()}
                      >
                        Xong
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}
        {/*  */}

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
                {/* <Icon icon="carbon:partnership" className="!min-w-[16px]" /> */}
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
