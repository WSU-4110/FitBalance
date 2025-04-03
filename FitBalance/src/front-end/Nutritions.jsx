import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import { useCalories } from "./CaloriesContext"; // Import Context

// Abstract Base Class: FoodItem
class FoodItem {
  constructor(name, caloriesPer100g, weight = 0) {
    this.name = name;
    this.caloriesPer100g = caloriesPer100g;
    this.weight = weight;
  }

  // Method to calculate nutrition (calories)
  getNutrition() {
    const calories = ((this.weight / 100) * this.caloriesPer100g).toFixed(1);
    return { calories: parseFloat(calories) || 0 };
  }
}

// Concrete Class: Protein
class Protein extends FoodItem {
  constructor(name, caloriesPer100g, proteinPer100g, weight = 0) {
    super(name, caloriesPer100g, weight); // Call parent constructor
    this.proteinPer100g = proteinPer100g;
  }

  // Override getNutrition to include protein
  getNutrition() {
    const { calories } = super.getNutrition(); // Call parent method
    const protein = ((this.weight / 100) * this.proteinPer100g).toFixed(1);
    return { calories, protein: parseFloat(protein) };
  }
}

// Concrete Class: Carbs
class Carbs extends FoodItem {
  constructor(name, caloriesPer100g, carbsPer100g, weight = 0) {
    super(name, caloriesPer100g, weight); // Call parent constructor
    this.carbsPer100g = carbsPer100g;
  }

  // Override getNutrition to include carbs
  getNutrition() {
    const { calories } = super.getNutrition(); // Call parent method
    const carbs = ((this.weight / 100) * this.carbsPer100g).toFixed(1);
    return { calories, carbs: parseFloat(carbs) };
  }
}

// Concrete Class: Fats
class Fats extends FoodItem {
  constructor(name, caloriesPer100g, fatPer100g, weight = 0) {
    super(name, caloriesPer100g, weight); // Call parent constructor
    this.fatPer100g = fatPer100g;
  }

  // Override getNutrition to include fat
  getNutrition() {
    const { calories } = super.getNutrition(); // Call parent method
    const fat = ((this.weight / 100) * this.fatPer100g).toFixed(1);
    return { calories, fat: parseFloat(fat) };
  }
}

// Factory Class: FoodFactory
class FoodFactory {
  static createFood(type, name, caloriesPer100g, macroPer100g, weight = 0) {
    switch (type) {
      case "protein":
        return new Protein(name, caloriesPer100g, macroPer100g, weight);
      case "carbs":
        return new Carbs(name, caloriesPer100g, macroPer100g, weight);
      case "fats":
        return new Fats(name, caloriesPer100g, macroPer100g, weight);
      default:
        throw new Error("Invalid food type");
    }
  }
}

const Nutritions = () => {
  const { goalCalories, setGoalCalories } = useCalories();

  // State to hold food data
  const [foods, setFoods] = useState({
    protein: [
      FoodFactory.createFood("protein", "Chicken Breast", 165, 31),
      FoodFactory.createFood("protein", "Chicken Thigh", 200, 25),
      FoodFactory.createFood("protein", "Fish", 150, 20),
    ],
    carbs: [
      FoodFactory.createFood("carbs", "Bread", 300, 50),
      FoodFactory.createFood("carbs", "Rice", 300, 80),
      FoodFactory.createFood("carbs", "Oats", 300, 70),
    ],
    fats: [
      FoodFactory.createFood("fats", "Avocados", 300, 15),
      FoodFactory.createFood("fats", "Nuts", 600, 50),
      FoodFactory.createFood("fats", "Nut Butters", 550, 45),
    ],
  });
  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods)); // Save food data to local storage
  }, [foods]);
  
  useEffect(() => {
    const storedFoods = JSON.parse(localStorage.getItem("foods"));
    if (storedFoods) {
      // Recreate the stored food items using FoodFactory
      const reconstructedFoods = {
        protein: storedFoods.protein.map(food =>
          FoodFactory.createFood("protein", food.name, food.caloriesPer100g, food.proteinPer100g, food.weight)
        ),
        carbs: storedFoods.carbs.map(food =>
          FoodFactory.createFood("carbs", food.name, food.caloriesPer100g, food.carbsPer100g, food.weight)
        ),
        fats: storedFoods.fats.map(food =>
          FoodFactory.createFood("fats", food.name, food.caloriesPer100g, food.fatPer100g, food.weight)
        ),
      };
      setFoods(reconstructedFoods);
    }
  }, []);
  
  // State for adding new food
  const [newFood, setNewFood] = useState({
    type: "protein",
    name: "",
    caloriesPer100g: "",
    macroPer100g: "",
    weight: "",
  });

  // State to toggle the visibility of the "Add New Food" form
  const [showAddFoodForm, setShowAddFoodForm] = useState(false);

  // Ensure valid number input for goal calories
  const handleOnChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    setGoalCalories(value); // Keep as string to prevent input blocking
  };

  // Convert goalCalories to a number for calculations
  const calorieValue = parseInt(goalCalories) || 0;

  // Calculate macronutrients
  const protein = calorieValue ? (calorieValue * 0.4).toFixed(0) : "N/A";
  const carbs = calorieValue ? (calorieValue * 0.5).toFixed(0) : "N/A";
  const fat = calorieValue ? (calorieValue * 0.1).toFixed(0) : "N/A";

  // Method to update food weight
  const handleInputChange = (foodCategory, index, value) => {
    const updatedFoods = { ...foods };
    const newWeight = Math.max(0, parseInt(value) || 0);
    updatedFoods[foodCategory][index].weight = newWeight;
    setFoods(updatedFoods);
  };

  // Method to calculate total nutrition for a category
  const calculateTotalForCategory = (category) => {
    if (!foods[category]) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
  
    return foods[category].reduce(
      (totals, food) => {
        if (!food) return totals; // Ensure food is valid
        const nutrition = food.getNutrition();
        totals.calories += nutrition.calories || 0;
        if (nutrition.protein) totals.protein += nutrition.protein;
        if (nutrition.carbs) totals.carbs += nutrition.carbs;
        if (nutrition.fat) totals.fat += nutrition.fat;
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  // Method to render food list
  const renderFoodList = (category) => {
    return foods[category].map((food, index) => {
      const nutrition = food.getNutrition();
      return (
        <li key={index} className="flex justify-between items-center w-full space-x-2 whitespace-nowrap">
          <span>{food.name}</span>
          <div className="flex items-center flex-shrink-0">
            <input
              type="number"
              className="w-16 min-w-[4rem] p-1 border rounded text-center"
              placeholder="100"
              value={food.weight}
              onChange={(e) => handleInputChange(category, index, e.target.value)}
            />
            <span className="ml-1">g</span>
          </div>
          <div className="text-right whitespace-nowrap min-w-[120px]">
            <span>{nutrition.calories} Cal</span>
            {nutrition.protein && <span> / {nutrition.protein}g Protein</span>}
            {nutrition.carbs && <span> / {nutrition.carbs}g Carbs</span>}
            {nutrition.fat && <span> / {nutrition.fat}g Fat</span>}
          </div>
        </li>
      );
    });
  };

  // Handle adding new food
  const handleAddFood = () => {
    const { type, name, caloriesPer100g, macroPer100g, weight } = newFood;

    if (!name || !caloriesPer100g || !macroPer100g) {
      alert("Please fill in all fields.");
      return;
    }

    const newFoodItem = FoodFactory.createFood(
      type,
      name,
      parseFloat(caloriesPer100g),
      parseFloat(macroPer100g),
      parseFloat(weight) || 0
    );

    const updatedFoods = { ...foods };
    updatedFoods[type].push(newFoodItem);
    setFoods(updatedFoods);

    // Reset the form and hide it
    setNewFood({
      type: "protein",
      name: "",
      caloriesPer100g: "",
      macroPer100g: "",
      weight: "",
    });
    setShowAddFoodForm(false);
  };

  // Calculate totals for each category
  const proteinTotal = useMemo(() => calculateTotalForCategory("protein"), [foods]);
  const carbsTotal = useMemo(() => calculateTotalForCategory("carbs"), [foods]);
  const fatsTotal = useMemo(() => calculateTotalForCategory("fats"), [foods]);

 
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

        {/* Food Lists */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-10">
          {/* Protein List */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
              {proteinTotal.calories} Cal
            </h2>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-6">Protein</h3>
            <ul className="space-y-4">{renderFoodList("protein")}</ul>
            <div className="mt-6 text-center font-bold text-green-600">
              Total Protein = {proteinTotal.protein.toFixed(1)}g
            </div>
          </div>

          {/* Carbs List */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
              {carbsTotal.calories} Cal
            </h2>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-6">Carbs</h3>
            <ul className="space-y-4">{renderFoodList("carbs")}</ul>
            <div className="mt-6 text-center font-bold text-green-600">
              Total Carbs = {carbsTotal.carbs.toFixed(1)}g
            </div>
          </div>

          {/* Fats List */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
              {fatsTotal.calories} Cal
            </h2>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-6">Fats</h3>
            <ul className="space-y-4">{renderFoodList("fats")}</ul>
            <div className="mt-6 text-center font-bold text-green-600">
              Total Fats = {fatsTotal.fat.toFixed(1)}g
            </div>
          </div>
        </div>

        {/* Add New Food Section */}
        <div className="w-full max-w-5xl mt-10">
          <button
            onClick={() => setShowAddFoodForm(!showAddFoodForm)}
            className="bg-[#8AC342] text-white p-2 rounded w-full"
          >
            {showAddFoodForm ? "Hide Add New Food" : "Add New Food"}
          </button>

          {showAddFoodForm && (
            <div className="bg-white p-6 rounded-2xl shadow-lg mt-4">
              <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
                Add New Food
              </h2>
              <div className="flex flex-col space-y-4">
                {/* Food Type Dropdown */}
                <select
                  value={newFood.type}
                  onChange={(e) => setNewFood({ ...newFood, type: e.target.value })}
                  className="border p-2 rounded"
                >
                  <option value="protein">Protein</option>
                  <option value="carbs">Carbs</option>
                  <option value="fats">Fats</option>
                </select>

                <input
                  type="text"
                  placeholder="Food Name"
                  className="border p-2 rounded"
                  value={newFood.name}
                  onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Calories per 100g"
                  className="border p-2 rounded"
                  value={newFood.caloriesPer100g}
                  onChange={(e) => setNewFood({ ...newFood, caloriesPer100g: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Macro per 100g"
                  className="border p-2 rounded"
                  value={newFood.macroPer100g}
                  onChange={(e) => setNewFood({ ...newFood, macroPer100g: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Weight"
                  className="border p-2 rounded"
                  value={newFood.weight}
                  onChange={(e) => setNewFood({ ...newFood, weight: e.target.value })}
                />
                <button
                  onClick={handleAddFood}
                  className="bg-[#8AC342] text-white p-2 rounded mt-4"
                >
                  Add Food
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nutritions;
