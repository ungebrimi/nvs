import { useState, useRef, useEffect, useMemo } from "react";
import { useMap } from "../../context/MapContext"
//@ts-ignore
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
//import Popup from "./Popup";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import Preview from "./Preview";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MapComponent({ markers, stores }: any) {
  const accessToken = process.env.MAPBOX_ACCESS_TOKEN as string;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { fly, mapLocation, setFly } = useMap()
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [mapStyle, setMapStyle] = useState<string>("");
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<any>();

  const handleToggle = () => {
    let status = !enabled
    if (status) {
      setMapStyle("satellite-v9")
    } else {
      setMapStyle("streets-v11")
    }
    localStorage.setItem("enabled", JSON.stringify(status));
    setEnabled(status);
  }

  useEffect(() => {
    // get the value of enabled from localstorage
    const enabled = JSON.parse(localStorage.getItem("enabled") as string);
    setEnabled(enabled)
    if (enabled) {
      setMapStyle("satellite-v9")
      setLoading(false)
    } else {
      setMapStyle("streets-v11")
      setLoading(false)
    }
    console.log(enabled)
  }, [])

  useEffect(() => {
    if (fly) {
      mapRef?.current.flyTo({
        center: [mapLocation.longitude, mapLocation.latitude],
        zoom: 21,
      });
      setFly(false);
    }
  }, [fly, mapLocation, setFly]);

  const enabledViewState = {
    longitude: 0.349014,
    latitude: 0.864716,
    zoom: 0,
  };
  const disabledViewState = {
    longitude: 1.3554498062642149,
    latitude: 44.01753922616064,
    zoom: 16,
  };


  useEffect(() => {
    if (enabled) {
      setTimeout(() => {
        mapRef.current.flyTo({
          center: [1.3554498062642149, 44.01753922616064],
          zoom: 16,
          duration: 10000,
        });
      }, 500);
      setTimeout(() => {
        setMapStyle("streets-v11");
      }, 10500);
    }
  }, [enabled]);

  const marker = useMemo(
    () =>
      stores.map((store: any, idx: number) => (
        <Mark
          key={idx}
          store={store}
          markers={markers}
          idx={idx}
          setIsOpen={setIsOpen}
          setSelectedStore={setSelectedStore}
        />
      )),
    [stores, markers]
  );

  return (
    <div className="h-[36rem] w-full relative col-span-6 lg:col-span-4">
      {!loading && (
        <Map
          initialViewState={enabled ? enabledViewState : disabledViewState}
          projection="globe"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "0.75rem",
            backgroundColor: "black",
          }}
          mapboxAccessToken={accessToken}
          mapStyle={`mapbox://styles/mapbox/${mapStyle}`}
          ref={mapRef}
        >
          {marker}
          {isOpen ? (
            <Preview isOpen={isOpen} setIsOpen={setIsOpen} store={selectedStore} />
          ) : null}
        </Map>
      )}
      <div className="absolute text-gray-100 top-0 py-2 text-xs rounded-xl px-2 right-0 m-4 bg-transparent">
        <Switch.Group
          as="div"
          className="flex flex-col justify-center gap-2 items-center"
        >
          <Switch
            checked={enabled}
            onChange={handleToggle}
            className={classNames(
              enabled ? "bg-vb" : "bg-gray-200",
              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                enabled ? "translate-x-5" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              )}
            />
          </Switch>
          <Switch.Label as="span" className="">
            <span
              className={
                enabled
                  ? "text-xs font-medium text-white"
                  : "text-xs font-medium text-black"
              }
            >
              Mode spatial
            </span>
          </Switch.Label>
        </Switch.Group>
      </div>
    </div>
  );
}

const Mark = (props: any) => {
  const { store, markers, setIsOpen, setSelectedStore } = props;

  const handleClick = (store: any) => {
    setIsOpen(true);
    setSelectedStore(store);
  }

  return (
    <>
      {markers &&
        markers.filter((type: any) => type.marker_id === store.marker_id)
          .map((type: any, idx: number) => {
            return (
              <Marker
                key={idx}
                onClick={() => handleClick(store)}
                longitude={store.lng}
                latitude={store.lat}
              >
                <Image width={23} height={20} src={type.icon_url} alt="" className="cursor-pointer" />
              </Marker>
            )
          })}
    </>
  );
};
