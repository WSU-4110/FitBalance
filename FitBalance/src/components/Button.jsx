import React from 'react';

const Button = ({ tag, bgCol, textCol, mt }) => {
  return (
    <button
      style={{
        backgroundColor: bgCol,
        color: textCol,
        marginTop: mt ? `${mt}px` : '0', // Ensure margin-top is applied if passed
      }}
      className="rounded-3xl w-40 h-12 text-white font-medium text-xl cursor-pointer "
    >
      {tag}
    </button>
  );
};

export default Button;
