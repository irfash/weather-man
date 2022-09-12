import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Notyfy } from "../components/Notyfy";
import { WeatherCard } from "../components/WeatherCard";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import "./Home.styles.css";
export const Home = ({ geoError, error, isLoading, data, setCity }) => {
  const inputRef = useRef();

  const handelSubmit = (e) => {
    e.preventDefault();
    setCity(inputRef.current.value);
  };
  return geoError.status !== null ? (
    <>
      {geoError.status === true && (
        <Notyfy message={"Allow location access..."} />
      )}
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
        errorMessage={error}
        data={data}
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
      />
    </>
  ) : null;
};
