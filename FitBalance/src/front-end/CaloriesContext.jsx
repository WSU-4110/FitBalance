import { createContext, useContext, useState } from "react";

const CaloriesContext = createContext();

export const CaloriesProvider = ({ children }) => {
  const [goalCalories, setGoalCalories] = useState(null);

  return (
    <CaloriesContext.Provider value={{ goalCalories, setGoalCalories }}>
      {children}
    </CaloriesContext.Provider>
  );
};

export const useCalories = () => useContext(CaloriesContext);
