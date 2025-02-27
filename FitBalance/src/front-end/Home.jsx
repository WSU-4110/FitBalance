import React from "react";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Button from "../components/Button";

// Observer Interface
class Observer {
  update(event) {
    throw new Error("You must implement the update method!");
  }
}

// Subject Class
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(event) {
    this.observers.forEach((observer) => observer.update(event));
  }
}

// Concrete Observer: ButtonClickLogger
class ButtonClickLogger extends Observer {
  update(event) {
    console.log(`Button clicked: ${event}`);
  }
}

// Create a single instance of the Subject
const buttonClickSubject = new Subject();

// Add an observer to log button clicks
const buttonClickLogger = new ButtonClickLogger();
buttonClickSubject.addObserver(buttonClickLogger);

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Notify observers when the button is clicked
    buttonClickSubject.notifyObservers("Track Calories");
    navigate("/caloriestracker");
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row w-full h-[calc(100vh-80px)]">
        <div className="w-full flex justify-center md:justify-end items-center">
          <img
            src="\src\assets\photo.png"
            alt="trainer"
            className="w-[70%] h-[100%]"
          />
        </div>

        <div className="flex md:mr-30 flex-col justify-center items-center w-full">
          <h1 className="text-center text-xl md:text-4xl">
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
            onClick={handleButtonClick}
            tag={"Track Calories"}
            bgCol={"#8AC342"}
            textCol={"#ffffff"}
            mt={30}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
