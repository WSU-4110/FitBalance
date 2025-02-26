import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useCalories } from "./CaloriesContext";

const CaloriesTracker = () => {
  const { setGoalCalories } = useCalories();

  const activityLevels = [
    { label: "Basal Metabolic Rate (BMR)", value: 1.2 },
    { label: "Sedentary: little or no exercise", value: 1.2 },
    { label: "Light: exercise 1-3 times/week", value: 1.375 },
    { label: "Moderate: exercise 4-5 times/week", value: 1.55 },
    {
      label: "Active: daily exercise or intense exercise 3-4 times/week",
      value: 1.725,
    },
    { label: "Very Active: intense exercise 6-7 times/week", value: 1.9 },
    {
      label: "Extra Active: very intense exercise daily, or physical job",
      value: 2.2,
    },
  ];

  const goals = [
    { label: "Lean Muscle Build", value: 1 },
    { label: "Weight Loss", value: 0.8 },
    { label: "Extreme Weight Loss", value: 0.7 },
    { label: "Lean Bulk", value: 1.15 },
  ];

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [goal, setGoal] = useState("");
  const [calories, setCalories] = useState(null);

  const calculateCalories = (event) => {
    event.preventDefault();
    if (!gender || !age || !height || !weight || !activity) {
      alert("Please fill in all fields correctly.");
      return;
    }

    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const totalCalories = Math.round(bmr * parseFloat(activity));
    setCalories(totalCalories);
  };

  useEffect(() => {
    if (calories && goal) {
      setGoalCalories(Math.round(calories * parseFloat(goal)));
    }
  }, [calories, goal, setGoalCalories]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full h-fit p-8">
        <form
          onSubmit={calculateCalories}
          className="max-w-md bg-[#8AC342] p-6 rounded-3xl shadow-lg"
        >
          <div className="flex justify-center space-x-5 p-3 rounded-lg mb-5">
            {["male", "female"].map((g) => (
              <label
                key={g}
                className="flex items-center bg-white px-6 py-1 rounded-4xl cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={() => setGender(g)}
                  className="mr-2"
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>

          {[
            { label: "Age (Years)", value: age, setter: setAge },
            { label: "Height (cm)", value: height, setter: setHeight },
            { label: "Weight (kg)", value: weight, setter: setWeight },
          ].map(({ label, value, setter }) => (
            <div key={label} className="mb-4">
              <label className="block font-semibold mb-1">{label}</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-white"
              />
            </div>
          ))}

          <label className="block font-semibold mt-4">Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-white"
          >
            <option value="" hidden>
              Select Activity
            </option>
            {activityLevels.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="flex justify-center space-x-5 pt-5">
            <button
              type="submit"
              className="bg-white px-5 py-1 rounded-2xl font-medium"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-gray-200 px-5 py-1 rounded-2xl font-medium"
            >
              Reload
            </button>
          </div>

          {calories !== null && (
            <h1 className="text-black text-center text-xl mt-4 border-2 rounded-2xl border-black mx-10">
              Maintanence: <span className="font-medium">{calories}</span>{" "}
              calories/day
            </h1>
          )}

          {calories !== null && (
            <>
              <label className="block font-semibold mt-4">
                Select Your Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-white"
              >
                <option value="" hidden>
                  Select Your Goal
                </option>
                {goals.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {goal && (
                <h1 className="text-black text-center text-xl mt-4 border-2 rounded-2xl border-black mx-10">
                  Target:{" "}
                  <span className="font-medium">
                    {Math.round(calories * parseFloat(goal))}
                  </span>{" "}
                  calories/day
                </h1>
              )}
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default CaloriesTracker;
