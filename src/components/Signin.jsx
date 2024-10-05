import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Signin = ({ setSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        navigate("/");
      }
    });
  };

  return (
    <div className="w-full h-[35rem] e p-8 rounded-lg  flex flex-col items-center justify-evenly space-y-6">
      <h2 className="text-5xl font-semibold text-main-text">Sign In</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col items-center justify-evenly"
      >
        <label className="flex flex-col text-secondary-text  w-full">
          Email Address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="mt-1 p-2  text-main-text focus:border-main-text 300 border-b bg-[transparent] outline-none"
          />
        </label>
        <label className="flex flex-col text-secondary-text w-full">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="mt-1 p-2  text-main-text focus:border-main-text 300 border-b bg-[transparent] outline-none"
          />
        </label>
        <button
          className="border-none px-4 py-2 w-full rounded-md bg-blue-600 text-main-text hover:bg-blue-700 transition-colors duration-200"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Sign in"}
        </button>
        <span
          className="text-secondary-text cursor-pointer hover:text-blue-500 transition-colors"
          onClick={() => setSignUp(true)}
        >
          Don't have an account? <span className="text-main-text">Sign up</span>
        </span>
      </form>
    </div>
  );
};

export default Signin;
