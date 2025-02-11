import React from "react";

const Button = ({ tag, bgCol, textCol, mt }) => {
  return (
    <button
      style={{
        backgroundColor: bgCol,
        color: textCol,
        marginTop: mt ? `${mt}px` : "0", // Ensure margin-top is applied if passed
      }}
      className="w-40 h-12 text-white font-medium text-xl cursor-pointer rounded-4xl  "
    >
      {tag}
    </button>
  );
};

export default Button;
