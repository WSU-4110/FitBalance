import { createContext, useContext, useState } from "react";

const CaloriesContext = createContext();

export const CaloriesProvider = ({ children }) => {
  const [goalCalories, setGoalCalories] = useState(null);
  const [goalId, setGoalId] = useState(-1);
  /**
   * 0: 
   * 
   * */

  return (
    <CaloriesContext.Provider value={{ goalCalories, setGoalCalories, goalId, setGoalId }}>
      {children}
    </CaloriesContext.Provider>
  );
};

export const useCalories = () => useContext(CaloriesContext);
