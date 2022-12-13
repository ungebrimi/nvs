import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { useStore } from "../../context/StoreContext";

export default function Preview({ setIsOpen, store }: any) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [mpSdk, setMpSdk] = useState();
  const { setId } = useStore();
  const [showOpenHours, setShowOpenHours] = useState<boolean>(false);
  const [showPhone, setShowPhone] = useState<boolean>(false);
  const [showBrands, setShowBrands] = useState<boolean>(false);
  const [showProducts, setShowProducts] = useState<boolean>(false);
  const [openingHours, setOpeningHours] = useState<any>([]);

  useEffect(() => {
    const openingHours: any = [];
    if (store.opening_hours) {
      for (let i = 0; i < store.opening_hours.length; i++) {
        const day = store.opening_hours[i];
        // create a switch statement that change day.day from english to french
        switch (day.day) {
          case "monday":
            day.day = "Lundi";
            break;
          case "tuesday":
            day.day = "Mardi";
            break;
          case "wednesday":
            day.day = "Mercredi";
            break;
          case "thursday":
            day.day = "Jeudi";
            break;
          case "friday":
            day.day = "Vendredi";
            break;
          case "saturday":
            day.day = "Samedi";
            break;
          case "sunday":
            day.day = "Dimanche";
            break;
          default:
            break;
        }
        openingHours.push(day);
      }
    }
    setOpeningHours(openingHours);
  }, [store]);

  const handleOpenHours = () => {
    setShowOpenHours(!showOpenHours);
    setShowPhone(false);
    setShowBrands(false);
    setShowProducts(false);
  };

  const handleShowPhone = () => {
    setShowPhone(!showPhone);
    setShowOpenHours(false);
    setShowBrands(false);
    setShowProducts(false);
  };

  const handleShowBrands = () => {
    setShowBrands(!showBrands);
    setShowOpenHours(false);
    setShowPhone(false);
    setShowProducts(false);
  };

  const handleShowProducts = () => {
    setShowProducts(!showProducts);
    setShowPhone(false);
    setShowOpenHours(false);
    setShowBrands(false);
  };

  // useEffect to set setIsOpen to false when clicking outside of the popup
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsOpen]);

  useEffect(() => {
    const load = async () => {
      try {
        const mpsdk = await window.MP_SDK.connect(
          iframeRef.current, // obtained earlier
          process.env.MATTERPORT_SDK, // your sdk key
          "" // unused but needs to be a valid string
        );
        setMpSdk(mpsdk);
      } catch (e) {
        console.error(e);
      }
    };

    if (store.matterport_id) {
      // wait for iframe to load
      if (iframeRef.current) {
        load();
      }
    }
  }, [store.matterport_id]);

  //if mpSdk remove all tags
  useEffect(() => {
    if (mpSdk) {
      if (Object.keys(mpSdk).length !== 0) {
        //@ts-ignore
        mpSdk.Mattertag.getData().then((res: any) => {
          res.forEach((store: any) => {
            //@ts-ignore
            mpSdk.Mattertag.remove(store.sid);
          });
        });
      }
    }
  }, [mpSdk]);

  return (
    <div className="absolute w-full h-full grid place-items-center top-0 left-0 z-10 bg-black bg-opacity-50">
      <div
        ref={ref}
        className="divide-y relative  sm:w-96 divide-gray-200 overflow-hidden rounded-lg bg-white shadow"
      >
        <span
          className="absolute text-xl top-2 right-4"
          onClick={() => setIsOpen(false)}
        >
          <IoMdClose />
        </span>
        <h3 className="text-xl text-center py-2 font-semibold  text-gray-700">
          {store.title}
        </h3>
        <div className="px-4 py-5 sm:p-6">
          <iframe
            ref={iframeRef}
            id="showcase"
            src={`/bundle/showcase.html?m=${store.matterport_id
              }&play=1&qs=1&log=0&brand=0&help=0&vr=0&search=0&fp=0&dh=0&mls=1&applicationKey=${process.env.MATTERPORT_KEY
              }`}
            width="100%"
            height="100%"
            className="xl:rounded-xl shadow-xl"
            allow="xr-spatial-tracking"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex justify-evenly items-center py-2">
          <button
            onClick={() => handleOpenHours()}
            className="text-sm font-medium text-gray-700 relative hover:text-gray-900"
          >
            Horaires
          </button>
          <button
            onClick={() => handleShowPhone()}
            className="text-sm font-medium text-gray-700 relative hover:text-gray-900"
          >
            Téléphone
          </button>
          <button
            onClick={() => handleShowProducts()}
            className="text-sm font-medium text-gray-700 relative hover:text-gray-900"
          >
            Produits
          </button>
          <button
            onClick={() => handleShowBrands()}
            className="text-sm font-medium text-gray-700 relative hover:text-gray-900"
          >
            Marques
          </button>
        </div>
        <div className="px-6 py-2">
          {showOpenHours ? (
            <div className="flex flex-wrap justify-between">
              {openingHours.map((opening_hour: any, index: number) => {
                return (
                  <div key={`${opening_hour} - ${index}`} className="flex items-start justify-between w-36">
                    <h3 className="font-sm"> {opening_hour.day}: </h3>
                    <ul className="w-[5rem]" key={index}>
                      {opening_hour.open.length > 0 ? (
                        <>
                          <li className="">
                            {opening_hour.open[0]} - {opening_hour.closed[0]}
                          </li>
                          {opening_hour.open[1] && (
                            <li>
                              {opening_hour.open[1]} - {opening_hour.closed[1]}
                            </li>
                          )}
                        </>
                      ) : (
                        <li>Fermé</li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : null}
          {showPhone ? (
            <a href={`tel:${store.phone}`} className="text-blue-500 ml-2">
              +{store.phone_prefix}
              {store.phone}
            </a>
          ) : null}
          {showProducts ? (
            <ul className="flex flex-wrap items-center gap-2 py-2">
              {store.top_products.map((product: string) => (
                <li key={product}>{product}</li>
              ))}
            </ul>
          ) : null}
          {showBrands ? (
            <ul className="flex flex-wrap items-center gap-2 py-2">
              {store.top_brands.map((brand: string) => (
                <li key={brand}>{brand}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="px-4 py-4 sm:px-6">
          <Link
            href={`/${store.city}/${store.slug}`}
            onClick={() => setId(store.store_id)}
          >
            <button
              type="button"
              className=" mx-auto w-full rounded-md border border-transparent bg-vol py-2 text-base font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
            >
              Visiter virtuellement
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
