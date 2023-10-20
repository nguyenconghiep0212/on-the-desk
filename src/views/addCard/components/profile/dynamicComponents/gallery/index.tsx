import { Icon } from "@iconify/react";
import { Input, Upload, UploadProps, message } from "antd";
import React from "react";

function Component({ alias }) {
  const { Dragger } = Upload;
  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="p-3">
      <div className="text-[#B6B6B6] font-bold  text-base mb-4">{alias}</div>
      <div className="space-y-3">
        {/* FILTER */}
        <div className="!mb-2 inline-flex  !mr-2 cursor-pointer rounded-lg bg-[#2f353f]">
          <div className={`h-full filter-tag-bg `}>
            <div className={`font-semibold filter-tag `}>Tất cả</div>
          </div>
        </div>

        {/* UPLOAD */}
        <Dragger {...props}>
          <p className="flex items-center justify-center space-x-1 text-sm font-semibold !text-white ant-upload-text">
            <Icon icon="tabler:plus" />
            <span> Tải ảnh lên</span>
          </p>
        </Dragger>

        <Input
          bordered={false}
          placeholder="Tên ảnh"
          className="px-0 text-sm font-semibold"
        />
        <div className="border border-white border-dashed rounded px-3 py-[2px] w-max text-white flex items-center space-x-1 cursor-pointer">
          <Icon icon="tabler:plus" />
          <span className="text-[12px] tracking-wide font-semibold">Gắn/Thêm nhãn</span>
        </div>
      </div>
    </div>
  );
}

export default Component;
