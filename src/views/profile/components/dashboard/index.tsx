import React from "react";
import PortflioAccess from "./portflioAccess";
import { DatePicker } from "antd";
function Component() {
  const { RangePicker } = DatePicker;

  return (
    <div className="space-y-3">
      <RangePicker className="w-full" showTime />
      <PortflioAccess />
    </div>
  );
}

export default Component;
