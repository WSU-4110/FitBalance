import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./front-end/Home";
import Workout from "./front-end/Workout";
import CaloriesTracker from "./front-end/CaloriesTracker";
import Nutritions from "./front-end/Nutritions";
import Account from "./front-end/Account";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";

// Create the router with defined paths
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Workout",
    element: <Workout />,
  },
  {
    path: "/caloriestracker",
    element: <CaloriesTracker />,
  },
  {
    path: "/nutrition",
    element: <Nutritions />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "*",
    element: (
      <div>
        <Navbar />
        <div className="flex justify-center items-center text-5xl font-medium h-100 w-full">
          404 Not Found
        </div>
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
