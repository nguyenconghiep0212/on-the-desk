import React from "react";
 

// COMPONENT
import PackageInfo from "./packageInfo";
import PackageService from "./packageService";

function Component() {
  return (
    <div className="space-y-3">
      <PackageInfo />
      <PackageService />
    </div>
  );
}

export default Component;
