import { Icon } from "@iconify/react";
import { Button, Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";
import FrontCard from "../../components/card/front";
import BackCard from "../../components/card/back";
import BackgroundBlur from "assests/card/payment-bg-blur.svg";
import { generateBankQR } from "api";

// COMPONENT
import Footer from "components/footer/index";

// ICON
import PaymentSelect from "./components/paymentSelect";
import BillInfo from "./components/billInfo";
import CustomerInfo from "./components/customerInfo";

function Component() {
  const navigate = useNavigate();
  const card = JSON.parse(localStorage.getItem("card-in-payment"));
  const [userPackage, setUserPackage] = useState({
    name: "",
    price: 0,
  });
  const [numberOfCard, setNumberOfCard] = useState(1);

  const [QRData, setQRData] = useState({
    base64: "",
    bankName: "MBBank",
    bankNo: "0070133336666",
    transferDescription: "MDH01236899PP",
    transferAmount: numberOfCard * userPackage.price,
  });

  async function genTransferQR() {
    const params = {
      accountNo: QRData.bankNo,
      accountName: QRData.bankName,
      acqId: "970422",
      template: "compact",
      amount: QRData.transferAmount.toString(),
      addInfo: QRData.transferDescription,
    };
    const res = await generateBankQR(params);
    if (res) {
      setQRData({
        ...QRData,
        transferAmount: numberOfCard * userPackage.price,
        base64: res.data.qrDataURL,
      });
    }
  }

  useEffect(() => {}, [card, userPackage]);
  useEffect(() => {
    setQRData({
      ...QRData,
      transferAmount: numberOfCard * userPackage.price,
    });
    genTransferQR();
  }, [numberOfCard, QRData.transferAmount]);

  return (
    <div className="relative flex min-h-[100vh] flex-col bg-[#1E2530]">
      <Icon
        className="absolute z-50 text-lg text-white -translate-y-1/2 cursor-pointer left-5 top-10"
        icon="ep:back"
        onClick={() => {
          navigate(-1);
          localStorage.setItem("card-in-payment", "");
        }}
      />

      <div className="z-10 flex-grow mx-5 mt-20 mb-5">
        {/* LARGE */}
        <div className="lg:grid lg:grid-cols-6 lg:gap-5 <sm:!flex <sm:!flex-col mobile:grid mobile:grid-cols-2 mobile:gap-5 ">
          <Collapse
            className="mb-6 lg:col-span-2"
            accordion={true}
            items={[
              {
                key: "1",
                label: "Xem thẻ",
                children: (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    {FrontCard({ card: card })}
                    {BackCard({ card: card })}
                  </div>
                ),
              },
            ]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            defaultActiveKey={[]}
          />
          <div className="lg:col-span-4 lg:grid lg:grid-cols-2 lg:gap-5">
            <div className="mb-3">
              <CustomerInfo />
            </div>
            <div className="space-y-3">
              <BillInfo
                numberOfCard={numberOfCard}
                setNumberOfCard={setNumberOfCard}
                userPackage={userPackage}
                setUserPackage={setUserPackage}
              />
              <PaymentSelect
                QRData={QRData}
                genTransferQR={() => genTransferQR()}
              />
              <div className="w-full mt-6">
                <Button className="w-full gradient_btn">Thanh toán</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <div className="absolute -right-5 top-0 z-0  h-[80vh] w-[100vw]">
        <img
          className="w-full h-full"
          src={BackgroundBlur}
          alt="BackgroundBlur"
        />
      </div>
    </div>
  );
}

export default Component;
