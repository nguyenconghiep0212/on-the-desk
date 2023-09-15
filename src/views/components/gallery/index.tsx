import React from "react";
import { filter } from "views/mock.ts";
import { Chip } from "@mui/material";
import { Icon } from "@iconify/react";
import "./index.css";

function Gallery({ alias, data }) {
  return (
    <div className="p-3 rounded-md bg-[#1E2530]">
      <div className="text-[#B6B6B6] font-bold text-lg mb-4">{alias}</div>
      <div className="space-y-4">
        <div className="">
          {filter.map((e, index) => (
            <Chip key={index} label={e.alias} className="mb-2 mr-2 cursor-pointer filter-tag" />
          ))}
        </div>
        <div className="grid gap-4 xl:grid-cols-5 sm:grid-cols-3 max-sm:grid-cols-2">
          {data.map((e, index) => (
            <div key={index} className="space-y-2">
              <div className="relative">
                <img
                  className="w-full h-32 cursor-pointer rounded-2xl"
                  src={e.thumbnail}
                  alt="thumbnail"
                />
                <div className="absolute bottom-0 right-0 flex items-center justify-center p-1 space-x-1 text-white bg-black w-14 bg-opacity-40 rounded-br-2xl rounded-tl-2xl">
                  <Icon className="text-xl" icon="ri:stack-fill"/>
                  <span>{e.totalImages}</span>
                  
                </div>
              </div>

              <div className="font-bold text-white">{e.alias}</div>
              <div className="text-[#72FFFF] flex space-x-2 items-center">
                <Icon icon="carbon:partnership" />
                <span className="text-sm"> {e.customer} </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
