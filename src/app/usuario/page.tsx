"use client";

import React from "react";
import Image from "next/image";
import TableCustom from "./_partials/TableCustom";

/* eslint-disable */
const UserPage = () => {
  /* eslint-enable */
  return (
    <div>
      <div className="mx-auto bg-[url('/images/bg.png')] bg-cover w-full h-20 flex justify-between items-center bg-red-600">
        <Image
          src="/images/topbar.png"
          alt="title"
          width={106}
          height={27}
          className="h-[27px] w-[106px] ml-14"
        />
        <Image src="/images/login.png" alt="title" width={32} height={32} className=" h-8 w-8 mr-14" />
      </div>
      <div className="px-14">
        <h2 className="text-2xl font-semibold my-12">Historial de registro</h2>
        <TableCustom />
      </div>
    </div>
  );
};

export default UserPage;
