import React from "react";
import { BrowserRouter, Route, Router } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import Error from "./screens/Error";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Router>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Router>
      </BrowserRouter>
    </>
  );
};

export default App;
