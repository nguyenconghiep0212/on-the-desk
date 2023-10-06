import React from "react";

import {  useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();
  console.error(error);
  function returnToHomePage() {
    navigate("/");
  }
  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center h-full px-6 text-white opacity-60"
    >
      <div className="mb-6 text-[60px]">Oops!</div>
      <div className="text-3xl text-center">Trang bạn đang tìm kiếm không tồn tại.</div>
      <div className="text-3xl text-center">
        <a
          href="#"
          className="underline text-primary-blue-light"
          onClick={() => {
            returnToHomePage();
          }}
        >
          Trở về trang chủ
        </a>
      </div>
    </div>
  );
}
