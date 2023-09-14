import React, { useState } from "react";
import Header from "views/components/header/header.tsx";
import { data } from "../mock.ts";
import DynamicComponent from "views/components/dynamicComponent";

function Portfolio() {
  const userInfo = data;
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div id="focus_point" className="w-2/4 h-full ">
        <Header
        avatar={userInfo.personal_info.avatar_url}
        background={userInfo.personal_info.background_url}
        name={userInfo.personal_info.name}
        description={userInfo.personal_info.description}
      />
      <div className="flex flex-col justify-center space-y-4">
        {userInfo.components.map((e, index) => (
          <DynamicComponent is={e.key} key={index} alias={e.alias} data={e.data} />
        ))}
      </div>
      </div>
      
    </div>
  );
}

export default Portfolio;
