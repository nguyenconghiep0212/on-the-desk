import { Icon } from "@iconify/react";
import { Input, Upload, Select, Button, UploadProps } from "antd";
import { normalizeVietnamese } from "../../helper/formatString.ts";
import React, { useEffect, useState } from "react";
import { getTopic, uploadGallery } from "api/index.ts";
import IcCamera from "assests/icon/ic-camera-blue.svg";
import { useParams } from "react-router-dom";
import { formatNumber } from "helper/formatNumber.ts";

function Component({
  galleries,
  setGalleries,
  handleDeleteGallery,
  setConfirmDialogVisible,
  setConfirmDialogMode,
  setConfirmDialogCancelFnc,
  setConfirmDialogOkFnc,
  setConfirmDialogOkText,
  setConfirmDialogMessage,
}) {
  const propsThumbGalley: UploadProps = {
    name: "file",
    multiple: false,
  };
  const propsAlbumGallery: UploadProps = {
    name: "file",
    multiple: true,
  };
  const [topicList, setTopicList] = useState([]);
  const [topicSearch, setTopicSearch] = useState("");
  const routeParams = useParams();

  async function getListTopic() {
    const res = await getTopic(routeParams.userShortcut);
    if (res) {
      setTopicList(res.data.map((e) => ({ value: e, label: e })));
    }
  }
  async function uploadFileGallery(file, e, i, mode) {
    const fd = new FormData();
    fd.append("files", file);
    const res = await uploadGallery(fd);
    if (res) {
      const items = galleries;
      const item = e;
      if (mode === "thumb") {
        item.thumb = res.data[0];
        items[i] = item;
        setGalleries([...items]);
      } else {
        item.data.push({
          name: file.name,
          caption: file.name,
          ref: res.data[0],
        });
        items[i] = item;
        setGalleries([...items]);
      }
    }
  }

  useEffect(() => {
    getListTopic();
  }, []);
  return (
    <div>
      {galleries.map((e, i) => (
        <div key={i} className="mt-6 space-y-4">
          <div className="relative">
            <div className="absolute bottom-0 left-0 flex items-center justify-center px-2 py-1 space-x-1 text-white bg-black rounded-bl-2xl rounded-tr-2xl bg-opacity-40">
              <Icon className="w-5 h-5" icon="ph:stack-bold" />
              <div className="text-sm ">{formatNumber(e.data.length)}</div>
            </div>
            <Upload
              {...{
                ...propsThumbGalley,
                action: async (file) =>
                  await uploadFileGallery(file, e, i, "thumb"),
              }}
              className="absolute z-20 upload-hidden bottom-1 right-2"
            >
              <div
                className="flex items-center justify-center w-6 h-6 rounded-lg cursor-pointer "
                style={{
                  background: "rgba(0,0,0,0.6)",
                }}
              >
                <img
                  src={IcCamera}
                  alt="IcCamera"
                  className="text-primary-blue-dark "
                />
              </div>
            </Upload>
            <div
              className="aspect-video rounded-2xl"
              style={{
                backgroundImage: `url('${
                  e.thumb.includes(process.env.REACT_APP_BASE_IMG)
                    ? e.thumb
                    : process.env.REACT_APP_BASE_IMG + e.thumb
                }')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Tên album mới"
              bordered={false}
              value={e.name}
              className="p-0 mb-4 text-sm font-bold"
              onChange={(f) => {
                const items = galleries;
                const item = e;
                item.name = f.target.value;
                items[i] = item;
                setGalleries([...items]);
              }}
            />

            <Icon
              className="h-5 w-5 cursor-pointer text-[#EB5757]"
              icon="tabler:trash"
              onClick={() => {
                 setConfirmDialogVisible(true);
                setConfirmDialogMode("error");
                setConfirmDialogCancelFnc(
                  () => () => setConfirmDialogVisible(false),
                );
                setConfirmDialogOkFnc(() => {
                  handleDeleteGallery(e.id);
                  setGalleries([
                    ...galleries.filter((f) => f.id !== e.id),
                  ]);
                  setConfirmDialogVisible(false);
                });
                setConfirmDialogOkText("Xác nhận");
                setConfirmDialogMessage("Album sẽ được xoá vĩnh viễn");
              }}
            />
          </div>
          <div>
            {e.topics.map((f, j) => (
              <div
                key={j}
                className="mb-2 mr-2 inline-flex cursor-pointer rounded-lg bg-[#2f353f]"
              >
                <div className="h-full filter-tag-bg">
                  <div className="flex items-start justify-center space-x-1 font-semibold filter-tag">
                    <span className="font-semibold text-primary-blue-medium">
                      {f}
                    </span>
                    <div
                      className="!h-4 !w-4"
                      onClick={() => {
                        const items = galleries;
                        const item = e;
                        item.topics = item.topics.filter(
                          (_, index) => j !== index,
                        );
                        items[i] = item;
                        setGalleries([...items]);
                      }}
                    >
                      <Icon
                        className="h-4 w-4 text-[#EB5757]"
                        icon="tabler:trash"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative w-full">
            <Icon
              className="absolute left-0 w-6 h-8 text-primary-blue-medium "
              icon="ci:tag"
              style={{ transform: "scale(-1, 1)" }}
            />
            <Select
              showSearch
              className="w-full text-white topic-select"
              placeholder={
                <div className="flex items-start w-full space-x-1 text-white pl-7 ">
                  <span>Gắn nhãn</span>
                </div>
              }
              optionFilterProp="children"
              onChange={(value) => {
                const items = galleries;
                const item = e;
                item.topics.push(value);
                items[i] = item;
                setGalleries([...items]);
              }}
              filterOption={(
                input: string,
                option?: { label: string; value: string },
              ) =>
                normalizeVietnamese(option?.label || "")
                  .toLowerCase()
                  .includes(normalizeVietnamese(input).toLowerCase())
              }
              bordered={false}
              dropdownRender={(menu) => (
                <div className="gradient">
                  {!topicList
                    .map((f) => f.value.toLowerCase())
                    .includes(topicSearch.toLowerCase()) &&
                  !e.topics
                    .map((f) => f.toLowerCase())
                    .includes(topicSearch.toLowerCase()) &&
                  topicSearch.trim() ? (
                    <Button
                      className="  flex w-full justify-start !shadow-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.31) 0%, rgba(255, 255, 255, 0.08) 100%)",
                      }}
                      onClick={() => {
                        const items = galleries;
                        const item = e;
                        item.topics.push(topicSearch);
                        items[i] = item;
                        setGalleries([...items]);
                        setTopicSearch("");
                      }}
                    >
                      Thêm nhãn {topicSearch}
                    </Button>
                  ) : (
                    <></>
                  )}

                  {menu}
                </div>
              )}
              options={topicList.filter((tp) => !e.topics.includes(tp.value))}
              onSearch={setTopicSearch}
            />
            <Icon
              className="absolute top-0 right-0 w-6 h-8 text-white"
              icon="tabler:plus"
            />
          </div>
          <div className="grid grid-cols-3 gap-[2px] ">
            {e.data.map((f, j) => (
              <div
                key={j}
                className={`${
                  e.extended || (j > 8 && `hidden`)
                } relative aspect-square`}
              >
                {e.extended ? (
                  <div className=" absolute right-1 top-1 rounded-full bg-[#0000004d] p-1">
                    <Icon
                      className="h-6 w-6 cursor-pointer text-[#EB5757]"
                      icon="tabler:trash"
                      onClick={() => {
                        const items = galleries;
                        const item = e;
                        item.data = item.data.filter((_, i) => i !== j);
                        items[i] = item;
                        setGalleries([...items]);
                      }}
                    />
                  </div>
                ) : (
                  j !== 8 && (
                    <div className=" absolute right-1 top-1 rounded-full bg-[#0000004d] p-1">
                      <Icon
                        className="h-6 w-6 cursor-pointer text-[#EB5757]"
                        icon="tabler:trash"
                        onClick={() => {
                          const items = galleries;
                          const item = e;
                          item.data = item.data.filter((_, i) => i !== j);
                          items[i] = item;
                          setGalleries([...items]);
                        }}
                      />
                    </div>
                  )
                )}
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url('${
                      f.ref.includes(process.env.REACT_APP_BASE_IMG)
                        ? f.ref
                        : process.env.REACT_APP_BASE_IMG + f.ref
                    }')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
                {e.extended ||
                  (j === 8 && (
                    <div>
                      <div className="absolute top-0 left-0 z-20 w-full h-full bg-black opacity-50 " />
                      <div
                        className="absolute top-0 left-0 z-30 flex items-center justify-center w-full h-full text-white cursor-pointer"
                        onClick={() => {
                          const items = galleries;
                          const item = e;
                          item.extended = true;
                          items[i] = item;
                          setGalleries([...items]);
                        }}
                      >
                        <span className="text-lg font-semibold">
                          +{[...e.data].splice(8, e.data.length).length}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
          <div className=" lg:flex lg:justify-end lg:space-x-2 lg:space-y-0">
            <Upload
              {...{
                ...propsAlbumGallery,
                action: async (file) =>
                  await uploadFileGallery(file, e, i, "album"),
              }}
              className="flex w-full h-6 upload_new_gallery_album upload-hidden lg:w-max"
            >
              <div
                className="flex w-[inherit] cursor-pointer items-center justify-center rounded "
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.08) 100%)",
                }}
              >
                <Button className=" border-1 w-full !border-solid !border-white !bg-[#6b6c6d] !shadow-none">
                  <div className="flex items-center justify-center space-x-1">
                    <Icon className="w-4 h-4" icon="tabler:plus" />
                    <span>Thêm ảnh</span>
                  </div>
                </Button>
              </div>
            </Upload>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Component;
