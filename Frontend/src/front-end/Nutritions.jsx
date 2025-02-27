import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Nutritions = () => {
  // State to hold food data
  const [foods, setFoods] = useState({
    protein: [
      { name: "Chicken Breast", caloriesPer100g: 165, proteinPer100g: 31, weight: 0 },
      { name: "Chicken Thigh", caloriesPer100g: 200, proteinPer100g: 25, weight: 0 },
      { name: "Fish", caloriesPer100g: 150, proteinPer100g: 20, weight: 0 },
      { name: "Shrimp", caloriesPer100g: 200, proteinPer100g: 24, weight: 0 },
      { name: "Beef", caloriesPer100g: 250, proteinPer100g: 26, weight: 0 },
      { name: "Eggs", caloriesPer100g: 200, proteinPer100g: 12, weight: 0 },
      { name: "Turkey", caloriesPer100g: 135, proteinPer100g: 29, weight: 0 },
    ],
    carbs: [
      { name: "Bread", caloriesPer100g: 300, carbsPer100g: 50, weight: 0 },
      { name: "Rice", caloriesPer100g: 300, carbsPer100g: 80, weight: 0 },
      { name: "Oats", caloriesPer100g: 300, carbsPer100g: 70, weight: 0 },
    ],
    fats: [
      { name: "Avocados", caloriesPer100g: 300, fatPer100g: 15, weight: 0 },
      { name: "Nuts", caloriesPer100g: 600, fatPer100g: 50, weight: 0 },
      { name: "Nut Butters", caloriesPer100g: 550, fatPer100g: 45, weight: 0 },
    ],

  });

  const handleInputChange = (foodCategory, index, value) => {
    const updatedFoods = { ...foods };
    // Ensure the value is not negative
    const newWeight = Math.max(0, parseInt(value) || 0);
    updatedFoods[foodCategory][index].weight = newWeight;

    // Update the state with the new food data (weight) entered by the user
    setFoods(updatedFoods);
  };

  const calculateCaloriesAndProtein = (category, index) => {
    const foodItem = foods[category][index];
    const weightInGrams = foodItem.weight;
    const calories = (weightInGrams / 100) * foodItem.caloriesPer100g;
    const protein = category === "protein" ? (weightInGrams / 100) * foodItem.proteinPer100g : 0;

    return { calories: calories.toFixed(1), protein: protein.toFixed(1) };
  };

  const renderFoodList = (category) => {
    return foods[category].map((food, index) => {
      const { calories, protein } = calculateCaloriesAndProtein(category, index);

      return (
        <li key={index} className="flex justify-between items-center">
          <span>{food.name}</span>
          <div className="flex items-center">
            <input
              type="number"
              id={`${food.name}-input`}
              className="w-16 p-1 border rounded text-center"
              placeholder="100"
              value={food.weight}
              onChange={(e) => handleInputChange(category, index, e.target.value)}
            />
            <span className="ml-1">g</span>
          </div>
          <div className="text-right">
            <span>{calories} Cal</span> / <span>{protein}g Protein</span>
          </div>
        </li>
      );
    });
  };

  const calculateTotalForCategory = (category) => {
    return foods[category].reduce(
      (totals, food) => {
        const { calories, protein } = calculateCaloriesAndProtein(category, foods[category].indexOf(food));
        totals.calories += parseFloat(calories);
        totals.protein += parseFloat(protein);
        return totals;
      },
      { calories: 0, protein: 0 }
    );
  };

  const proteinTotal = calculateTotalForCategory("protein");
  const carbsTotal = calculateTotalForCategory("carbs");
  const fatsTotal = calculateTotalForCategory("fats");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-col items-center mt-6 px-4 md:px-20">
        {/* Goal Calories Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Goal Calories = <span className="text-green-500">1,810 Cal</span>
          </h1>
        </div>

        {/* Main Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Protein Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
              {proteinTotal.calories} Cal
            </h2>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-6">Protein</h3>
            <ul className="space-y-4">
              {renderFoodList("protein")}
            </ul>
            <div className="mt-6 text-center font-bold text-green-600">
              Total Protein = {proteinTotal.protein.toFixed(1)}g
            </div>
          </div>

          {/* Carbs Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
              {carbsTotal.calories} Cal
            </h2>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-6">Carbs</h3>
            <ul className="space-y-4">
              {renderFoodList("carbs")}
            </ul>
            <div className="mt-6 text-center font-bold text-green-600">
              Total Carbs = {carbsTotal.calories.toFixed(1)}g
            </div>
          </div>

          {/* Fats Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
              {fatsTotal.calories} Cal
            </h2>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-6">Fats</h3>
            <ul className="space-y-4">
              {renderFoodList("fats")}
            </ul>
            <div className="mt-6 text-center font-bold text-green-600">
              Total Fats = {fatsTotal.calories.toFixed(1)}g
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutritions;
