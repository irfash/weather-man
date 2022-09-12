import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";
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

const formatForecastData = (forecastData, forecastLimit) => {
  const mappedForecast = [];

  for (let i = 0; i < forecastLimit; i += 1) {
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
const fetchCityName = async (endpointReverse, latitude, longitude, key) => {
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
const fetchForecast = async (endpointOnecall, lat, lon, unit, lang, key) => {
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
  } catch (error) {
    console.log(error);
  }
};
const fetchCoordinate = async (endpointDirect, city, key) => {
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
export const useOpenWeather = ({
  key,
  unit = "metric",
  latitude = 11.341036,
  longitude = 77.717163,
  lang = "en",
  forecastLimit = 8,
  city = undefined,
}) => {
  const endpointOnecall = "//api.openweathermap.org/data/2.5/onecall";
  const endpointReverse = "//api.openweathermap.org/geo/1.0/reverse";
  const endpointDirect = "//api.openweathermap.org/geo/1.0/direct";
  const [state, dispatch] = useReducer(fetchRecord, initialState);
  const { error, data } = state;
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      let location = {};
      let forecastResponse = undefined;
      if (city) {
        const coordinateResponse = await fetchCoordinate(
          endpointDirect,
          city,
          key,
        );
        if (coordinateResponse.data.length === 0) {
          throw new Error("invalid input");
        }

        location.name = coordinateResponse.data[0].name;
        location.country = coordinateResponse.data[0].country;
        location.state = coordinateResponse.data[0].state;
        forecastResponse = await fetchForecast(
          endpointOnecall,
          coordinateResponse.data[0].lat,
          coordinateResponse.data[0].lon,
          unit,
          lang,
          key,
        );
      } else {
        const cityNameResponse = await fetchCityName(
          endpointReverse,
          latitude,
          longitude,
          key,
        );

        forecastResponse = await fetchForecast(
          endpointOnecall,
          latitude,
          longitude,
          unit,
          lang,
          key,
        );
        location.name = cityNameResponse.data[0].name;
        location.state = cityNameResponse.data[0].state;
        location.country = cityNameResponse.data[0].country;
      }
      const payload = mapWeatherData(
        forecastResponse.data.current,
        forecastResponse.data.daily,
        forecastLimit > 8 ? 8 : forecastLimit,
        location,
      );
      dispatch({ action: SUCCESS, payload });
    } catch (error) {
      dispatch({ action: FAILURE, payload: error.message || "error" });
    }
    setIsLoading(false);
  }, [city, forecastLimit, key, lang, latitude, longitude, unit]);
  useEffect(() => {
    fetchData();
  }, [city, fetchData, latitude, longitude]);
  return [data, isLoading, error];
};
