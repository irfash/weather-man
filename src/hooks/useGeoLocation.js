// ref : https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
import { useEffect, useMemo, useState } from "react";

export const useGeoLocation = (
  enableHighAccuracy = true,
  timeout = Infinity,
  maximumAge = 0,
) => {
  const options = useMemo(
    () => ({
      enableHighAccuracy,
      timeout,
      maximumAge,
    }),
    [enableHighAccuracy, maximumAge, timeout],
  );
  const [error, setError] = useState({
    status: null,
    code: null,
    message: null,
  });
  const [location, setLoacation] = useState({
    coordinates: {
      latitude: undefined,
      longitude: undefined,
    },
    accuracy: null,
  });

  function onSuccess({ coords }) {
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    const accuracy = coords.accuracy;
    setLoacation({ coordinates: { latitude, longitude }, accuracy });
    setError({ status: false });
  }
  function onError(err) {
    setError({
      status: true,
      code: err.code,
      message: err.message,
    });
  }
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    } else {
      setError({
        code: 0,
        message: "Sorry GeoLocation not Supported!",
      });
    }
  }, [options]);
  return [location, error];
};
