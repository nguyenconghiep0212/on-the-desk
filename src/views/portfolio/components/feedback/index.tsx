import React from "react";
import { customer } from "views/mock.ts";

function Header({ alias, data }) {
  return (
    <div>
      <div className="text-[#B6B6B6] font-bold text-lg mb-4">{alias}</div>
      <div className="flex w-full space-x-4 overflow-auto text-white ">
        {data.map((e) => (
          <div className="min-w-[200px] sm:min-w-[350px]">
            <div
              id="comment"
              className="w-full px-2 py-3 italic font-thin rounded-3xl bg-zinc-700"
            >
              {e.comment}
            </div>
            <svg
              className="ml-6"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
            >
              <path d="M10 16L20 0H0L10 16Z" fill="rgb(63, 63, 70)" />
            </svg>
            <div
              id="customer"
              className="inline-flex items-center justify-center ml-1.5 mt-1 mb-3 space-x-3  rounded-full"
            >
              <img
                src={customer.find((f) => f.id === e.customer_id)?.avata_url}
                alt="customer_avatar"
                className="bg-white border-0 rounded-full w-14 h-14"
              />
              <div className="w-20 h-full mt-[10%]">
                <span className="text-[#72FFFF] font-semibold">
                  {customer.find((f) => f.id === e.customer_id)?.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
