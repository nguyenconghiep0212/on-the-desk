import React, { useEffect, useState } from "react";
import BorderedDiv from "components/borderedDiv";
import Divider from "components/divider";
import CardFront from "components/card/front";
import CardBack from "components/card/back";
import { deleteCard, getCardByUserProfile } from "api";
import { Button, Modal, Popover } from "antd";
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import { handleCaptureClick, handleShare } from "helper/downloadDivAsImg";
import { useRecoilState } from "recoil";
import { userCardStore } from "store/profileMenu";
function Component() {
  const navigate = useNavigate();
  const pathParams = useParams();
  const [cardList, setCardList] = useRecoilState(userCardStore);
  const [visible, setVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function redirectPaymentCard(card) {
    localStorage.setItem("card-in-payment", JSON.stringify(card));
    navigate(`/${pathParams.userShortcut}/paymentCard`);
  }
  async function handleDeleteCard(card) {
    const res = await deleteCard(card.id);
    if (res) {
      setCardList([...cardList.filter((e) => e.id !== card.id)]);
    }
  }

  useEffect(() => {}, [selectedCard]);
  return (
    <div className="space-y-[18px]">
      <BorderedDiv
        slot={
          <div className="flex items-center justify-between text-white ">
            <span className="opacity-50">THẺ ĐANG SỞ HỮU:</span>
            <span className="text-lg font-bold">{cardList.length}</span>
          </div>
        }
        style={{
          background:
            "linear-gradient(106deg, rgba(8, 8, 8, 0.72) 0%, rgba(17, 17, 17, 0.72) 100%, rgba(8, 8, 8, 0.48) 100%)",
          padding: "18px 12px",
        }}
      />
      <div className="px-3">
        <Divider />
      </div>
      <div className="">
        {cardList.length ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            {cardList.map((e, i) => (
              <div key={i} className="relative w-min">
                <div className="absolute top-0 right-0 z-20 flex m-3 space-x-2">
                  <div
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(11, 18, 28, 0.64) 0%, rgba(4, 14, 29, 0.48) 100%)",
                      backdropFilter: "blur(2px)",
                    }}
                    className="cursor-pointer rounded-lg border border-white bg-white bg-opacity-20 px-[9px] py-[6px] text-[12px] font-semibold text-white"
                    onClick={(event) => {
                      redirectPaymentCard(e);
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <Icon
                      className="text-[16px]"
                      style={{ transform: "scale(-1,1)" }}
                      icon="material-symbols:refresh"
                    />
                  </div>
                  <Popover
                    className="text-white"
                    content={
                      <div className="space-y-2">
                        <span className="text-white">
                          Bạn chắc chắn muốn xóa thẻ này?
                        </span>
                        <div className="text-right">
                          <Button
                            className="gradient_btn !shadow-sm"
                            onClick={() => handleDeleteCard(e)}
                          >
                            <Icon
                              className="text-[#EB5757]"
                              icon="tabler:trash"
                            />
                          </Button>
                        </div>
                      </div>
                    }
                    trigger="click"
                  >
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(11, 18, 28, 0.64) 0%, rgba(4, 14, 29, 0.48) 100%)",
                        backdropFilter: "blur(2px)",
                      }}
                      className="2items-center flex cursor-pointer space-x-1 rounded-lg border border-white bg-white bg-opacity-20 px-[9px] py-[6px] text-[12px] font-semibold text-white"
                    >
                      <Icon
                        icon="tabler:trash"
                        className="!h-[18px] !w-[18px] text-[#EB5757]"
                      />
                    </div>
                  </Popover>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedCard(e);
                    setVisible(true);
                  }}
                >
                  <CardFront card={e} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-start opacity-50">
            <span className="italic text-white">(Chưa có thẻ)</span>
          </div>
        )}
        <div className="flex justify-end mt-3">
          <div
            className=" flex cursor-pointer items-center space-x-2 rounded-lg border-[1px] border-solid border-white bg-[#4a545e] px-2 py-[6px] text-white "
            onClick={() => {
              navigate(`/${pathParams.userShortcut}/addCard`);
            }}
          >
            <Icon className="h-[18px] w-[18px]" icon="solar:card-outline" />
            <span className="text-[12px]">Thêm thẻ</span>
          </div>
        </div>
      </div>
      <Modal
        className="modalFullScreen"
        open={visible}
        closeIcon={false}
        footer={null}
        afterClose={() => {
          setVisible(false);
        }}
      >
        <div className="relative flex flex-col items-center justify-center h-full space-y-5 backdrop-blur">
          <Icon
            icon="tabler:x"
            className="absolute right-5 top-5 cursor-pointer text-[24px] text-white"
            onClick={() => {
              setVisible(false);
            }}
          />
          <div className="flex flex-col space-y-5 DownloadQR">
            <CardFront card={selectedCard} />
            <CardBack card={selectedCard} />
          </div>
          <div className="mt-6 flex w-[280px] items-center justify-between">
            <div className="flex justify-center space-x-3">
              <Button
                className="!border !border-solid !border-white bg-[#ffffff4d] !shadow-none"
                onClick={() => {
                  handleCaptureClick({
                    selector: ".DownloadQR",
                    fileName: "OnTheDeskQR.png",
                  });
                }}
              >
                <Icon className="h-[18px] w-[18px]" icon="tabler:download" />
              </Button>
              <Button
                className="!border !border-solid !border-white bg-[#ffffff4d] !shadow-none"
                onClick={() => {
                  handleShare(".DownloadQR");
                }}
              >
                <Icon className="h-[18px] w-[18px]" icon="uil:share" />
              </Button>
            </div>
            <div className="space-x-2">
              <Button
                className="rounded-lg !shadow-none"
                onClick={() => {
                  redirectPaymentCard(selectedCard);
                }}
              >
                <span className="text-[12px] font-semibold text-primary-blue-medium">
                  Cấp lại
                </span>
              </Button>
              <Button
                className="rounded-lg !shadow-none"
                onClick={() => {
                  handleDeleteCard(selectedCard);
                }}
              >
                <span className="text-[12px] font-semibold text-primary-blue-medium">
                  {" "}
                  Xóa thẻ
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Component;
