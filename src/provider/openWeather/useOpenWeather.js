import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { getIcon } from "./iconsMap";

const initialState = {
  data: null,
  error: null,
};
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
const fetchRecord = (state, { action, payload }) => {
  switch (action) {
    case SUCCESS:
      return {
        data: payload,
        error: null,
      };
    case FAILURE:
      return {
        data: null,
        error: payload,
      };
    default:
      return state;
  }
};
function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}
const formateDate = (dt) => {
  const rawDate = new Date(dt * 1000);
  if (dateIsValid(rawDate)) {
    const date = rawDate.toDateString();
    return date;
  }
  return "";
};
const formatCurrentData = (currentData, location) => {
  return {
    name: location.name,
    date: formateDate(currentData.dt),
    description: currentData.weather[0].description,
    icon: currentData.weather[0] && getIcon(currentData.weather[0].icon),
    temperature: {
      current: currentData.temp.toFixed(0),
      min: undefined,
      max: undefined,
    },
    wind: currentData.wind_speed.toFixed(0),
    humidity: currentData.humidity,
  };
};

const formatForecastData = (forecastData, limit) => {
  const mappedForecast = [];
  for (let i = 0; i < limit; i += 1) {
    mappedForecast.push({
      date: formateDate(forecastData[i].dt),
      description: forecastData[i].weather[0].description,
      icon: forecastData[i].weather && getIcon(forecastData[i].weather[0].icon),
      temperature: {
        min: forecastData[i].temp.min.toFixed(0),
        max: forecastData[i].temp.max.toFixed(0),
      },
      wind: forecastData[i].wind_speed.toFixed(0),
      humidity: forecastData[i].humidity,
    });
  }
  return mappedForecast;
};
const mapWeatherData = (currentData, forecastData, forecastLimit, location) => {
  const mapped = {};
  if (currentData && forecastData) {
    mapped.current = formatCurrentData(currentData, location);
    mapped.forecast = formatForecastData(forecastData, forecastLimit);
  }
  return mapped;
};

export const useOpenWeather = (props) => {
  const {
    key,
    unit = "metric",
    latitude = 11.341036,
    longitude = 77.717163,
    lang = "en",
    forecastLimit = 5,
    city = undefined,
  } = props;
  const endpointOnecall = "//api.openweathermap.org/data/2.5/onecall";
  const endpointReverse = "//api.openweathermap.org/geo/1.0/reverse";
  const endpointDirect = "//api.openweathermap.org/geo/1.0/direct";
  const [state, dispatch] = useReducer(fetchRecord, initialState);
  const { error, data } = state;
  const [isLoading, setIsLoading] = useState(false);

  const fetchCoordinate = async () => {
    try {
      return await axios.get(endpointDirect, {
        params: {
          q: city,
          limit: 1,
          appid: key,
        },
      });
    } catch (error) {
      console.warn(error);
    }
  };
  const fetchCityName = async () => {
    try {
      return await axios.get(endpointReverse, {
        params: {
          lat: latitude,
          lon: longitude,
          limit: 1,
          appid: key,
        },
      });
    } catch (error) {
      console.warn(error);
    }
  };
  const fetchForecast = async (lat, lon) => {
    try {
      return axios.get(endpointOnecall, {
        params: {
          lat: lat,
          lon: lon,
          units: unit,
          lang: lang,
          appid: key,
        },
      });
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let location = {};
        let forecastResponse = undefined;
        if (city) {
          const coordinateResponse = await fetchCoordinate();
          if (coordinateResponse.data.length === 0) {
            throw new Error("invalid input");
          }

          location.name = coordinateResponse.data[0].name;
          location.country = coordinateResponse.data[0].country;
          location.state = coordinateResponse.data[0].state;
          forecastResponse = await fetchForecast(
            coordinateResponse.data[0].lat,
            coordinateResponse.data[0].lon,
          );
        } else {
          const cityNameResponse = await fetchCityName();
          forecastResponse = await fetchForecast(latitude, longitude);
          location.name = cityNameResponse.data[0].name;
          location.state = cityNameResponse.data[0].state;
          location.country = cityNameResponse.data[0].country;
        }
        const payload = mapWeatherData(
          forecastResponse.data.current,
          forecastResponse.data.daily,
          forecastLimit,
          location,
        );
        dispatch({ action: SUCCESS, payload });
      } catch (error) {
        dispatch({ action: FAILURE, payload: error.message || "error" });
      }
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, latitude, longitude]);
  return [data, isLoading, error];
};
