import { Icon } from "@iconify/react";
import {
  Input,
  Upload,
  Select,
  Button,
  message,
  UploadProps,
  Modal,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { normalizeVietnamese } from "../../helper/formatString.ts";
import React, { useEffect, useState } from "react";

// ASSEST
import IcCamera from "assests/icon/ic-camera-blue.svg";
import { createCustomer, createGallery, getTopic, uploadGallery } from "api";
import { useNavigate, useParams } from "react-router-dom";
import { scrollToView } from "helper/scrollToView.ts";

function Component({
  newGallery,
  setNewGallery,
  customerRef,
  setValidator,
  customerInfo,
  isEdit,
  setIsEdit,
  editShortcut,
  setEditShortcut,
  galleries,
  customerList,
  customerId,
  setCustomerId,
  setFormCreateShow,
  setConfirmDialogVisible,
  setConfirmDialogMode,
  setConfirmDialogCancelFnc,
  setConfirmDialogCancelText,
  setConfirmDialogOkFnc,
  setConfirmDialogOkText,
  setConfirmDialogMessage,
  setConfirmDialogTitle,
}) {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [topicList, setTopicList] = useState([]);
  const [topicSearch, setTopicSearch] = useState("");
  const [fullFormAlbum, setFullFormAlbum] = useState(false);
  const propsThumbNewGalley: UploadProps = {
    name: "file",
    multiple: false,
    action: async (file) => await uploadFileNewGallery(file, "thumb"),
  };
  const propsAlbumNewGallery: UploadProps = {
    name: "file",
    multiple: true,
    action: async (file) => await uploadFileNewGallery(file, "album"),
  };

  async function uploadFileNewGallery(file, mode) {
    const fd = new FormData();
    fd.append("files", file);
    const res = await uploadGallery(fd);
    if (res) {
      if (mode === "thumb") {
        setNewGallery({ ...newGallery, thumb: res.data[0] });
      } else {
        const arr: any = newGallery.data;
        arr.push({ name: file.name, caption: file.name, ref: res.data[0] });
        setNewGallery({
          ...newGallery,
          data: arr,
        });
      }
    }
  }

  async function getListTopic() {
    const res = await getTopic(routeParams.userShortcut);
    if (res) {
      setTopicList(res.data.map((e) => ({ value: e, label: e })));
    }
  }
  async function handleAddMoreGallery() {
    const params = {
      ...newGallery,
      customerId: customerId,
    };
    const res = await createGallery(params);
    if (res) {
      addGallery(res);
      return res;
    }
  }
  async function addGallery(resGal) {
    setFormCreateShow(false);
    galleries.unshift({
      id: resGal.data.id,
      customerId: resGal.data.customerId,
      customerName: resGal.data.customerName,
      index: resGal.data.index,
      name: resGal.data.name,
      data: resGal.data.data.map((f) => ({
        name: f.name,
        caption: f.caption,
        ref: f.ref,
      })),
      thumb: resGal.data.thumb,
      topics: resGal.data.topics,
      shortcut: resGal.data.shortcut,
    });
    setNewGallery({
      id: "",
      customerId: "",
      customerName: "",
      index: 0,
      name: "",
      data: [],
      thumb: "",
      topics: [],
      shortcut: "",
    });
  }

  async function handleCreateGallery() {
    if (customerList.includes(customerInfo.customerName)) {
      setValidator("Thư viện đã tồn tại");
      setConfirmDialogVisible(false);
      scrollToView(customerRef);
      messageApi.warning("Thư viện đã tồn tại");
    } else {
      customerInfo.shortcut = normalizeVietnamese(customerInfo.customerName)
        .replaceAll(" ", "-")
        .toLowerCase();
      const res = await createCustomer(customerInfo);
      if (res) {
        setIsEdit(true);
        setEditShortcut(res.data.shortcut);
        setCustomerId(res.data.id);
        const params = {
          ...newGallery,
          customerName: res.data.customerName,
          customerId: res.data.id,
        };
        const resGal = await createGallery(params);
        if (resGal) {
          addGallery(resGal);
        }
        return res;
      }
    }
  }

  async function onSubmit() {
    if (isEdit) {
      if (newGallery.name && newGallery.topics.length) {
        const res = await handleAddMoreGallery();
        if (res) {
          setFormCreateShow(false);
          setConfirmDialogVisible(true);
        } else {
          messageApi.error("Xảy ra lỗi trong quá trình thêm thư viện!!");
        }
        setPopupConfirm();
      } else {
        messageApi.warning(
          `Vui lòng ${newGallery.name ? "" : "nhập tên album"}${
            !newGallery.name && !newGallery.topics.length ? ", " : ""
          }${newGallery.topics.length ? "" : "gán nhãn"}  `,
        );
      }
    } else {
      if (customerList.includes(customerInfo.customerName)) {
        setValidator("Thư viện đã tồn tại");
        scrollToView(customerRef);
        messageApi.warning("Thư viện đã tồn tại");
      } else {
        if (newGallery.name && newGallery.topics.length) {
          const res = await handleCreateGallery();
          if (res) {
            setFormCreateShow(false);
            setConfirmDialogVisible(true);
          } else {
            messageApi.error("Xảy ra lỗi trong quá trình thêm thư viện!!");
          }
          setPopupConfirm();
        } else {
          messageApi.warning(
            `Vui lòng ${newGallery.name ? "" : "nhập tên album"}${
              !newGallery.name && !newGallery.topics.length ? ", " : ""
            }${newGallery.topics.length ? "" : "gán nhãn"}  `,
          );
        }
      }
    }

    function setPopupConfirm() {
      setConfirmDialogCancelText("Tiếp tục thêm");
      setConfirmDialogTitle(null);
      setConfirmDialogMode("success");
      setConfirmDialogCancelFnc(() => () => {
        setFormCreateShow(true);
        setConfirmDialogVisible(false);
      });
      setConfirmDialogOkFnc(
        () => () =>
          navigate(`/${routeParams.customerShortcut}/${editShortcut}`),
      );
      setConfirmDialogOkText("Xem album");
      setConfirmDialogMessage(
        isEdit ? "Cập nhật album thành công!" : "Tạo album thành công!",
      );
    }
  }

  useEffect(() => {
    getListTopic();
  }, []);
  return (
    <div className="space-y-5 mt-9">
      {newGallery.thumb ? (
        <div className="relative">
          <Upload
            {...propsThumbNewGalley}
            className="absolute z-20 upload-hidden bottom-5 right-5"
          >
            <div
              className="flex items-center justify-center w-6 h-6 rounded cursor-pointer "
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.08) 100%)",
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
            className="rounded aspect-video"
            style={{
              backgroundImage: `url('${process.env.REACT_APP_BASE_IMG}${newGallery.thumb}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </div>
      ) : (
        <Dragger {...propsThumbNewGalley} className="">
          <p className=" ant-upload-text flex min-h-[360px] items-center justify-center space-x-1 text-sm font-semibold !text-white">
            <Icon icon="tabler:plus" />
            <span> Tải ảnh bìa album</span>
          </p>
        </Dragger>
      )}
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Tên album bắt buộc"
          bordered={false}
          value={newGallery.name}
          className="p-0 mb-4 text-sm font-bold"
          onChange={(e) => {
            setNewGallery({ ...newGallery, name: e.target.value });
          }}
        />
        {newGallery.name && (
          <Icon
            className="h-5 w-5 cursor-pointer text-[#EB5757]"
            icon="tabler:trash"
            onClick={() => {
              setFormCreateShow(false);
              setConfirmDialogVisible(true);
              setConfirmDialogMode("error");
              setConfirmDialogOkFnc(() => () => {
                setNewGallery({
                  customerId: "",
                  customerName: "",
                  index: 0,
                  name: "",
                  data: [],
                  thumb: "",
                  topics: [],
                  shortcut: "",
                });
                setConfirmDialogVisible(false);
              });
              setConfirmDialogCancelFnc(() => () => {
                setFormCreateShow(true);
                setConfirmDialogVisible(false);
              });
              setConfirmDialogOkText("Xác nhận");
              setConfirmDialogMessage("Album sẽ được xoá vĩnh viễn");
            }}
          />
        )}
      </div>
      <div>
        {newGallery.topics.map((e, i) => (
          <div
            key={i}
            className="mb-2 mr-2 inline-flex cursor-pointer rounded-lg bg-[#2f353f]"
          >
            <div className="h-full filter-tag-bg">
              <div
                key={i}
                className="flex items-start justify-center space-x-1 font-semibold filter-tag"
              >
                <span className="font-semibold text-primary-blue-medium">
                  {e}
                </span>
                <div
                  className="!h-4 !w-4"
                  onClick={() => {
                    const arr = newGallery.topics.filter(
                      (el, index) => i !== index,
                    );
                    setNewGallery({ ...newGallery, topics: arr });
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
            <div className="flex w-full items-start space-x-1 pl-7 text-[rgb(255,255,255,0.6)] ">
              <span>Gắn nhãn bắt buộc</span>
            </div>
          }
          value={null}
          optionFilterProp="children"
          onChange={(e) => {
            setNewGallery({
              ...newGallery,
              topics: [...newGallery.topics, e],
            });
          }}
          filterOption={(
            input: string,
            option?: { label: string; value: string },
          ) =>
            normalizeVietnamese(option?.label || "")
              .toLowerCase()
              .includes(normalizeVietnamese(input).toLowerCase())
          }
          dropdownRender={(menu) => (
            <div className="gradient">
              {!topicList
                .map((f) => f.value.toLowerCase())
                .includes(topicSearch.toLowerCase()) &&
              !newGallery.topics
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
                    setNewGallery({
                      ...newGallery,
                      topics: [...newGallery.topics, topicSearch],
                    });
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
          bordered={false}
          options={topicList.filter(
            (tp) => !newGallery.topics.includes(tp.value),
          )}
          onSearch={setTopicSearch}
        />
        <Icon
          className="absolute top-0 right-0 w-6 h-8 text-white"
          icon="tabler:plus"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 ">
        {newGallery.data.map((e, index) => (
          <div
            key={index}
            className={`${index > 8 && `hidden`} relative aspect-square`}
          >
            {index !== 8 && (
              <div className=" absolute right-1 top-1 rounded-full bg-[#0000004d] p-1">
                <Icon
                  className="h-6 w-6 cursor-pointer text-[#EB5757]"
                  icon="tabler:trash"
                  onClick={() => {
                    setNewGallery({
                      ...newGallery,
                      data: newGallery.data?.filter((_, i) => i !== index),
                    });
                  }}
                />
              </div>
            )}

            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url('${process.env.REACT_APP_BASE_IMG}${e.ref}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            {index === 8 && (
              <div>
                <div className="absolute top-0 left-0 z-20 w-full h-full bg-black opacity-50 " />
                <div
                  className="absolute top-0 left-0 z-30 flex items-center justify-center w-full h-full text-white cursor-pointer"
                  onClick={() => {
                    setFullFormAlbum(true);
                  }}
                >
                  <span className="text-lg font-semibold">
                    +
                    {
                      [...newGallery.data].splice(8, newGallery.data.length)
                        .length
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {newGallery.data.length ? (
        <> </>
      ) : (
        <div className="!m-0 flex items-center justify-center italic text-white opacity-60">
          (Chưa có hình ảnh)
        </div>
      )}
      <Upload
        {...propsAlbumNewGallery}
        className="flex w-full upload_new_gallery_album upload-hidden"
      >
        <div
          className="flex items-center justify-center w-full rounded cursor-pointer "
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
      <Button
        className="gradient_btn sticky bottom-3 z-20 w-full !shadow-none"
        onClick={() => {
          onSubmit();
        }}
      >
        Hoàn thành
      </Button>
      <Modal
        className="modalFullScreen"
        open={fullFormAlbum}
        closeIcon={false}
        footer={null}
        afterClose={() => {
          setFullFormAlbum(false);
        }}
      >
        <div className="flex h-full min-h-screen flex-col p-5 backdrop-blur-[60px] before:bg-[rgb(0,0,0,0.5)]">
          <div className="flex justify-end">
            <Icon
              icon="tabler:x"
              className="w-6 h-6 text-white cursor-pointer"
              onClick={() => {
                setFullFormAlbum(false);
              }}
            />
          </div>
          <div className="my-[18px] flex-1 overflow-auto">
            <div className="grid grid-cols-3 gap-2 ">
              {newGallery.data.map((e, index) => (
                <div key={index} className="relative aspect-square">
                  <div className=" absolute right-1 top-1 rounded-full bg-[#0000004d] p-1">
                    <Icon
                      className="h-6 w-6 cursor-pointer text-[#EB5757]"
                      icon="tabler:trash"
                      onClick={() => {
                        setNewGallery({
                          ...newGallery,
                          data: newGallery.data?.filter((_, i) => i !== index),
                        });
                      }}
                    />
                  </div>

                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url('${process.env.REACT_APP_BASE_IMG}${e.ref}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <Upload
            {...propsAlbumNewGallery}
            className="sticky flex w-full upload_new_gallery_album upload-hidden bottom-3"
          >
            <div
              className="flex items-center justify-center w-full rounded cursor-pointer "
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
      </Modal>
      {contextHolder}
    </div>
  );
}

export default Component;
