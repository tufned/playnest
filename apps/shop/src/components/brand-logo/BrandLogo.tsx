import React from "react";
import Image from "next/image";
import gamepadIcon from "~/assets/icons/gaming-pad.svg";

const BrandLogo = () => {
  return (
    <div className="flex justify-center items-center gap-1 w-full">
      <Image src={gamepadIcon} alt="playnest" width={30} height={30} />
      <h1 className="text-2xl font-bold">playnest</h1>
    </div>
  );
};

export default BrandLogo;
