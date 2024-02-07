import { Icon } from "@iconify/react";
import BorderedDiv from "components/borderedDiv";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  selectedMenuStore,
  userCardStore,
  userInfoStore,
} from "store/profileMenu";

function Component() {
  const [cardList] = useRecoilState(userCardStore);
  const [userInfo] = useRecoilState(userInfoStore);
  const [___, setSelectedMenu] = useRecoilState(selectedMenuStore);
  const navigate = useNavigate();

  const services = [
    {
      name: "Thẻ đã tạo",
      number: cardList.length,
      onClick() {
        setSelectedMenu("accountCard");
      },
    },
    {
      name: "Thông tin trực tuyến",
      number: 1,
      onClick() {
        navigate(`/${userInfo.shortcut}`);
      },
    },
    {
      name: "Liên hệ và kết nối",
      number: userInfo.contacts.length,
      onClick() {
        navigate(`/${userInfo.shortcut}`);
      },
    },
    {
      name: "Hồ sơ đã tạo",
      number: 1,
      onClick() {
        setSelectedMenu("accountPortfolio");
      },
    },
  ];
  return (
    <div>
      <BorderedDiv
        slot={
          <div className="space-y-3 text-white">
            <span className="opacity-50 ">TÍNH NĂNG DỊCH VỤ</span>
            {services.map((e, i) => (
              <div key={i}>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={e.onClick}
                >
                  <div className="flex items-center space-x-2 ">
                    <span className="text-lg font-bold">{e.number}</span>
                    <span>{e.name}</span>
                  </div>
                  <Icon className="opacity-50" icon="tabler:chevron-right" />
                </div>
              </div>
            ))}
          </div>
        }
        style={{
          background:
            "linear-gradient(106deg, rgba(8, 8, 8, 0.72) 0%, rgba(17, 17, 17, 0.72) 100%, rgba(8, 8, 8, 0.48) 100%)",
          padding: "18px 12px",
        }}
      />
    </div>
  );
}

export default Component;
