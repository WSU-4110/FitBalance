import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import EmailButton from "./EmailPDF";
import { useAccount } from "./AccountContext";
import { useCalories } from "./CaloriesContext";

const Workout = () => {
  const navigate = useNavigate();
  const { goalCalories, setGoalCalories, goalId, setGoalId  } = useCalories();
  const { userEmail, setUserEmail, userName, setUserName, userLoggedIn, setUserLoggedIn } = useAccount();

  let button;

  if (!userLoggedIn) {
    button = (
      <Button
        onClick={() => navigate("/account")}
        tag="Sign Up!"
        bgCol={"#8AC342"}
        mt={10}
      />
    );
  } else {
    button = (
      <EmailButton></EmailButton>
    );
  }

  
  return (
    <div>
      <Navbar></Navbar>

      <div className=" flex flex-col md:flex-row w-full h-[calc(100vh-80px)] ">
        <div className="  w-full  flex justify-center md:justify-end  items-center">
          <img
            src="src\assets\modelWhite.png"
            alt=""
            srcset=""
            className="w-[70%] h-[100%]"
          />
        </div>

        <div className="flex  flex-col justify-center items-center   w-full mt-10">
          <h1 className="flex flex-col justify-center items-center font-medium text-center text-2xl md:text-3xl text-[#8AC342] px-10">
            Get Your Personalized Workout Plan!
          </h1>

          <p className="text-center flex justify-center font-sans items-center mt-5 px-10">
            “Achieve your fitness goals with a personalized workout plan made
            just for you. Sign up now and get your custom plan delivered
            straight to your inbox!”
          </p>
          
          {button}

          <div className="mb-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Workout;
