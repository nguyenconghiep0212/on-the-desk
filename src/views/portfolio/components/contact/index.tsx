import React from "react";
import { platforms } from "views/mock.ts";
import facebook from "assests/logo_facebook.png";
import behance from "assests/logo_behance.png";
import flickr from "assests/logo_flickr.png";
import youtube from "assests/logo_youtube.png";
import twitter from "assests/logo_twitter.png";
import instagram from "assests/logo_instagram.png";
import patreon from "assests/logo_patreon.png";
import tiktok from "assests/logo_tiktok.png";

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
  return (
    <div>
      <div className="text-[#B6B6B6] font-bold text-lg mb-4">{alias}</div>
      <div className="grid grid-cols-2 gap-4 3xl:grid-cols-5 lg:grid-cols-3">
        {data.map((e, index) => (
          <div key={index} className="flex items-center w-full h-full ">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-tl-md rounded-bl-md"
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
              className="flex items-center justify-start w-3/4 h-10 px-4 rounded-tr-md rounded-br-md"
              style={{
                background: `${
                  platforms.find((f) => f.key === e.platform)?.background_color
                }`,
              }}
            >
              <a
              className="truncate"
                style={{
                  color: ["#ffffff", "#fff"].includes(
                    platforms.find((f) => f.key === e.platform)?.color
                  )
                    ? "black"
                    : "white ",
                }}
                href={e.url}
                target="_blank"
                rel="noreferrer"
              >
                {e.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
