import React from "react";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className=" flex flex-col md:flex-row w-full h-[calc(100vh-80px)] ">
        <div className="  w-full  flex justify-center md:justify-end  items-center">
          <img
            src="\src\assets\photo.png"
            alt="trainer"
            className="w-[70%] h-[100%]"
          />
        </div>

        <div className="flex md:mr-30 flex-col justify-center items-center   w-full">
          <h1 className=" text-center   text-xl md:text-4xl">
            Achieve Your Goal Faster with
            <br /> Smart{" "}
            <ReactTyped
              className="text-[#8AC342]"
              strings={[" Tracking..", " Nutrition..", " Workout.."]}
              typeSpeed={40}
              backSpeed={50}
              loop
            />
          </h1>

          <Button
            tag={"Track Calories"}
            bgCol={"#8AC342"}
            textCol={"#ffffff"}
            mt={30}
            onClick={() => navigate("/caloriestracker")}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
