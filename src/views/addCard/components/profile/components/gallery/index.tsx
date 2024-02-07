import { Icon } from "@iconify/react";
import { formatNumber } from "helper/formatNumber";
import React from "react";
import Preview1 from "assests/portfolio/preview_gallery_1.png";
import Preview2 from "assests/portfolio/preview_gallery_2.png";
import Preview3 from "assests/portfolio/preview_gallery_3.png";

function Component({ alias }) {
  const mock = [
    {   
      customerName: "Tên thư viện",
      galleryName: "Tên album",
      galleryThumb: Preview1,
      galleryImageCount: 16, 
    },
    {  
      customerName: "Tên thư viện",
      galleryName: "Tên album",
      galleryThumb: Preview2,
      galleryImageCount: 1246, 
    },
    {  
      customerName: "Tên thư viện",
      galleryName: "Tên album",
      galleryThumb: Preview3,
      galleryImageCount: 468, 
    },
  ];

  return (
    <div className="p-3"> 
      <div className="">
        {/* FILTER */}
        <div>
          <div className="!mb-2 !mr-2  inline-flex cursor-pointer rounded-lg bg-[#2f353f]">
            <div className={`filter-tag-bg h-full `}>
              <div className={`filter-tag-checked font-semibold  text-[12px]`}>Tất cả</div>
            </div>
          </div>
          {[1, 2, 3, 4].map((e, i) => (
            <div
              className="!mb-2 !mr-2  inline-flex cursor-pointer rounded-lg bg-[#2f353f]"
              key={i}
            >
              <div className={`filter-tag-bg h-full `}>
                <div className={`filter-tag font-semibold text-[12px]`}>nhãn {e}</div>
              </div>
            </div>
          ))}
          <div className="!mb-2 !mr-2  inline-flex cursor-pointer rounded-lg bg-[#2f353f]">
            <div className={`filter-tag-bg h-full `}>
              <div className={`filter-tag font-semibold  text-[12px]`}>(5+)</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 2xs:grid-cols-2 3xl:grid-cols-5">
          {mock.map((e, index) => (
            <div
              key={index}
              className="space-y-1 cursor-pointer"
              onClick={() => {}}
            >
              <div className="relative flex items-center justify-center bg-black aspect-square overflow-clip rounded-2xl ">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url('${e.galleryThumb}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />

                <div className="absolute bottom-0 left-0 flex items-center justify-center px-2 py-1 space-x-1 text-white bg-black rounded-bl-2xl rounded-tr-2xl bg-opacity-40">
                  <Icon className="w-5 h-5" icon="ph:stack-bold" />
                  <div className="text-[12px]">
                    {formatNumber(e.galleryImageCount)}
                  </div>
                </div>
              </div>

              <div className="font-bold text-white text-[15px]">{e.galleryName}</div>
              <div className="flex items-center space-x-2 cursor-pointer text-primary-blue-medium">
                <span className="truncate text-[12px] font-semibold">
                  {e.customerName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Component;
