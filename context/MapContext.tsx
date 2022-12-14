import { createContext, useContext, useState } from "react";

type MapProviderProps = {
  children: React.ReactNode;
};

type MapContextProps = {
  fly: boolean;
  setFly: any;
  mapLocation: any;
  setMapLocation: any;
};

const MapContext = createContext({} as MapContextProps);

export const useMap = () => {
  return useContext(MapContext);
};

export const MapProvider = ({ children }: MapProviderProps) => {
  const [fly, setFly] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState({
    lng: 1.353772131,
    lat: 44.01793933,
  });
  const [mapLocation, setMapLocation] = useState({
    lng: 1.353772131,
    lat: 44.01793933,
  });

  // set the distance away from users location to each store
  const getStoreDistance = (store: any) => {
    store.forEach((result: any) => {
      const R = 6371e3; // metres
      const φ1 = (Number(userLocation.lat) * Math.PI) / 180; // φ, λ in radians
      const φ2 = (result.lat * Math.PI) / 180;
      const Δφ = ((result.lat - Number(userLocation.lat)) * Math.PI) / 180;
      const Δλ = ((result.lng - Number(userLocation.lng)) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const d = R * c;

      // turn distance into km with 2 decimal places
      result.distance = Math.round(d / 100) / 10;
    });
  }

  return (
    <MapContext.Provider
      value={{
        fly,
        setFly,
        mapLocation,
        setMapLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
