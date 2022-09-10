import React from "react";
import { Icons } from "./Icons";
import "./Forecast.styles.css";
export const Forecast = ({ forecast, unitsLabels }) => {
  return (
    <div className="forecast">
      {forecast.map((day, i) => {
        return (
          <div key={i} className="forecast-day">
            <div className="forecast-date">{day.date}</div>

            <Icons color={"#0096FF"} path={day.icon} title={day.description} />

            <div className="forecast-des">{day.description}</div>
            <div className="forecast-temperature">
              {day.temperature.max} / {day.temperature.min}{" "}
              {unitsLabels.temperature}
            </div>
            <div className="forecast-wind">
              {day.wind}
              {unitsLabels.windSpeed}
            </div>
          </div>
        );
      })}
    </div>
  );
};
