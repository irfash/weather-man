import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { useGeoLocation } from "./hooks/useGeoLocation";
import { About } from "./page/About";
import { Home } from "./page/Home";

function App() {
  const [location, error] = useGeoLocation();
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home location={location} error={error} />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
