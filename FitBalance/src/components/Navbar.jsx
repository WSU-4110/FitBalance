import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  
  const isNav = () => {
    setNav(!nav);
  };

  return (
    <nav className=" md:flex h-20 justify-between items-center max-w-[1024px] mx-auto">
      {/* Logo */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl md:text-4xl font-extrabold px-10 py-5.5 md:py-0 text-[#8AC342]">FitBalance</h1>

        {/* Hamburger Menu  */}
        <div onClick={isNav} className="md:hidden cursor-pointer px-5">
          {!nav ? <IoMenu size={30} /> : <AiOutlineClose size={30} />}
        </div>
      </div>

      {/* Navbar Desktop */}
      <div className="md:flex hidden">
        <ul className="flex gap-5 px-10 whitespace-nowrap">
          <li className="text-xl cursor-pointer font-medium text-[#233825] hover:text-[#707070]">Home</li>
          <li className="text-xl cursor-pointer font-medium text-[#233825] hover:text-[#707070]">Calories Tracker</li>
          <li className="text-xl cursor-pointer font-medium text-[#233825] hover:text-[#707070]">Nutrition</li>
          <li className="text-xl cursor-pointer font-medium text-[#233825] hover:text-[#707070]">Workout</li>
          <li className="text-xl cursor-pointer font-medium text-[#233825] hover:text-[#707070]">Account</li>
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`md:hidden fixed  w-[50%] h-full bg-[#8AC342] transition-transform duration-300 transform ${
          nav ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="flex flex-col pl-10">
          <li className="text-xl cursor-pointer font-medium text-white py-4">Home</li>
          <li className="text-xl cursor-pointer font-medium text-white py-4">Calories Tracker</li>
          <li className="text-xl cursor-pointer font-medium text-white py-4">Nutrition</li>
          <li className="text-xl cursor-pointer font-medium text-white py-4">Workout</li>
          <li className="text-xl cursor-pointer font-medium text-white py-4">Account</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
