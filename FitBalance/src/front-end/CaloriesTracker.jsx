import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const CaloriesTracker = () => {
  const activity = [
    { label: "Basal Metabolic Rate(BMR)", value: 1.2 },
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

  const reachGoal = [
    { label: "Lean Muscle build", value: 1 },
    { label: "Weight loss", value: 0.8 },
    { label: "Extreme Weight loss", value: 0.7 },
    { label: "Lean Bulk", value: 1.15 },
  ];

  const [act, setAct] = useState();
  const [gender, setGender] = useState("");
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [calories, setCalories] = useState(null);
  const [goal, setGoal] = useState("");
  const [goalCalories, setGoalCalories] = useState(null);

  const calculateCal = (event) => {
    event.preventDefault();

    if (age <= 0 || height <= 0 || weight <= 0 || !act || !gender) {
      alert("Please enter valid input!");
      return;
    }

    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityFactor = parseFloat(act);
    const totalCalories = Math.round(bmr * activityFactor);
    setCalories(totalCalories);
  };

  useEffect(() => {
    if (calories !== null && goal) {
      const goalFactor = parseFloat(goal);
      setGoalCalories(Math.round(calories * goalFactor));
    }
  }, [calories, goal]);

  let reload = () => {
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row w-full h-fit items-center justify-center ">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <form
            className="w-full max-w-md bg-[#8AC342] p-6 rounded-3xl shadow-lg"
            onSubmit={calculateCal}
          >
            <div className="flex w-full justify-center md:space-x-5 space-x-2 p-3 rounded-lg mb-5">
              <div className="flex items-center bg-white px-6 py-1 rounded-4xl">
                <input
                  type="radio"
                  name="gender"
                  className="mr-2"
                  value="male"
                  checked={gender === "male"}
                  onChange={(event) => setGender(event.target.value)}
                />
                <label>Male</label>
              </div>
              <div className="flex items-center bg-white px-6 py-1 rounded-4xl">
                <input
                  type="radio"
                  name="gender"
                  className="mr-2"
                  value="female"
                  checked={gender === "female"}
                  onChange={(event) => setGender(event.target.value)}
                />
                <label>Female</label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Age (Years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-semibold">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white w-full"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1 font-semibold block">Activity Level</label>
              <select
                value={act}
                onChange={(e) => setAct(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              >
                <option value="" hidden>
                  Select your Activity
                </option>
                {activity.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-row justify-center space-x-5 pt-5">
              <button
                className="bg-white px-5 py-1 rounded-2xl font-medium"
                type="submit"
              >
                Submit
              </button>
              <button
                className="bg-[#d1d1d1] px-5 py-1 rounded-2xl font-medium"
                onClick={reload}
                type="reset"
              >
                Reload
              </button>
            </div>

            {calories !== null && (
              <h1 className="text-black text-center text-xl mt-4 border-2 rounded-2xl border-black mx-10">
                Maintanence :<span className="font-medium "> {calories}</span>{" "}
                calories/day
              </h1>
            )}

            {calories !== null && (
              <div className="mt-4">
                <label className="mb-1 font-semibold block">
                  Select Your Goal
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="" hidden>
                    Select Your Goal
                  </option>
                  {reachGoal.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {goalCalories !== null && (
                  <h1 className="text-black text-center  border-2 rounded-2xl border-black mx-10 text-xl mt-4">
                    Target :{" "}
                    <span className="font-medium"> {goalCalories} </span>{" "}
                    calories/day
                  </h1>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CaloriesTracker;