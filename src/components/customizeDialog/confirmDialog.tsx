import { Button, Modal } from "antd";
import React from "react";
import Confirm from "assests/dialogConfirm/Confirm.svg";
import Error from "assests/dialogConfirm/Error.svg";
import "./style.scss";
import { Icon } from "@iconify/react";

function Component({
  title,
  visible,
  type,
  message,
  cancelText,
  okText,
  handleOk,
  handleCancel,
  handleClose,
}) {
  return (
    <Modal
      title=""
      open={visible}
      closeIcon={false}
      footer={null}
      className="relative confirm_dialog"
    >
      <Icon
        className="absolute right-3 top-[18px] cursor-pointer text-lg text-white"
        icon="tabler:x"
        onClick={handleClose ? () => handleClose() : () => {}}
      />

      <div className="flex flex-col items-center justify-center space-y-6 ">
        {title ? (
          <div className="flex items-center justify-start w-full space-x-3">
            <img
              className="w-5 h-5"
              src={type === "success" ? Confirm : Error}
              alt=""
            />
            <span className="text-[18px] font-bold text-white">{title}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full space-x-3">
            <img
              className="w-20 h-20"
              src={type === "success" ? Confirm : Error}
              alt=""
            />
          </div>
        )}

        <div className="text-white">{message}</div>
        <div className="flex justify-center space-x-2">
          <Button
            className="rounded-lg bg-[#1E2530] font-semibold !text-primary-blue-medium !shadow-none"
            onClick={handleCancel ? () => handleCancel() : () => {}}
          >
            {cancelText || "Cancel"}
          </Button>
          <Button
            className="gradient_btn rounded-lg font-semibold !shadow-none"
            onClick={handleOk ? () => handleOk() : () => {}}
          >
            {okText || "Ok"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default Component;
