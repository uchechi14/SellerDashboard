/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Mobile_header = ({ sideBarItems, setSideOpen }: any) => {
  const [start_anime, setstart_anime] = useState(false);
  useEffect(() => {
    setstart_anime(true);
  }, []);

  const pathname = usePathname();

  const handle_close = () => {
    setstart_anime(false);
    setTimeout(() => {
      setSideOpen(false);
    }, 400);
  };
  return (
    <>
      <div
        onClick={handle_close}
        style={{
          transition: "0.4s linear",
        }}
        className={`  ${
          start_anime ? "bg-opacity-70" : "bg-opacity-0"
        } fixed top-0 left-0 h-[100vh] bg-black w-full z-[1000]`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            transition: "0.4s linear",
          }}
          className={`fixed top-0 w-[80%] h-full left-0 bg-white shadow-lg ease-in-out z-50 ${
            start_anime ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mt-6 ml-[10px]">
            <ul className="flex flex-col gap-[1rem]">
              {sideBarItems.map((item: any, index: any) => (
                <Link
                  href={item.href}
                  className={`flex items-center rounded-[15px] gap-[1rem] px-[1rem] py-[0.5rem]  w-fit ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-[#666666] to-[#000000] text-white"
                      : ""
                  }  `}
                  key={index}
                >
                  <item.icon className="text-[1.2rem]" />
                  <p className="text-[16px] font-Helevetica">{item.name}</p>
                </Link>
              ))}
            </ul>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default Mobile_header;
