import React, { useState } from "react";
import Singup from "../components/Singup";
import Signin from "../components/Signin";
import background from "../assets/movie-projector.jpg";

const Login = () => {
  const [signUp, setSignUp] = useState(false);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 bg-background-primary">
      <div className="flex flex-col lg:flex-row w-11/12 md:w-3/4 h-auto md:h-[50rem] bg-white rounded-lg shadow-lg overflow-hidden bg-background-secondary">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
          {signUp ? (
            <Singup setSignUp={setSignUp} />
          ) : (
            <Signin setSignUp={setSignUp} />
          )}
        </div>

        {/* Right Side - Background Image */}
        <div
          className="hidden lg:flex w-full lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url(${background})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
