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
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>

          <form className="flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="w-full mb-4">
                <label htmlFor="fullname" className="block text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullname"
                  type="text"
                  autoComplete="name"
                  value={name} // Connect the input field value to the state variable.
                  onChange={(e) => setName(e.target.value)} // Change the state variable to the new value.
                  className="w-full p-2 mt-1 border rounded"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div className="w-full mb-4">
              <label htmlFor="email" className="block text-gray-700">
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
              <label htmlFor="password" className="block text-gray-700">
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
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Sign Up Only) */}
            {!isLogin && (
              <div className="w-full mb-4 relative">
                <label htmlFor="confirm-password" className="block text-gray-700">
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
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                  >
                    {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                  </button>
                </div>
              </div>
            )}

            <div className="w-full flex justify-center">
              <Button
                tag={isLogin ? "Continue" : "Get Started"}
                bgCol="#8AC342"
                textCol="#ffffff"
                mt={20}
                type="submit"
              />
            </div>
          </form>

          <div className="mt-4 text-center">
            <span className="text-gray-600">or continue with</span>
            <button
              className="flex items-center justify-center w-full px-4 py-2 mt-3 text-white transition-opacity bg-black rounded-lg hover:opacity-90 duration-250"
            >
              <FcGoogle className="mr-3 text-xl" />
              {isLogin ? "Google Sign In" : "Google Sign Up"}
            </button>
          </div>

          <p className="mt-4 text-center text-gray-600">
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
