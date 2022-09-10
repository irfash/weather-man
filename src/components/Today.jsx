import React from "react";
import { Icons } from "./Icons";
import "./Today.styles.css";
export const Today = ({ current, unitsLabels }) => {
  return (
    <div className="today-left">
      <div className="today-name">{current.name}</div>
      <div className="today-date">{current.date}</div>
      <hr className="hr" />
      <div className="today-temperature">
        {current.temperature.current} {unitsLabels.temperature}
      </div>

      <div className="today-container-des">
        <Icons
          color={"white"}
          className={"today-weatherIcon"}
          path={current.icon}
          title={current.description}
        />

        <div className="today-des">{current.description}</div>
      </div>
      <hr className="hr" />
      <div className="today-wind">
        Wind : {current.wind} {unitsLabels.windSpeed}
      </div>
      <div className="today-humidity">
        Humidity: <b>{current.humidity}</b> %
      </div>
    </div>
  );
};
