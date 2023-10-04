import React from "react";
import { platforms } from "views/mock.ts";
import facebook from "assests/logo_facebook.svg";
import behance from "assests/logo_behance.svg";
import flickr from "assests/logo_flickr.svg";
import youtube from "assests/logo_youtube.svg";
import twitter from "assests/logo_twitter.svg";
import instagram from "assests/logo_instagram.svg";
import patreon from "assests/logo_patreon.svg";
import tiktok from "assests/logo_tiktok.svg";

function Contact({ alias, data }) {
  const keyToUrl = [
    { key: "facebook", url: facebook },
    { key: "behance", url: behance },
    { key: "flickr", url: flickr },
    { key: "youtube", url: youtube },
    { key: "twitter", url: twitter },
    { key: "instagram", url: instagram },
    { key: "patreon", url: patreon },
    { key: "tiktok", url: tiktok },
  ];
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
