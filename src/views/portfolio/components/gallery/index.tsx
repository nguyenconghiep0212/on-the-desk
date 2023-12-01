import React, { useEffect, useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { Icon } from "@iconify/react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { formatNumber } from "helper/formatNumber.ts";
import { getGalleryByUserShortcut, fetchCustomerList, deleteGallery } from "api";
import { GALLERY } from "interface/gallery";
import { Button, Select } from "antd";
// COMPONENT
import ConfirmDialog from "views/component/confirmDialog";

function Gallery({ alias, userInfo, isEdit }) {
  const params = useParams();
  const navigate = useNavigate();

  // Dialog
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [deleteGalleryId, setDeleteGalleryId] = useState("");
  //
  const [customerList, setCustomerList] = useState([]);
  const [isAllFilter, setIsAllFilter] = useState(false);
  const [filteredGallery, setFilteredGallery] = useState<GALLERY[]>([]);
  const [filteredTag, setFilteredTag] = useState<string[]>(["all"]);
  const [filterTag, setFilterTag] = useState<{ key: string; alias: string }[]>(
    []
  );
  let [allGallery, setAllGallery] = useState<GALLERY[]>([]);

  async function getCustomerList() {
    const res = await fetchCustomerList();
    if (res) {
      setCustomerList(res.data);
    }
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

  function showAllFilter() {
    setIsAllFilter(true);
  }

  async function getGalleryData() {
    const res = await getGalleryByUserShortcut(userInfo.shortcut);
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
  async function handleDeleteGallery() {
    console.log('deleteGalleryId',deleteGalleryId);
    // const res = await deleteGallery(deleteGalleryId);
    // if (res) {
    //   setFilteredGallery(
    //     filteredGallery.filter((e) => e.id !== deleteGalleryId)
    //   );
    // }
    setConfirmDialogVisible(false);
  }
  async function editGallery(customerShortcut: string) {}

  function redirectToGallery(customerShortcut: string) {
    return navigate(`/${params.userShortcut}/${customerShortcut}`);
  }

  useEffect(() => {
    getGalleryData();
    getCustomerList();
  }, []);

  useEffect(() => {
    handleFilterGallery();
  }, [filteredTag]);
  useEffect(() => {}, [filteredGallery, customerList]);
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
          <div className=" <xs:flex <xs:flex-col <xs:space-y-2 grid grid-cols-2 gap-2">
            <Button
              className="!shadow-none flex items-center space-x-1 text-left gradient_btn"
              onClick={() => {
                navigate(`/${userInfo.shortcut}/addGallery`);
              }}
            >
              <Icon className="w-[18px] h-[18px]" icon="tabler:plus" />
              <span>Tạo album mới</span>
            </Button>
            <Select
              allowClear
              className="!shadow-none !bg-[#4b5159] !border-[1px] border-solid border-white "
              placeholder={
                <div className="flex items-center justify-start px-4 space-x-1">
                  <Icon icon="ep:arrow-down-bold" />
                  <span>Thêm album vào</span>
                </div>
              }
              suffixIcon={null}
              options={customerList.map((e) => ({
                value: e.shortcut,
                label: e.customerName,
              }))}
              onChange={(e) => {
                navigate(`/${params.userShortcut}/addGallery/${e}`);
              }}
            />
          </div>
        )}
        {/*  */}

        <div className="grid grid-cols-2 gap-4 3xl:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
          {filteredGallery.map((e, index) => (
            <div
              key={index}
              className="space-y-1 cursor-pointer"
              onClick={() => {
                isEdit
                  ? editGallery(e.customerShortcut)
                  : redirectToGallery(e.customerShortcut);
              }}
            >
              <div className="relative flex items-center justify-center h-32 bg-black xl:h-44 2xl:h-64 rounded-2xl overflow-clip ">
                <LazyLoadComponent>
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url('${
                        e.galleryThumb.includes(process.env.REACT_APP_BASE_IMG)
                          ? e.galleryThumb
                          : process.env.REACT_APP_BASE_IMG + e.galleryThumb
                      }')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                </LazyLoadComponent>
                {isEdit && (
                  <div
                    className="absolute top-[6px] right-[6px] z-20 cursor-pointer"
                    onClick={() => {
                      setConfirmDialogVisible(true);
                      console.log(e);
                      setDeleteGalleryId(e.id);
                    }}
                  >
                    <Icon
                      className="text-[#EB5757] h-4 w-4"
                      icon="tabler:trash"
                    />
                  </div>
                )}
                <div className="absolute bottom-0 right-0 flex items-center justify-center px-2 py-1 space-x-1 text-white bg-black bg-opacity-40 rounded-br-2xl rounded-tl-2xl">
                  <Icon className="!text-base  " icon="ri:stack-fill" />
                  <div className="text-sm ">
                    {formatNumber(e.galleryImageCount)}
                  </div>
                </div>
              </div>

              <div className="font-bold text-white ">{e.galleryName}</div>
              <div className="flex items-center space-x-2 cursor-pointer text-primary-blue-medium">
                <span className="text-[12px] truncate font-semibold">
                  {e.customerName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDialog
        title={undefined}
        visible={confirmDialogVisible}
        type="error"
        message="Album sẽ được xoá vĩnh viễn"
        cancelText="Trở lại"
        okText="Xác nhận"
        handleOk={() => {
          handleDeleteGallery();
        }}
        handleCancel={() => setConfirmDialogVisible(false)}
      />
    </div>
  );
}

export default Gallery;
