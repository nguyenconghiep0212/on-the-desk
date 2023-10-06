import facebook from "assests/logo_facebook.svg";
import behance from "assests/logo_behance.svg";
import flickr from "assests/logo_flickr.svg";
import youtube from "assests/logo_youtube.svg";
import twitter from "assests/logo_twitter.svg";
import instagram from "assests/logo_instagram.svg";
import patreon from "assests/logo_patreon.svg";
import tiktok from "assests/logo_tiktok.svg";
import zalo from "assests/landing/social_logo_zalo.svg";
import phone from "assests/landing/social_logo_phone.svg";

export const platforms = [
    {
      key: "facebook",
      alias: "Facebook",
      color: "#1877F2",
      background_color: "#18529D",
    },
    {
      key: "youtube",
      alias: "Youtube",
      color: "#FF6060",
      background_color: "#BC2F2F",
    },
    {
      key: "tiktok",
      alias: "Tiktok",
      background_color: "#C5C5C5",
      color: "#ffffff",
    },
    {
      key: "twitter",
      alias: "X",
      color: "#444444",
      background_color: "#111111",
    },
    {
      key: "instagram",
      alias: "Instagram",
      color: "#D83C7B",
      background_color: "#B62760",
    },
    {
      key: "patreon",
      alias: "Patreon",
      color: "#F53F49",
      background_color: "#BD333B",
    },
    {
      key: "behance",
      alias: "Behance",
      color: "#0149B6",
      background_color: "#0D397B",
    },
    {
      key: "flickr",
      alias: "Flickr",
      color: "#ffffff",
      background_color: "#C5C5C5",
    },
    {
        key: "zalo",
        alias: "Zalo",
        color: "#0091ff",
        background_color: "#0072c9",
      },
      { 
        key: "phone",
        alias: "Phone",
        color: "#289126",
        background_color: "#0c730a",
      },
  ];

 export const keyToUrl = [
    { key: "facebook", url: facebook },
    { key: "behance", url: behance },
    { key: "flickr", url: flickr },
    { key: "youtube", url: youtube },
    { key: "twitter", url: twitter },
    { key: "instagram", url: instagram },
    { key: "patreon", url: patreon },
    { key: "tiktok", url: tiktok },
    { key: "zalo", url: zalo },
    { key: "phone", url: phone },
  ];