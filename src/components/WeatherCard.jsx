import React from "react";
import { Forecast } from "./Forecast";
import { Icons } from "./Icons";
import { Notyfy } from "./Notyfy";
import { Today } from "./Today";
import { WarnBoard } from "./WarnBoard";
import "./WeatherCard.styles.css";
export const WeatherCard = ({ isLoading, data, unitsLabels, errorMessage }) => {
  return isLoading ? (
    <h3
      style={{
        textAlign: "center",
      }}
    >
      Loadig...
    </h3>
  ) : errorMessage === "invalid input" ? (
    <>
      <Notyfy message={errorMessage} />
      <WarnBoard message={errorMessage} />
    </>
  ) : (
    data !== null && (
      <div className="card">
        <div className="card-today">
          <div className="rCard-left">
            <Today current={data.current} unitsLabels={unitsLabels} />
          </div>

          <div className="rCard-right">
            <Icons
              color={"white"}
              path={data.current.icon}
              title="weather"
              size={120}
            />
          </div>
        </div>
        <Forecast forecast={data.forecast} unitsLabels={unitsLabels} />
      </div>
    )
  );
};
