import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { PiImageLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";

const Signup = ({ setSignUp }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    coverImage: null,
    avatar: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // For file inputs like avatar and coverImage
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value, // For text inputs like fullName, username, email, etc.
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ formData })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
      }

      setSignUp(false);
    });

    setFormData({
      fullName: "",
      username: "",
      email: "",
      password: "",
      avatar: null,
      coverImage: null,
    });
  };

  return (
    <div className="w-full h-[50rem] p-8 rounded-lg flex flex-col items-center justify-evenly space-y-6">
      <h2 className="text-5xl font-semibold text-main-text">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col items-center justify-evenly"
      >
        <label className="flex flex-col text-main-text w-full">
          Full Name
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-1 p-2 text-secondary-text focus:border-main-text border-b bg-[transparent] outline-none"
          />
        </label>

        <label className="flex flex-col text-main-text w-full">
          Username
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 p-2 text-secondary-text focus:border-main-text border-b bg-[transparent] outline-none"
          />
        </label>

        <label className="flex flex-col text-main-text w-full">
          Email Address
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 text-secondary-text focus:border-main-text border-b bg-[transparent] outline-none"
          />
        </label>

        <label className="flex flex-col text-main-text w-full">
          Password
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 text-secondary-text focus:border-main-text border-b bg-[transparent] outline-none"
          />
        </label>

        {/* Cover Image */}
        <label className="flex  items-center text-secondary-text w-full">
          <label className="cursor-pointer">
            <input
              type="file"
              name="coverImage"
              onChange={handleChange}
              className="hidden"
            />
            <PiImageLight className="text-3xl text-main-text" />
          </label>
          Cover Image
        </label>

        {/* Avatar */}
        <label className="flex  items-center text-secondary-text w-full">
          <label className="cursor-pointer">
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              className="hidden"
            />
            <CiUser className="text-3xl text-main-text" />
          </label>
          Avatar
        </label>

        <button
          className="border-none px-4 py-2 w-full rounded-md bg-blue-600 text-main-text hover:bg-blue-700 transition-colors duration-200"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <span
          className="text-secondary-text cursor-pointer hover:text-blue-500 transition-colors"
          onClick={() => setSignUp(false)}
        >
          Already have an account?{" "}
          <span className="text-main-text">Sign in</span>
        </span>
      </form>
    </div>
  );
};

export default Signup;
