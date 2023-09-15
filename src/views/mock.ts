import Avatar from "assests/avatar.png";
import Wallpaper from "assests/wallpaper.png";

export const data = {
  personal_info: {
    name: "Thiên Hùng",
    description: "Nhiếp ảnh gia đám cưới - sự kiện",
    avatar_url: Avatar,
    background_url: Wallpaper,
  },
  components: [
    {
      key: "contact",
      alias: "Contact",
      data: [
        {
          url: "https://www.facebook.com/",
          platform: "facebook",
          name: "hung.thien",
        },
        {
          url: "https://www.youtube.com/",
          platform: "youtube",
          name: "hung.thien",
        },
        {
          url: "https://www.facebook.com/",
          platform: "tiktok",
          name: "hung.thien",
        },
        {
          url: "https://www.tiktok.com/",
          platform: "twitter",
          name: "hung.thien",
        },
        {
          url: "https://www.instagram.com/",
          platform: "instagram",
          name: "hung.thien",
        },
        {
          url: "https://www.patreon.com/",
          platform: "patreon",
          name: "hung.thien",
        },
        {
          url: "https://www.behance.net/",
          platform: "behance",
          name: "hung.thien",
        },
        {
          url: "https://www.flickr.com/",
          platform: "flickr",
          name: "hung.thien",
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
          customer: "Linh Đào",
        },
        {
          key: "sport",
          thumbnail:
            "https://upload.wikimedia.org/wikipedia/commons/8/89/My_Dinh_National_Stadium_-_31st_SEA_Games_Men%27s_Football_Final.jpg",
          alias: "Tập ảnh bóng đá tại sân Mỹ Đình",
          totalImages: 15,
          customer: "Sân vận động Mỹ Đình",
        },
        {
          key: "sport",
          thumbnail:
            "https://cdn.tuoitre.vn/thumb_w/730/471584752817336320/2023/9/6/3756475316650223638390205498701764572324513n-1693997041404635370758.jpg",
          alias: "Thi đấu bóng chuyển nữ",
          totalImages: 63,
          customer: "Chuyển động 24h",
        },
        {
          key: "landscape",
          thumbnail:
            "https://a-z-animals.com/media/2022/11/shutterstock_606517310-1024x650.jpg",
          alias: "Stock Photo",
          totalImages: 23,
          customer: "",
        },
        {
          key: "wedding",
          thumbnail:
            "https://static.wixstatic.com/media/2dd004_540d16807def4b95b27cf94691abf678~mv2.jpg/v1/fill/w_824,h_548,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2dd004_540d16807def4b95b27cf94691abf678~mv2.jpg",
          alias: "Đám cưới Huy - Trang",
          totalImages: 85,
          customer: "Huy - Trang",
        },
        {
          key: "wedding",
          thumbnail:
            "https://i.insider.com/5d5ec22946552c2d15641a0a?width=857&format=jpeg",
          alias: "Đám cưới khách nước ngoài",
          totalImages: 1623,
          customer: "Felix",
        },
        {
          key: "wedding",
          thumbnail:
            "https://icdn.dantri.com.vn/thumb_w/680/2023/07/27/cuoi-55-edited-1690432471113.jpeg",
          alias: "Tổ chức đám cưới chuyên nghiệp",
          totalImages: 635,
          customer: "Tổ chức đám cưới chuyên nghiệp",
        },
        {
          key: "wedding",
          thumbnail:
            "https://images2.thanhnien.vn/528068263637045248/2023/8/18/anh-chup-man-hinh-2023-08-18-luc-163312-1692351352172916326898.png",
          alias: "Đám cưới Minh Tâm",
          totalImages: 93,
          customer: "Minh Tâm",
        },
        {
          key: "event",
          thumbnail:
            "https://s.wsj.net/public/resources/images/BN-OD273_obavie_P_20160523001629.jpg",
          alias: "Obama thăm chính thức Việt Nam",
          totalImages: 162,
          customer: "VTV",
        },
        {
          key: "event",
          thumbnail:
            "https://cafebiz.cafebizcdn.vn/162123310254002176/2023/6/18/untitled1-1687088977685-16870889778111468680875.png",
          alias: "AEON Mall",
          totalImages: 183,
          customer: "AEON Mall",
        },
      ],
    },
    {
      key: "feedback",
      alias: "Feedback",
      data: [
        {
          customer:'VTV',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
        },
        {
          customer:'Huy Tuấn',
          comment: 'Dịch vụ tốt, tận tình và tư vấn pose chụp rất ổn. Góp ý duy nhất là giá bạn lấy mềm quá. Mình chắc chắn sẽ trở lại vào dịp tới.',
        },
        {
          customer:'Linh Đào',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        },
      ]
    }
  ],
};

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
    color: "#444",
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
