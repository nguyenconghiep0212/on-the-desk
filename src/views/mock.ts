import Avatar from "assests/avatar.png";

export const filter = [
  {
    key: "all",
    alias: "Tất cả",
  },
  {
    key: "portrait",
    alias: "Chân dung",
  },
  {
    key: "landscape",
    alias: "Phong cảnh",
  },

  {
    key: "event",
    alias: "Sự kiện",
  },
  {
    key: "wedding",
    alias: "Đám cưới",
  },
  {
    key: "sport",
    alias: "Thể thao",
  },
];

export const platforms = [
  {
    image: "https://www.facebook.com/",
    key: "facebook",
    alias: "Facebook",
    color: "#1877F2",
  },
  {
    image: "https://www.youtube.com/",
    key: "youtube",
    alias: "Youtube",
    color: "#FF6060",
  },
  {
    image: "https://www.facebook.com/",
    key: "tiktok",
    alias: "Tiktok",
    color: "#ffffff",
  },
  {
    image: "https://www.tiktok.com/",
    key: "twitter",
    alias: "X",
    color: "#444444",
  },
  {
    image: "https://www.instagram.com/",
    key: "instagram",
    alias: "Instagram",
    color: "#D83C7B",
  },
  {
    image: "https://www.patreon.com/",
    key: "patreon",
    alias: "Patreon",
    color: "#F53F49",
  },
  {
    image: "https://www.behance.net/",
    key: "behance",
    alias: "Behance",
    color: "#0149B6",
  },
  {
    image: "https://www.flickr.com/",
    key: "flickr",
    alias: "Flickr",
    color: "#ffffff",
  },
];

export const data = {
  personal_info: {
    id: "thien-hung",
    name: "Thiên Hùng",
    description: "Nhiếp ảnh gia đám cưới - sự kiện",
    avatar_url: Avatar,
    background_url: [
      "https://cdn.thecollector.com/wp-content/uploads/2023/05/tips-to-become-a-great-photographer.jpg?width=1400&quality=70",
      "https://ceoworld.biz/wp-content/uploads/2021/03/wealthy-photographer.jpg",
      "https://digitalasset.intuit.com/IMAGE/A8K6wIHO2/photographer-taking-pictures-on-the-edge-of-a-cliff_INF31371.jpg",
      "https://www.shotkit.com/wp-content/uploads/2022/08/janice_sullivan_11.jpg",
    ],
  },
  components: [
    {
      key: "contact",
      alias: "Contact",
      data: [
        {
          url: "https://www.facebook.com/",
          platform: "facebook",
          name: "hung.thien85",
        },
        {
          url: "https://www.youtube.com/",
          platform: "youtube",
          name: "hungthien15",
        },
        {
          url: "https://www.facebook.com/",
          platform: "tiktok",
          name: "nguyenthienhung",
        },
        {
          url: "https://www.tiktok.com/",
          platform: "twitter",
          name: "hung.thiennguyen123",
        },
        {
          url: "https://www.instagram.com/",
          platform: "instagram",
          name: "hungthien",
        },
        {
          url: "https://www.patreon.com/",
          platform: "patreon",
          name: "hung_thien",
        },
        {
          url: "https://www.behance.net/",
          platform: "behance",
          name: "nguyenhungthien",
        },
        {
          url: "https://www.flickr.com/",
          platform: "flickr",
          name: "hung.thien123",
        },
      ],
    },
    {
      key: "gallery",
      alias: "Gallery",
      data: [
        {
          key: "portrait",
          thumbnail:
            "https://expertphotography.b-cdn.net/wp-content/uploads/2022/03/Portrait-Photographers-Steve-McCurry-Afghan-Girl.jpg",
          alias: "Album ảnh chân dung",
          totalImages: 32,
          customer_id: "linh-dao",
        },
        {
          key: "sport",
          thumbnail:
            "https://upload.wikimedia.org/wikipedia/commons/8/89/My_Dinh_National_Stadium_-_31st_SEA_Games_Men%27s_Football_Final.jpg",
          alias: "Tập ảnh bóng đá tại sân Mỹ Đình",
          totalImages: 15,
          customer_id: "san-van-dong-my-dinh",
        },
        {
          key: "sport",
          thumbnail:
            "https://cdn.tuoitre.vn/thumb_w/730/471584752817336320/2023/9/6/3756475316650223638390205498701764572324513n-1693997041404635370758.jpg",
          alias: "Thi đấu bóng chuyển nữ",
          totalImages: 63,
          customer_id: "chuyen-dong-24h",
        },
        {
          key: "landscape",
          thumbnail:
            "https://a-z-animals.com/media/2022/11/shutterstock_606517310-1024x650.jpg",
          alias: "Stock Photo",
          totalImages: 23,
          customer_id: "stock-photo",
        },
        {
          key: "wedding",
          thumbnail:
            "https://static.wixstatic.com/media/2dd004_540d16807def4b95b27cf94691abf678~mv2.jpg/v1/fill/w_824,h_548,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2dd004_540d16807def4b95b27cf94691abf678~mv2.jpg",
          alias: "Đám cưới Huy - Trang",
          totalImages: 85,
          customer_id: "huy-tuan",
        },
        {
          key: "wedding",
          thumbnail:
            "https://i.insider.com/5d5ec22946552c2d15641a0a?width=857&format=jpeg",
          alias: "Đám cưới khách nước ngoài",
          totalImages: 1623,
          customer_id: "felix",
        },
        {
          key: "wedding",
          thumbnail:
            "https://icdn.dantri.com.vn/thumb_w/680/2023/07/27/cuoi-55-edited-1690432471113.jpeg",
          alias: "Tổ chức đám cưới chuyên nghiệp",
          totalImages: 635,
          customer_id: "to-chuc-dam-cuoi",
        },
        {
          key: "wedding",
          thumbnail:
            "https://images2.thanhnien.vn/528068263637045248/2023/8/18/anh-chup-man-hinh-2023-08-18-luc-163312-1692351352172916326898.png",
          alias: "Đám cưới Minh Tâm",
          totalImages: 93,
          customer_id: "minh-tam",
        },
        {
          key: "event",
          thumbnail:
            "https://s.wsj.net/public/resources/images/BN-OD273_obavie_P_20160523001629.jpg",
          alias: "Obama thăm chính thức Việt Nam",
          totalImages: 162,
          customer_id: "vtv",
        },
        {
          key: "event",
          thumbnail:
            "https://cafebiz.cafebizcdn.vn/162123310254002176/2023/6/18/untitled1-1687088977685-16870889778111468680875.png",
          alias: "AEON Mall",
          totalImages: 183,
          customer_id: "aeonmal",
        },
      ],
    },
    {
      key: "feedback",
      alias: "Feedback",
      data: [
        {
          customer_id: "vtv",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ",
        },
        {
          customer_id: "huy-tuan",
          comment:
            "Dịch vụ tốt, tận tình và tư vấn pose chụp rất ổn. Góp ý duy nhất là giá bạn lấy mềm quá. Mình chắc chắn sẽ trở lại vào dịp tới.",
        },
        {
          customer_id: "linh-dao",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        },
      ],
    },
  ],
};

export const customer = [
  {
    id: "aeonmal",
    name: "AEON Mall",
    avata_url: "",
  },
  {
    id: "vtv",
    name: "VTV",
    avata_url:
      "https://yt3.googleusercontent.com/ZFxa8u4HBgH208wuKNpbWBuzwtpOQx-KtLCodb3xYNk8H2mfwNpXTulfaQPzOXrXL5j-7MFQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "huy-tuan",
    name: "Huy Tuấn",
    avata_url: "https://variety.com/wp-content/uploads/2022/12/Chadwick-1.jpg",
  },
  {
    id: "linh-dao",
    name: "Linh Đào",
    avata_url:
      "https://www.usnews.com/object/image/00000186-7a58-d975-aff7-fffbc8910000/iguazu-falls-stock.jpg?update-time=1677089883729&size=responsive640",
  },
  {
    id: "san-van-dong-my-dinh",
    name: "Sân vận động Mỹ Đình",
    avata_url: "",
  },
  {
    id: "chuyen-dong-24h",
    name: "Chuyển động 24h",
    avata_url: "https://vtv1.mediacdn.vn/zoom/640_400/2014/chuyen-dong-24h-1412665586489.jpg",
  },
  {
    id: "felix",
    name: "Felix",
    avata_url: "https://media.distractify.com/brand-img/UAzYE-HSn/0x0/pewdiepie-wife-japan-1601677949212.png",
  },
  {
    id: "to-chuc-dam-cuoi",
    name: "Tổ chức đám cưới",
    avata_url: "",
  },
  {
    id: "minh-tam",
    name: "Minh Tâm",
    avata_url: "",
  },
];

export const galleries = [
  {
    customer_id: "felix",
    images: [
      "https://www.weddingsutra.com/images/wedding-images/celeb_wed/celeb_wed/PewDiePie-Marzia/PewDiePie-Marzia-pic13.jpg",
      "https://e3.365dm.com/19/08/2048x1152/skynews-pewdiepie-marzi-bisognin_4751188.jpg",
      "https://i.ytimg.com/vi/7PIMiDcwNvc/maxresdefault.jpg",
      "https://i.insider.com/5d5eb86900ef2b2a7743cb92?width=1000&format=jpeg&auto=webp",
      "https://editors.dexerto.com/wp-content/uploads/thumbnails/_thumbnailLarge/PewDiePie-Marzia-full-wedding-YouTube-video.jpg",
      "https://i.insider.com/5d5ee10746552c3704365e35?width=1000&format=jpeg&auto=webp",
      "https://i2-prod.mirror.co.uk/incoming/article19008158.ece/ALTERNATES/s615b/1_tiful-bride-all-the-deets-of-their-Kew-Gardens-wedding_2339JPG.jpg",
      "https://i.dailymail.co.uk/1s/2019/08/21/16/17493974-7376249-Dapper_Pewdiepie_real_name_Felix_opted_to_offset_his_wife_during-a-64_1566401985132.jpg",
      "https://editors.dexerto.com/wp-content/uploads/2020/08/pewdiepie-marzia-first-wedding-anniversary.jpg",
    ],
  },
];
