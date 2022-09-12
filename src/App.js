import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { URL } from "./constant";
import { useGeoLocation } from "./hooks/useGeoLocation";
import { About } from "./page/About";
import { Home } from "./page/Home";
import { useOpenWeather } from "./provider/openWeather/useOpenWeather";

function App() {
  const [location, error] = useGeoLocation();
  const [city, setCity] = useState();

  const [data, isLoading, err] = useOpenWeather({
    key: URL.KEY,
    lang: "en",
    forecastLimit: 4,
    unit: "metric",
    city,
    latitude: location.coordinates.latitude,
    longitude: location.coordinates.longitude,
  });
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              geoError={error}
              error={err}
              isLoading={isLoading}
              data={data}
              setCity={setCity}
            />
          }
        />
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
