/* eslint-disable no-unused-vars */
import React from "react";
import ban from "../images/banner.jpg"; 

const Banner = () => {
  return (
    <div className="w-full h-70 bg-auto text-center">
      <img className="w-full h-70 bg-cover max-w-full" src={ban} alt="Banner" />
    </div>
  );
};

export default Banner;
