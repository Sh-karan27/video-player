import React from "react";
import { useSelector } from "react-redux";
const Home = () => {
  const { user, loading, error } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  console.log(user);
  return (
    <div className="w-full bg-background-primary h-screen items-center justify-center p-4 overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">Home</div>
    </div>
  );
};

export default Home;
