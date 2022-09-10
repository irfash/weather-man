import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useRef } from "react";
import { Notyfy } from "../components/Notyfy";
import { WeatherCard } from "../components/WeatherCard";
import { useOpenWeather } from "../provider/openWeather/useOpenWeather";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { URL } from "../constant";
import "./Home.styles.css";
export const Home = ({ location, error }) => {
  const { latitude = undefined, longitude = undefined } = location.coordinates;

  const inputRef = useRef();
  const [city, setCity] = useState();

  const [data, isLoading, err] = useOpenWeather({
    key: URL.KEY,
    lang: "en",
    forecastLimit: 8,
    unit: "metric",
    city,
    latitude,
    longitude,
  });
  const handelSubmit = (e) => {
    e.preventDefault();
    setCity(inputRef.current.value);
  };
  return error.status !== null ? (
    <>
      {error.status === true && <Notyfy message={"Allow location access..."} />}
      <form className="search" onSubmit={(e) => handelSubmit(e)}>
        <input
          ref={inputRef}
          className="input"
          placeholder="Enter Location..."
        />
        <button className="search-btn">
          <FontAwesomeIcon
            className="icon"
            type="submit"
            icon={faSearchLocation}
          />
        </button>
      </form>
      <WeatherCard
        isLoading={isLoading}
        errorMessage={err}
        data={data}
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
      />
    </>
  ) : null;
};
