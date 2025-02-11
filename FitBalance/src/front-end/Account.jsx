import Navbar from "../components/Navbar";
import Button from "../components/Button";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // New variables to keep track of user inputs.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Reset the input fields when switching between Login and Sign-Up.
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-max-[calc(100vh-80px)] bg-white pt-5 pb-2 z-[-1]">
        <div className="md:w-105 w-96 p-8 bg-[#8AC342] rounded-2xl mx-5 ">
          <h2 className="mb-6 text-2xl font-bold text-center">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>

          <form
            className="flex flex-col items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            {!isLogin && (
              <div className="w-full mb-4">
                <label htmlFor="fullname" className="block text-white">
                  Full Name
                </label>
                <input
                  id="fullname"
                  type="text"
                  autoComplete="name"
                  value={name} // Connect the input field value to the state variable.
                  onChange={(e) => setName(e.target.value)} // Change the state variable to the new value.
                  className="w-full p-2 mt-1 border rounded"
                  placeholder="Full name"
                />
              </div>
            )}

            <div className="w-full mb-4">
              <label htmlFor="email" className="block text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email} // Connect the input field value to the state variable.
                onChange={(e) => setEmail(e.target.value)} // Change the state variable to the new value.
                className="w-full p-2 mt-1 border rounded"
                placeholder="Email@example.com"
              />
            </div>

            {/* Password Field */}
            <div className="w-full mb-4 relative">
              <label htmlFor="password" className="block text-white">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  value={password} // Connect the input field value to the state variable.
                  onChange={(e) => setPassword(e.target.value)} // Change the state variable to the new value.
                  className="w-full p-2 mt-1 border rounded pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
                >
                  {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Sign Up Only) */}
            {!isLogin && (
              <div className="w-full mb-4 relative">
                <label htmlFor="confirm-password" className="block text-white">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword} // Connect the input field value to the state variable.
                    onChange={(e) => setConfirmPassword(e.target.value)} // Change the state variable to the new value.
                    className="w-full p-2 mt-1 border rounded pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
                  >
                    {showConfirmPassword ? (
                      <FiEye size={20} />
                    ) : (
                      <FiEyeOff size={20} />
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="w-full flex justify-center">
              <Button
                tag={isLogin ? "Sign in" : "Get Started"}
                bgCol="#000000"
                textCol="#ffffff"
                mt={20}
                type="submit"
              />
            </div>
          </form>

          <div className="mt-4 text-center flex flex-col justify-center items-center ">
            <span className="text-white">or </span>
            <button className="flex items-center justify-center w-fit px-8 py-2 mt-3  text-white transition-opacity bg-black rounded-2xl hover:opacity-90 duration-250 poin">
              <FcGoogle className="mr-3 text-xl" />
              {isLogin ? "Google Sign In" : "Google Sign Up"}
            </button>
          </div>

          <p className="mt-4 text-center text-white">
            {isLogin ? "New here?" : "Already registered?"}{" "}
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              {isLogin ? "Create account" : "Sign in instead"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Account;
