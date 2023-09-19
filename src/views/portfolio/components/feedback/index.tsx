import React from "react";
import { customer } from "views/mock.ts";
import "./index.scss";

function Header({ alias, data }) {
  return (
    <div>
      <div className="text-[#B6B6B6] font-bold text-lg mb-4">{alias}</div>
      <div className="flex w-full space-x-4 overflow-auto text-white ">
        {data.map((e, index) => (
          <div key={index} className="min-w-[200px] sm:min-w-[350px]">
            <div
              id="comment"
              className="w-full px-2 py-3 m-2 italic font-thin rounded-3xl bg-[#1e2530]"
            >
              {e.comment}
            </div>
            <div id="comment-caret"></div>
            <div id="comment-caret-shadow"></div>

            <div
              id="customer"
              className="inline-flex items-center justify-center ml-3.5 mt-2   mb-3 space-x-3  rounded-full"
            >
              <img
                src={customer.find((f) => f.id === e.customer_id)?.avatar_url}
                alt="customer_avatar"
                className="bg-white border-0 rounded-full w-14 h-14"
              />
              <div className="w-20 h-full mt-[5%]">
                <span className="text-[#72FFFF] font-semibold">
                  {customer.find((f) => f.id === e.customer_id)?.name || 'Anonymous'}
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
