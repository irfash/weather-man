import React from "react";
import { Icons } from "../../components/Icons";
import { Notyfy } from "../../components/Notyfy";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useOpenWeather } from "./useOpenWeather";
export const LocationAccess = () => {
  const [location, error] = useGeoLocation();

  // return useOpenWeather(location);
  const { latitude = 10.7904833, longitude = 78.7046725 } =
    location.coordinates;
  const { data, isLoading, err } = useOpenWeather({
    key: "8104d4901662be2e6f0f7cff230f3da6",
    lang: "en",
    forecastLimit: 8,
    unit: "metric",
    city: "erode",
    latitude,
    longitude,
  });
  return (
    <>
      {error.status !== null && !isLoading && (
        <>
          {console.log(data)}
          {error.status && <Notyfy message={"allow access"} />}
          <h5>Latitude </h5>
          <Icons
            path="M0 19.188q0-2.875 1.797-5.117t4.547-2.883q0.766-3.406 3.5-5.586t6.266-2.18q3.438 0 6.125 2.125t3.516 5.469h0.516q2.234 0 4.141 1.086t3.016 2.969 1.109 4.117q0 3.344-2.305 5.75t-5.633 2.516q-0.328 0-0.328-0.281v-2.219q0-0.297 0.328-0.297 2.141-0.109 3.641-1.703t1.5-3.766-1.625-3.773-3.844-1.602h-2.672q-0.313 0-0.313-0.281l-0.109-0.969q-0.266-2.688-2.305-4.516t-4.758-1.828q-2.734 0-4.766 1.82t-2.297 4.523l-0.094 0.906q0 0.297-0.328 0.297l-0.875 0.047q-2.047 0.094-3.477 1.672t-1.43 3.703q0 2.172 1.5 3.766t3.641 1.703q0.281 0 0.281 0.297v2.219q0 0.281-0.281 0.281-3.344-0.156-5.664-2.547t-2.32-5.719zM9.875 20.656q0-0.609 0.609-1.648t1.141-1.68q0.531-0.594 0.641-0.703l0.594 0.672q0.641 0.688 1.195 1.695t0.555 1.664q0 0.984-0.672 1.641t-1.672 0.656q-0.984 0-1.688-0.672t-0.703-1.625zM14.844 27.297q0-0.688 0.398-1.594t0.977-1.703q0.453-0.641 1.109-1.398t1-1.086q0.172-0.156 0.406-0.391l0.406 0.391q0.938 0.828 2.125 2.438 0.594 0.828 0.984 1.734t0.391 1.609q0 1.609-1.133 2.742t-2.773 1.133q-1.609 0-2.75-1.125t-1.141-2.75zM17.297 16.203q0-1.047 1.625-2.672l0.406 0.422q0.438 0.531 0.797 1.18t0.359 1.070q0 0.641-0.461 1.102t-1.102 0.461q-0.672 0-1.148-0.461t-0.477-1.102z"
            title="i am "
          />
          <h5>Longitude </h5>
          <h1>{}</h1>
        </>
      )}
    </>
  );
};
