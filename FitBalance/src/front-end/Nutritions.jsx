import React from "react";
import Navbar from "../components/Navbar";
import { useCalories } from "./CaloriesContext"; // Import Context

const Nutritions = () => {
  const { goalCalories, setGoalCalories } = useCalories();

  // Ensure valid number input
  const handleOnChange = (event) => {
    const value = event.target.value;
    setGoalCalories(value); // Keep as string to prevent input blocking
  };

  // Convert goalCalories to a number for calculations
  const calorieValue = parseInt(goalCalories) || 0;

  // Calculate macronutrients
  const protein = calorieValue ? (calorieValue * 0.4).toFixed(0) : "N/A";
  const carbs = calorieValue ? (calorieValue * 0.5).toFixed(0) : "N/A";
  const fat = calorieValue ? (calorieValue * 0.1).toFixed(0) : "N/A";

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center w-full h-fit p-8">
        {/* Target Calories Box */}
        <div className="flex flex-col w-fit h-fit items-center justify-center bg-[#8AC342] px-8 py-1 rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">Target Calories:</span>
            <input
              type="number"
              className="text-center border-b-2 font-medium text-2xl border-amber-50 p-2 w-30"
              value={goalCalories} // Keep input controlled as a string
              onChange={handleOnChange}
              placeholder=""
            />
          </div>
        </div>

        {/* Macronutrient Breakdown */}
        <div className="flex flex-row justify-around w-full mt-10">
          {/* Protein */}
          <div className="border-2 border-[#8AC342] rounded-4xl p-5 flex flex-col items-center">
            <h1 className="text-2xl font-bold">Protein</h1>
            <p className="text-xl font-semibold">{protein} Calories</p>
          </div>

          {/* Carbs */}
          <div className="border-2 border-[#8AC342] rounded-4xl p-5 flex flex-col items-center">
            <h1 className="text-2xl font-bold">Carbs</h1>
            <p className="text-xl font-semibold">{carbs} Calories</p>
          </div>

          {/* Fat */}
          <div className="border-2 border-[#8AC342] rounded-4xl p-5 flex flex-col items-center">
            <h1 className="text-2xl font-bold">Fat</h1>
            <p className="text-xl font-semibold">{fat} Calories</p>
          </div>
        </div>

        <div>{/* code here */}</div>
      </div>
    </>
  );
};

export default Nutritions;
