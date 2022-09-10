import React, { useEffect, useState } from "react";
import { API } from "./api/axios";
import { URL } from "./constant";
import { LocationAccess } from "./provider/openWeather/LocationAccess";

export default function Temp() {
  const [location, setLoacation] = useState({
    latitude: "",
    longitude: "",
  });
  var options = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  };
  function success({ coords }) {
    setLoacation({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
    });
  }
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  const setGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else {
        }
      });
    } else {
      alert("Sorry not avail!");
    }
  };
  const getWetherData = async ({ latitude, longitude }) => {
    const url = `weather?lat=${latitude}&lon=${longitude}${URL.EVENTS.API_ID}${URL.KEY}`;
    const result = await API.get(url);
  };
  useEffect(() => {
    setGeoLocation();
  }, []);
  return (
    <div>
      <LocationAccess />
      <div>
        Latitude :<span>{location.latitude}</span>
      </div>
      <div>
        Longitude :<span>{location.longitude}</span>
      </div>
    </div>
  );
}

// const latitude = position.coords.latitude;
// const longitude = position.coords.longitude;
// console.log(result);
// console.log(url)
