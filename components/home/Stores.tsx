import { useEffect, useState } from "react"
import Link from "next/link";
import LikeButtons from "../LikeButtons";
import Image from "next/image";
import { useMap } from "../../context/MapContext";
import { getStoreLikes, getStoreFollowers } from "../../utils/like";

const Stores = ({ stores }: any) => {
  const [newStores, setNewStores] = useState([])
  const getLikesAndFollowers = async (store: any) => {
    const likes = await getStoreLikes(store.store_id);
    const followers = await getStoreFollowers(store.store_id);
    return { likes, followers };
  }

  useEffect(() => {
    if (stores.length == 0) return
    if (stores) {
      const getLikesAndFollowersForAllStores = async () => {
        const storesWithLikesAndFollowers: any = await Promise.all(stores.map(async (store: any) => {
          const likesAndFollowers = await getLikesAndFollowers(store);
          return { ...store, ...likesAndFollowers };
        }))
        setNewStores(storesWithLikesAndFollowers)
      }
      getLikesAndFollowersForAllStores();
    }
  }, [stores])

  // get current day and time
  const today = new Date();
  let currentDay = today.getDay();

  switch (currentDay) {
    case 0:
      currentDay = 6;
      break;
    case 1:
      currentDay = 0;
      break;
    case 2:
      currentDay = 1;
      break;
    case 3:
      currentDay = 2;
      break;
    case 4:
      currentDay = 3;
      break;
    case 5:
      currentDay = 4;
      break;
    case 6:
      currentDay = 5;
      break;
    default:
      break;
  }

  [
    {
      option: "colour",
      value: "red",
    },
    {
      option: "colour",
      value: "blue",
    },
    {
      option: "colour",
      value: "green",
    },
  ];

  const { setFly, setMapLocation } = useMap()
  const handleFly = (store: any) => {
    setMapLocation({
      latitude: store.lat,
      longitude: store.lng,
    });
    setFly(true);
  };



  return (
    <aside className="col-span-6 bg-neutral-50 lg:col-span-2 lg:h-[36rem] overflow-auto relative py-1">
      {newStores &&
        newStores.map((store: any) => {
          let isOpen = false;
          try {
            store.opening_hours[currentDay]?.open.forEach((time: any) => {
              time = time.split(":");
              const openTime = parseInt(time[0]);
              const openMinutes = parseInt(time[1]);
              let currentTime = today.getHours();
              let currentMinutes = today.getMinutes();
              if (currentTime >= openTime && currentMinutes >= openMinutes) {
                isOpen = true;
              } else {
                isOpen = false;
              }
            });
            store.opening_hours[currentDay]?.closed.forEach((time: any) => {
              time = time.split(":");
              const closeTime = parseInt(time[0]);
              const closeMinutes = parseInt(time[1]);
              let currentTime = today.getHours();
              let currentMinutes = today.getMinutes();
              if (currentTime >= closeTime && currentMinutes >= closeMinutes) {
                isOpen = false;
              } else {
                isOpen = true;
              }
            });
          } catch (error) { }

          return (
            <div
              key={store.store_id}
              className="flex relative w-full max-w-md bg-white rounded-md first:mt-0 mt-4 px-2 shadow-md"
            >
              {/*THIS IS A INVISIBLE LAYER SO YOU CAN PRESS THE UPPER PART OF THE CARD AND FLY TO THE STORE LOCATION ON MAP*/}
              <div
                className="absolute top-0 right-0 h-36 w-full bg-black z-10 opacity-0"

                onClick={() => handleFly(store)}
              ></div>
              <div className="basis-1/2 relative text-center border-r-[1px] border-gray-300 py-2">
                <div className="h-[7.5rem]  px-2 w-full rounded-t-md">
                  <Image
                    width={300}
                    height={400}
                    alt={store.title}
                    src={store.shop_image}
                    className="h-[7rem]  w-full object-cover rounded-t-md overflow-hidden object-center sm:h-full sm:w-full"
                  />
                </div>
                <LikeButtons store={store} />
                <a className="text-sm font-bold mb-2 text-vol text-center">
                  {isOpen ? "Ouvert" : "Fermé"}
                </a>
                <p className="text-xs font-medium mb-2 text-gray-500 text-center">
                  {/*store.delivery*/}
                </p>
              </div>
              <div className="flex flex-col justify-between items-star basis-1/2 px-4 py-2">
                <div className="">
                  <h3 className="text-[13px] mb-4 font-semibold text-gray-800 text-center">
                    {store.title}
                  </h3>
                  <div className="h-[3rem] my-2 flex justify-center items-center w-full">
                    {store.logo ? (
                      <img
                        src={store.logo}
                        alt=""
                        className="object-contain h-full w-full"
                      />
                    ) : (
                      <img
                        src="/logo/logo-ao.png"
                        alt=""
                        className="object-contain h-full w-full"
                      />
                    )}
                  </div>

                  <div className="text-xs my-2 text-gray-700">
                    <p className="">{store.street},</p>
                    <p className="">
                      {store.postal_code} {store.city}
                    </p>
                    <div className="">
                      <p className="">{store.country}</p>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/${store.city}/${store.slug}`}
                  className="w-full hover:opacity-90 text-center text-white py-2 rounded-md bg-vol text-sm"
                >
                  Visiter en 3D
                </Link>
              </div>
            </div>
          );
        })}
      {stores.length === 0 && (
        <div className="flex min-h-96 flex-col justify-center items-center w-full h-full">
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            Aucun résultat
          </h3>
        </div>
      )}
    </aside>
  );
};

export default Stores
