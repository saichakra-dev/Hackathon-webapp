import React from "react";

const Nav = () => {
  return (
    <div className="w-full h-15 white flex flex-start p-3">
      <img
        className="pl-12"
        src={"/assets/icons/logo.png"}
        height={"50px"}
        alt="logo"
      />
      <div className="text-2xl font-bold black pl-3 pt-2 ">DPhi </div>
    </div>
  );
};

export default Nav;
