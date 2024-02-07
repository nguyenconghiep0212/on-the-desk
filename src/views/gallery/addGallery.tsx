import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";
// COMPONENT
import { Icon } from "@iconify/react";
import { Button, Modal, message } from "antd";
// import Feedback from "../portfolio/components/feedback/index";
import Footer from "components/footer";

// INTERFACE
import { GALLERY_CUSTOMER, UPDATE_GALLERY } from "../../interface/gallery.ts";
import { CUSTOMER } from "../../interface/customer.ts";

// COMPONENT
import ConfirmDialog from "../../components/customizeDialog/confirmDialog.tsx";
import AddForm from "./addForm.tsx";
import DisplayGallery from "./displayGallery.tsx";

// API
import {
  getGalleryByCustomerShortcut,
  getCustomerByShortcut,
  updateGallery,
  fetchCustomerList,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  deleteGallery,
} from "api";
import Header from "./header.tsx";
import { scrollToView } from "helper/scrollToView.ts";
import { normalizeVietnamese } from "helper/formatString.ts";

function Component() {
  const routeParams = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // confirm dialog
  const [confirmDialogTitle, setConfirmDialogTitle] = useState<any>(null);
  const [confirmDialogOkFnc, setConfirmDialogOkFnc] = useState(() => {});
  const [confirmDialogOkCancelFnc, setConfirmDialogCancelFnc] = useState<any>();
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [confirmDialogMode, setConfirmDialogMode] = useState("success");
  const [confirmDialogOkText, setConfirmDialogOkText] = useState("");
  const [confirmDialogCancelText, setConfirmDialogCancelText] =
    useState("Trở lại");
  const [confirmDialogMessage, setConfirmDialogMessage] = useState("");
  //
  const [customerList, setCustomerList] = useState([]);
  const customerRef = useRef(null);
  const [customerId, setCustomerId] = useState("");
  const [isEdit, setIsEdit] = useState(!!routeParams.customerShortcut);
  const [editShortcut, setEditShortcut] = useState(
    routeParams.customerShortcut,
  );
  const [formCreateShow, setFormCreateShow] = useState(true);
  const [galleries, setGalleries] = useState<GALLERY_CUSTOMER[]>([]);

  const [validator, setValidator] = useState(null);
  const [customerInfo, setCustomerInfo] = useState<CUSTOMER>({
    customerAvatar: "",
    customerCover: "",
    customerName: "",
    customerDescription: "",
    shortcut: "",
  });
  const [newGallery, setNewGallery] = useState<UPDATE_GALLERY>({
    id: "",
    customerId: "",
    customerName: "",
    index: 0,
    name: "",
    data: [],
    thumb: "",
    topics: [],
    shortcut: "",
    extended: false,
  });

  function handleBack() {
    return navigate(-1);
  }

  async function handleUpdateGallery() {
    galleries.forEach(async (e) => {
      await updateGallery(e);
    });
  }
  async function handleUpdateCustomer() {
    await updateCustomer({ ...customerInfo, id: customerId });
  }
  async function handleGetCustomerByShortcut() {
    try {
      const res = await getCustomerByShortcut(editShortcut);
      if (res) {
        setCustomerId(res.data.id);
        setCustomerInfo(res.data);
        setNewGallery({
          ...newGallery,
          customerId: res.data.id,
          customerName: res.data.customerName,
        });
      }
    } catch (error) {}
  }
  async function handleGetGalleryByCustomerShortcut() {
    try {
      const res = await getGalleryByCustomerShortcut(editShortcut);
      if (res) {
        const galleryData = res.data.gals.map((e) => {
          return {
            id: e.galleryId,
            customerId: customerId,
            customerName: e.customerName,
            index: 0,
            name: e.galleryName,
            data: e.topPictures.map((f) => ({
              name: f.name,
              caption: f.caption,
              ref: f.ref,
            })),
            thumb:
              process.env.REACT_APP_BASE_IMG +
              e.galleryThumb.replace(process.env.REACT_APP_BASE_IMG, ""),
            topics: e.topics,
            shortcut: e.galleryShortcut,
            extended: false,
          };
        });
        setGalleries([...galleryData]);
      }
    } catch (error) {}
  }

  async function handleDeleteGallery(id) {
    console.log("delete");
    await deleteGallery(id);
  }
  async function handleCreateGallery() {
    if (customerList.includes(customerInfo.customerName)) {
      setValidator("Thư viện đã tồn tại");
      setConfirmDialogVisible(false);
      scrollToView(customerRef);
      messageApi.warning("Thư viện đã tồn tại");
    } else {
      if (customerInfo.customerName) {
        customerInfo.shortcut = normalizeVietnamese(customerInfo.customerName)
          .replaceAll(" ", "-")
          .toLowerCase();
      }
      const res = await createCustomer(customerInfo);
      if (res) {
        setIsEdit(true);
        setEditShortcut(res.data.shortcut);
        setCustomerId(res.data.id);
        return res;
      }
    }
  }
  async function onSubmit() {
    if (isEdit) {
      await handleUpdateCustomer();
      await handleUpdateGallery();
      setConfirmDialogVisible(true);
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
      setConfirmDialogMessage("Hoàn thành album!");
    } else {
      handleCreateGallery();
    }
  }

  function onBack() {
    setConfirmDialogVisible(true);
    setConfirmDialogMode("error");
    setConfirmDialogTitle("Chú ý");
    if (galleries.length) {
      setConfirmDialogCancelFnc(() => () => handleBack());
      setConfirmDialogOkFnc(() => async () => {
        await handleUpdateCustomer();
        await handleUpdateGallery();
        navigate(`/${routeParams.customerShortcut}/${editShortcut}`);
      });
      setConfirmDialogOkText("Lưu và thoát");
      setConfirmDialogCancelText("Thoát");
      setConfirmDialogMessage(
        "Thay đổi của bạn chưa được lưu, xác nhận thoát chế độ chỉnh sửa ?",
      );
    } else {
      setConfirmDialogCancelFnc(() => async () => {
         if (customerId) {
          await deleteCustomer(customerId);
        }
        if (routeParams.userShortcut) {
          navigate(`/${routeParams.userShortcut}`);
        } else {
          navigate(-1);
        }
      });
      setConfirmDialogOkFnc(() => () => {
        setConfirmDialogVisible(false);
        setFormCreateShow(true);
      });
      setConfirmDialogOkText("Tạo album");
      setConfirmDialogCancelText("Hủy thư viện");
      setConfirmDialogMessage("Thư viện trống sẽ bị tự động xoá.");
    }
  }

  async function getCustomerList() {
    const res = await fetchCustomerList();
    if (res) {
      setCustomerList(res.data.map((e) => e.customerName));
    }
  }
  useEffect(() => {
    if (isEdit) {
      setFormCreateShow(true);
      handleGetCustomerByShortcut();
    }
    getCustomerList();
  }, []);
  useEffect(() => {
    if (editShortcut) {
      handleGetGalleryByCustomerShortcut();
    }
  }, [customerId]);
  return (
    <div className="flex flex-col items-center w-full h-max ">
      <div className="relative h-full w-full  pb-3 lg:!w-3/4 ">
        <Header
          customerRef={customerRef}
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
          validator={validator}
          setValidator={setValidator}
        />
        <div className="px-5 ">
          <div>
            <Button
              className="gradient_btn mt-6 flex w-full items-center space-x-1 text-left !shadow-none"
              onClick={() => setFormCreateShow(true)}
            >
              <Icon className="h-[18px] w-[18px]" icon="tabler:plus" />
              <span>Tạo album mới</span>
            </Button>
            <Modal
              className="modalFullScreen"
              open={formCreateShow}
              closeIcon={false}
              footer={null}
              afterClose={() => {
                setFormCreateShow(false);
              }}
            >
              <div className="relative h-full px-5 pb-6 backdrop-blur-[60px] before:bg-[rgb(0,0,0,0.5)]">
                <div className="sticky z-20 flex justify-end top-6">
                  <Icon
                    className="w-6 h-6 text-white cursor-pointer"
                    icon="tabler:x"
                    onClick={() => {
                      setConfirmDialogVisible(true);
                      setConfirmDialogMode("error");
                      setConfirmDialogOkFnc(() => () => {
                        setFormCreateShow(true);
                        setConfirmDialogVisible(false);
                      });
                      setConfirmDialogCancelFnc(() => () => handleBack());
                      setConfirmDialogOkText("Tiếp tục tạo");
                      setConfirmDialogMessage("Album chưa được tạo xong!");
                      setConfirmDialogTitle("Chú ý");
                      setConfirmDialogCancelText("Hủy album");
                      setFormCreateShow(false);
                    }}
                  />
                </div>

                <AddForm
                  newGallery={newGallery}
                  setNewGallery={setNewGallery}
                  customerRef={customerRef}
                  setValidator={setValidator}
                  customerInfo={customerInfo}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  editShortcut={editShortcut}
                  setEditShortcut={setEditShortcut}
                  galleries={galleries}
                  customerId={customerId}
                  setCustomerId={setCustomerId}
                  setFormCreateShow={setFormCreateShow}
                  setConfirmDialogVisible={setConfirmDialogVisible}
                  setConfirmDialogMode={setConfirmDialogMode}
                  setConfirmDialogOkFnc={setConfirmDialogOkFnc}
                  setConfirmDialogOkText={setConfirmDialogOkText}
                  setConfirmDialogMessage={setConfirmDialogMessage}
                  setConfirmDialogCancelFnc={setConfirmDialogCancelFnc}
                  setConfirmDialogCancelText={setConfirmDialogCancelText}
                  setConfirmDialogTitle={setConfirmDialogTitle}
                  customerList={customerList}
                />
              </div>
            </Modal>
          </div>

          <DisplayGallery
            galleries={galleries}
            setGalleries={setGalleries}
            setConfirmDialogVisible={setConfirmDialogVisible}
            setConfirmDialogMode={setConfirmDialogMode}
            setConfirmDialogOkFnc={setConfirmDialogOkFnc}
            setConfirmDialogOkText={setConfirmDialogOkText}
            setConfirmDialogMessage={setConfirmDialogMessage}
            handleDeleteGallery={handleDeleteGallery}
            setConfirmDialogCancelFnc={setConfirmDialogCancelFnc}
          />

          <ConfirmDialog
            title={confirmDialogTitle}
            visible={confirmDialogVisible}
            type={confirmDialogMode}
            message={confirmDialogMessage}
            cancelText={confirmDialogCancelText}
            okText={confirmDialogOkText}
            handleOk={confirmDialogOkFnc}
            handleCancel={confirmDialogOkCancelFnc}
            handleClose={() => setConfirmDialogVisible(false)}
          />
          {/* <div className="px-3 mt-3 ">
        <div className="p-3 rounded-2xl w-full bg-[#1E2530]">
            <Feedback alias={info.feedback.alias} data={info.feedback.data} />
          </div> 
        </div>*/}
        </div>
      </div>

      <div className="sticky bottom-[4.5rem] z-50 ml-[auto] w-[max-content] space-y-1">
        <div
          style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.60)" }}
          className="mr-5 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#1E2530] "
          onClick={() => {
            onBack();
          }}
        >
          <Icon className="text-lg text-[#EB5757]" icon="tabler:arrow-left" />
        </div>
        <div
          style={{ boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.60)" }}
          className="mr-5 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-[#1E2530] "
          onClick={() => {
            onSubmit();
          }}
        >
          <Icon
            className="text-lg text-primary-blue-medium"
            icon="tabler:check"
          />
        </div>
      </div>

      <div className="desktop:-translate-x-1/6 sticky bottom-0 z-50 w-[100vw] backdrop-blur">
        <Footer />
      </div>
      {contextHolder}
    </div>
  );
}

export default Component;
