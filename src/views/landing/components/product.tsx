import React, { useEffect, useState } from "react";
import Logo from "assests/logo.svg";
import Logo_white from "assests/logo_white.svg";
import Hero1_banner from "assests/hero_1.svg";
import Hero2_banner from "assests/hero_2.svg";
import Hero3_banner from "assests/hero_3.svg";
import Environment1 from "assests/environment_1.svg";
import Environment2 from "assests/environment_2.svg";
import Environment3 from "assests/environment_3.svg";
import Environment4 from "assests/environment_4.svg";
import Environment5 from "assests/environment_5.svg";
import Environment6 from "assests/environment_6.svg";
import Instruction_placeholder from "assests/instruction_default.svg";
import Feedback_disc from "assests/feedback_disc.svg";
import Feedback_webflow from "assests/feedback_webflow.svg";
import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Radio } from "antd";
import { Icon } from "@iconify/react";
import { fetchPackageList } from "api";

function Hero1() {
  return (
    <div className="grid grid-cols-3 gap-2 ">
      <div className="flex flex-col justify-start col-span-2 pr-6 space-y-2">
        <div className="flex space-x-2 text-[48px] italic">
          <span className="font-sans font-thin text-primary-blue-medium">
            Everythinks
          </span>
          <span className="font-sans font-bold text-primary-blue-medium">
            On The Desk
          </span>
        </div>
        <div className="font-sans text-lg font-thin tracking-wide text-white !my-6">
          Thẻ thông minh hàng đầu Việt Nam kết nối và tối ưu cho từng cá nhân và
          doanh nghiệp một cách nhanh chóng dễ dàng.
        </div>
        <div className="flex items-center space-x-3">
          <Button className="flex items-center hover:scale-105">
            <img src={Logo} alt="logo" className="w-4 mr-1" />
            <span className="font-semibold text-primary-blue-medium">
              Create
            </span>
          </Button>
          <span className="font-sans text-lg italic font-semibold text-primary-blue-medium">
            your own life with your own style
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img src={Hero1_banner} alt="hero1" className="scale-125" />
        <div className="scale-x-150 shadow" />
      </div>
    </div>
  );
}

function Hero2() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col items-center justify-center">
        <img src={Hero2_banner} alt="hero2" className="scale-125" />
      </div>
      <div className="flex flex-col items-start justify-center col-span-2 ml-4">
        <span className="text-[45px] font-sans font-bold text-primary-blue-medium">
          Cá nhân hóa
        </span>
        <span className="-mt-2 font-sans text-lg italic font-light text-primary-blue-medium">
          Phong cách của bạn là duy nhất
        </span>
        <div className="mt-3 text-white">
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:dot" />
            <span className="font-sans text-lg font-thin tracking-wide">
              Đặc quyền <span className="font-bold">thiết kế riêng</span> thẻ
              thông minh và hồ sơ trực tuyến.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:dot" />
            <span className="font-sans text-lg font-thin tracking-wide">
              Giao diện hiện đại phù hợp với phong cách và công việc của bạn.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:dot" />
            <span className="font-sans text-lg font-thin tracking-wide">
              Kết nối và chia sẻ thông tin ấn tượng ngay từ lần đầu tiên.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero3() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col justify-center col-span-2 text-white">
        <span className="text-[45px] font-sans font-bold text-primary-blue-medium">
          Tối ưu doanh nghiệp
        </span>
        <span className="-mt-2 font-sans text-lg italic font-light text-primary-blue-medium">
          Hiện đại hoá doanh nghiệp và cách vận hành
        </span>
        <div className="mt-3 text-white">
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:dot" />
            <span className="font-sans text-lg font-thin tracking-wide">
              Phát triển nội dung số chuyên nghiệp không giới hạn.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:dot" />
            <span className="font-sans text-lg font-thin tracking-wide">
              Tối ưu chi phí vận hành.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:dot" />
            <span className="font-sans text-lg font-thin tracking-wide">
              Nâng cao trải nghiệm khách hàng.
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img src={Hero3_banner} alt="hero1" className="scale-150" />
        <div className="ml-4 shadow mt-14" />
      </div>
    </div>
  );
}

function Instruction() {
  const instructions = [
    {
      url: Instruction_placeholder,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
    {
      url: Instruction_placeholder,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
    {
      url: Instruction_placeholder,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
    {
      url: Instruction_placeholder,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
    },
  ];
  return (
    <div className="flex flex-col space-y-5">
      <span className="text-[45px] font-sans font-bold text-primary-blue-medium">
        Hướng dẫn sử dụng
      </span>
      <Radio.Group
        className="w-fit"
        defaultValue="smart_card"
        buttonStyle="solid"
        onChange={() => {}}
      >
        <Radio.Button value="smart_card">Thẻ thông minh</Radio.Button>
        <Radio.Button value="online_portfolio">Hồ sơ trực tuyến</Radio.Button>
        <Radio.Button value="compatible_device">
          Thiết bị tương thích
        </Radio.Button>
      </Radio.Group>
      <div className="flex !mt-8 space-x-4">
        {instructions.map((item, index) => (
          <div
            key={index}
            className="space-y-6 transition-all duration-300 cursor-pointer default_card hover:scale-105"
          >
            <img src={item.url} alt="instruction_default" />
            <div className="text-[14px] tracking-wide font-sans font-thin">
              {item.description}
            </div>
            <div className="text-right">
              <span className="font-sans instruction_index">{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex justify-center !mt-16 space-x-3">
      <div className="small_star">*</div>
      <div className="medium_star">*</div>
      <div className="large_star">*</div>
      <div className="medium_star">*</div>
      <div className="small_star">*</div>
    </div>
  );
}

function Environment() {
  const environments = [
    {
      img: Environment1,
      header: "Kết nối một chạm",
      bold: "Thẻ thông minh",
      description:
        "On the Desk giúp bạn kết nối và chia sẻ với mọi người chỉ đơn giản bằng",
      url: " ",
      url_alias: "một chạm với Smartphone.",
    },
    {
      img: Environment2,
      header: "Lưu thông tin nhanh",
      bold: "Hồ sơ trực tuyến",
      description:
        "On the Desk giúp mọi người lưu thông tin của bạn chỉ với một nút bấm.",
      url_alias: " ",
      url: "",
    },
    {
      img: Environment3,
      header: "Liên kết thông minh",
      bold: "Dịch vụ phát triển giao diện",
      description:
        "của On the Desk giúp tạo ra hệ sinh thái phù hợp với nhu cầu của bạn.",
      url_alias: " ",
      url: "",
    },
    {
      img: Environment4,
      header: "Tự do sáng tạo",
      bold: "Thẻ thông minh và hồ sơ trực tuyến",
      description:
        " On the Desk có thể được cá nhân hóa theo phong cách của bạn.",
      url_alias: " ",
      url: "",
    },
    {
      img: Environment5,
      header: "Giao diện hiện đại",
      bold: "Thẻ thông minh và hồ sơ trực tuyến",
      description:
        " On the Desk có giao diện hiện đại và thân thiện với người dùng.",
      url_alias: " ",
      url: "",
    },
    {
      img: Environment6,
      header: "Tối ưu chi phí",
      bold: "Giải pháp tối ưu hiệu quả",
      description:
        "cho cá nhân và doanh nghiệp trong các hoạt động kinh doanh.",
      url_alias: " ",
      url: "",
    },
  ];
  return (
    <div className="flex flex-col !mt-8 items-center">
      <div className="text-primary-blue-medium text-[45px] font-bold">
        Hệ sinh thái toàn diện
      </div>
      <div className="font-sans italic font-thin tracking-wide text-center text-white">
        On the Desk cung cấp giải pháp bao gồm thẻ thông minh, hồ sơ trực tuyến
        được cá nhân hoá và dịch vụ phát triển giao diện nội dung phù hợp với
        mọi nhu cầu của cá nhân và doanh nghiệp.
      </div>

      <Button className="flex items-center mt-12 space-x-1 text-white environment_btn">
        <img src={Logo_white} alt="logo" className="w-6 pt-1 " />
        <span className="font-sans text-lg tracking-wide">Bắt đầu ngay</span>
      </Button>

      <div className="grid w-full grid-cols-3 gap-8 mt-16 gap-y-16 ">
        {environments.map((item, index) => (
          <div key={index} className="space-y-6">
            <img src={item.img} alt="environment" className="h-16" />
            <div className="font-sans text-2xl font-bold text-primary-blue-medium">
              {item.header}
            </div>
            <div className="space-x-1 font-sans font-thin tracking-wide text-white">
              <span className="font-sans font-bold">{item.bold}</span>
              <span>{item.description}</span>
              <a
                href={item.url}
                target="self"
                className="italic underline text-primary-blue-medium"
              >
                {item.url_alias}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductAndService() {
  const [packages, setPackages] = useState([]);

  async function getPackageList() {
    const res = await fetchPackageList();
    if (res) {
      setPackages(res.data);
    }
  }
  useEffect(() => {
    getPackageList();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-4 ">
      {packages.map((item: any, index: number) => (
        <div
          style={
            item.objectTarget === "Corporation"
              ? {
                  background:
                    "linear-gradient(127deg, #05224A 30.25%, #2F66B3 100%)",
                  boxShadow:
                    "2px 2px 8px 0px #001940, -2px -2px 8px 0px rgba(60, 173, 255, 0.50)",
                }
              : {}
          }
          className="relative space-y-6 default_card hover:scale-105 transition-all duration-300 cursor-pointer h-fit !px-4"
          key={index}
        >
          {/* STICKER */}
          <div className="absolute top-0 right-0 py-1 px-3 text-black rounded-bl-[18px] rounded-tr-[18px] bg-primary-blue-light-max">
            {item.objectTarget}
          </div>

          {/* CONTENT */}
          <div className="space-y-8">
            {/* NAME */}
            <div className="mt-12 font-sans text-3xl font-bold tracking-wide gradient-text text-primary-blue-medium">
              {item.name}
            </div>
            {/* DESCRIPTION */}
            <div>
              {item.features.map((item_child: string, index_child: number) => (
                <div
                  key={index_child}
                  className={`${
                    index === 1 || index === 2 ? "last:font-bold" : ""
                  } font-sans font-thin tracking-wide text-lg`}
                >
                  {item_child}
                </div>
              ))}
            </div>
            {/* PRICE */}
            <div className="ml-2">
              <div>
                {item.showContactPrice ? (
                  <div className="font-sans text-3xl font-bold tracking-wide">
                    Giá liên hệ
                  </div>
                ) : (
                  <div>
                    <div className="flex space-x-1 text-primary-blue-dark">
                      <div className="line-through">
                        {item.originalPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </div>
                      <div className="text-xs align-top">đ</div>
                    </div>
                    <div className="flex space-x-1 font-bold">
                      <div className="text-2xl ">
                        {item.promotionPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </div>
                      <div className="text-sm align-top">đ</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* BUTTON */}
            <Button className="flex items-center !mt-4 text-white environment_btn">
              <span className="text-lg tracking-wide ">
                {item.showCallMe ? (
                  <div className="flex items-center space-x-1">
                    <Icon icon="material-symbols:call-outline" />
                    <span className="font-sans font-thin">Gọi chúng tôi</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <Icon icon="mdi:cart-outline" />
                    <span className="font-sans font-thin">Đăng ký ngay</span>
                  </div>
                )}
              </span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Feedback() {
  return (
    <div>
      <div className="text-primary-blue-medium text-[45px] font-bold">
        Khách hàng hài lòng - Đối tác tin tưởng
      </div>
      {/* FEEDDBACK */}
      <div></div>

      <div className="w-1/2 mx-auto my-12 border-b-2 border-dashed border-primary-blue-medium"></div>
      <div className="grid grid-cols-6 gap-4 mb-2">
        {(() => {
          const arr = [];
          for (let i = 0; i < 6; i++) {
            if (i % 2 === 0)
              arr.push(
                <div className="flex items-center justify-center">
                  <img src={Feedback_webflow} alt="disc" />
                </div>
              );
            else
              arr.push(
                <div className="flex items-center justify-center">
                  <img src={Feedback_disc} alt="webflow" />
                </div>
              );
          }
          return arr;
        })()}
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div></div>
        {(() => {
          const arr = [];
          for (let i = 0; i < 4; i++) {
            if (i % 2 === 0)
              arr.push(
                <div className="flex items-center justify-center">
                  <img src={Feedback_webflow} alt="disc" />
                </div>
              );
            else
              arr.push(
                <div className="flex items-center justify-center">
                  <img src={Feedback_disc} alt="webflow" />
                </div>
              );
          }
          return arr;
        })()}
        <div></div>
      </div>
    </div>
  );
}

function FAQs() {
  const faq: CollapseProps["items"] = [
    {
      key: "1",
      label: "Thẻ thông minh On the Desk là gì?",
      children: (
        <div>
          Thẻ thông minh On the Desk là một loại thẻ điện tử có kích thước nhỏ
          tương tự như thẻ ngân hàng, được sử dụng để lưu trữ thông tin cá nhân
          và doanh nghiệp. Thẻ thông minh On the Desk có thể được sử dụng để
          thực hiện kết nối và chia sẻ thông tin.
        </div>
      ),
    },
    {
      key: "2",
      label: "Hồ sơ trực tuyến On the Desk là gì?",
      children: (
        <div>
          Hồ sơ trực tuyến On the Desk là một giao diện hồ sơ trên môi trường
          online chứa thông tin của cá nhân và doanh nghiệp mà ở đó cá nhân và
          doanh nghiệp được tự do thiết kế theo sở thích, kiểm soát thông tin
          muốn chia sẽ. Hồ sơ trực tuyến On the Desk có thể được sử dụng để kết
          nối với mọi người, chia sẻ thông tin hoặc tìm kiếm cơ hội.
        </div>
      ),
    },
    {
      key: "3",
      label: "Bảo mật thông tin của On the Desk",
      children: (
        <div>
          Tại On the Desk, chúng tôi hiểu rằng thông tin của bạn là quan trọng
          nhất. Chúng tôi không yêu cầu cung cấp thông tin đăng nhập các tài
          khoản mạng xã hội của bạn, các liên kết được gắn vào là những liên kết
          chia sẽ công khai của các nền tảng. Và quan trọng nhất, bạn là người
          quyết định muốn chia sẽ thông tin gì với mọi người.
        </div>
      ),
    },
    {
      key: "4",
      label: "On the Desk cung cấp những giải pháp nào?",
      children: (
        <div>
          On the Desk cung cấp giải pháp toàn diện bao gồm thẻ thông minh, hồ sơ
          trực tuyến và dịch vụ phát triển giao diện nội dung cho từng cá nhân
          và doanh nghiệp.
        </div>
      ),
    },
    {
      key: "5",
      label:
        "Thẻ thông minh và hồ sơ trực tuyến On the Desk có thể được cá nhân hóa như thế nào?",
      children: (
        <div>
          Thẻ thông minh và hồ sơ trực tuyến On the Desk có thể được cá nhân hóa
          theo phong cách và nhu cầu của người dùng. Người dùng có thể lựa chọn
          thiết kế thẻ thông minh và hồ sơ trực tuyến phù hợp với sở thích và
          công việc của mình.
        </div>
      ),
    },
    {
      key: "6",
      label:
        "Thẻ thông minh và hồ sơ trực tuyến On the Desk có thể được sử dụng cho những mục đích nào?",
      children: (
        <div>
          <div className="mb-2">
            Thẻ thông minh và hồ sơ trực tuyến On the Desk có thể được sử dụng
            cho nhiều mục đích khác nhau, bao gồm:
          </div>
          <div className="flex ">
            <Icon icon="mdi:dot" className="mt-1.5" />
            <div>
              Cá nhân: Kết nối và chia sẽ thông tin cá nhân như liên hệ, công
              việc, các hoạt động của bạn và tất cả những gì bạn muốn chia sẽ.
            </div>
          </div>
          <div className="flex ">
            <Icon icon="mdi:dot" className="mt-1.5" />
            <div>
              Doanh nghiệp: Số hoá Doanh nghiệp tiết kiệm tối đa chi phí vận
              hành.
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "7",
      label: "On the Desk có hỗ trợ khách hàng như thế nào?",
      children: (
        <div>
          On the Desk cung cấp hỗ trợ khách hàng qua điện thoại, email và chat
          trực tiếp. Khách hàng có thể liên hệ với On the Desk để được hỗ trợ
          trong quá trình sử dụng sản phẩm và dịch vụ.
        </div>
      ),
    },
    {
      key: "8",
      label: "On the Desk bảo hành như thế nào?",
      children: (
        <div>
          Chính sách bảo hành của On the Desk miễn phí đổi mới các sản phẩm bị
          lỗi từ phía nhà sản xuất (màu in không đúng với thiết kế, mã QR mờ,
          sai thông tin khách hàng, tính năng NFC lỗi). Các trường hợp sự cố
          phát sinh như gãy, làm biến dạng thẻ,... On the Desk sẽ hỗ trợ cấp lại
          thẻ với mức phí 80% giá bán thẻ tại thời điểm yêu cầu cấp lại thẻ.
          Thời hạn bảo hành thẻ là 1 năm kể từ khi khách hàng nhận được sản
          phẩm. Đối với tài khoản đăng nhập tại On the Desk và hồ sơ trực tuyến
          sẽ được bảo hành trọn đời. Khách hàng sẽ được sử dụng những phiên bản
          cập nhật mới nhất từ On the Desk.
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="text-primary-blue-medium text-[45px] font-bold ">
        FAQs
      </div>
      <div>
        <Collapse
          items={faq}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          defaultActiveKey={[]}
        />
      </div>
    </div>
  );
}
function Product() {
  return (
    <div className="py-32 space-y-36">
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <Instruction />
      <Divider />
      <Environment />
      <ProductAndService />
      <Feedback />
      <FAQs />
    </div>
  );
}

export default Product;
