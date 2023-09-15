import React, { useState } from "react";
import Header from "views/components/header/header.tsx";
import { data } from "../mock.ts";
import DynamicComponent from "views/components/dynamicComponent";

function Portfolio() {
  const userInfo = data;
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div id="focus_point" className="w-full h-full sm:p-0 sm:w-2/4">
        <Header
        avatar={userInfo.personal_info.avatar_url}
        background={userInfo.personal_info.background_url}
        name={userInfo.personal_info.name}
        description={userInfo.personal_info.description}
      />
      <div className="flex flex-col justify-center m-6 space-y-4 sm:m-0">
        {userInfo.components.map((e, index) => (
          <DynamicComponent is={e.key} key={index} alias={e.alias} data={e.data} />
        ))}
      </div>
      </div>
      
    </div>
  );
}

export default Portfolio;
