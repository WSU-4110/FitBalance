import React from "react";
import Navbar from "../components/Navbar";
import { useCalories } from "./CaloriesContext"; // Import Context

const Nutritions = () => {
  const { goalCalories } = useCalories(); // Get goal calories value

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row w-full h-fit items-center justify-center ">
        <h1 className="text-2xl font-bold">
          Calories Goal: {goalCalories ? goalCalories : "Not Set"}
        </h1>
      </div>
    </>
  );
};

export default Nutritions;
