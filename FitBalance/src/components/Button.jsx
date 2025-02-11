import React from "react";

const Button = ({ tag, bgCol, textCol, mt, pxaxis, pyaxis }) => {
  return (
    <button
      style={{
        backgroundColor: bgCol,
        color: textCol,
        marginTop: mt ? `${mt}px` : "0", // Ensure margin-top is applied if passed
      }}
      className="w-fit  px-8 py-1 text-white font-medium  cursor-pointer rounded-4xl justify-center items-center"
    >
      {tag}
    </button>
  );
};

export default Button;
