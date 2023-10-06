import React from "react";
import { platforms , keyToUrl } from "./platforms";


function Contact({ alias, data }) { 

  function onpenContact(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <div>
      <div className="text-[#B6B6B6] font-bold text-lg mb-4">{alias}</div>
      <div className="grid <3xs:grid-cols-1 grid-cols-2 gap-2 3xl:grid-cols-5 lg:grid-cols-3 ">
        {data.map((e, index) => (
          <div
            key={index}
            className="flex items-center justify-start w-full h-10 cursor-pointer"
            onClick={() => {
              onpenContact(e.url);
            }}
          >
            <div
              className="flex items-center justify-center w-10 h-[inherit] rounded-tl-md rounded-bl-md"
              style={{
                background: platforms.find((f) => f.key === e.platform)?.color,
              }}
            >
              <img
                src={
                  keyToUrl.find(
                    (item) =>
                      item.key ===
                      platforms.find((f) => f.key === e.platform)?.key
                  )?.url
                }
                alt="platform logo"
              />
            </div>
            <div
              className="flex items-center justify-start w-[calc(100%-40px)] h-[inherit] px-4 rounded-tr-md rounded-br-md"
              style={{
                background: `${
                  platforms.find((f) => f.key === e.platform)?.background_color
                }`,
              }}
            >
              <span
                className="truncate"
                style={{
                  color: ["#ffffff", "#fff"].includes(
                    platforms.find((f) => f.key === e.platform)?.color
                  )
                    ? "black"
                    : "white ",
                }}
              >
                {e.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
