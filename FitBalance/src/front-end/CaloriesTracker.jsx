import React from "react";
import Navbar from "../components/Navbar";

const CaloriesTracker = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className=" flex flex-col md:flex-row w-full h-[calc(100vh-80px)] ">
        <h1>Calories Tracker</h1>
      </div>
    </div>
  );
};

export default CaloriesTracker;
