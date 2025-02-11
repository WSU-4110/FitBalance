import React from "react";

const Button = ({ tag, bgCol, textCol, mt, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: bgCol,
        color: textCol,
        marginTop: mt ? `${mt}px` : "0",
      }}
      className="w-40 h-12 text-white font-medium text-xl cursor-pointer rounded-4xl"
    >
      {tag}
    </button>
  );
};

export default Button;
