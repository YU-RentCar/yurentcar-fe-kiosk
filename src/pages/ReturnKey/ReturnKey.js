import React from "react";
import TouchKey from "assets/TouchKey.png";

export const ReturnKey = () => {
  return (
    <div className="w-screen h-screen select-none">
      <div className="ml-[500px] h-full bg-sky-50 flex flex-col items-center justify-center">
        <img src={TouchKey} alt="" />
      </div>
    </div>
  );
};

export default ReturnKey;
