import React from "react";
import "./index.css";

function Header({ background, avatar, name, description }) {
  return (
    <div className="relative flex justify-center h-3/5 ">
      <div className="flex flex-col w-full">
        <div className="w-full bg-neutral-900 h-3/4">
          <img src={background} alt="Wallpaper" className="h-full mx-auto" />
        </div>
        <div className="mt-[-60px] ml-[10%] flex items-center ">
          <img src={avatar} alt="Avatar" className="w-40 h-40 rounded-full " />
          <div className="flex flex-col mt-16 ml-4 space-y-1">
            <span className="username-desktop">{name}</span>
            <span className="description-desktop">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
