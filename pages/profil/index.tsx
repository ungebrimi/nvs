import { useAuthProvider } from "../../context/AuthContext";
import { updateUserInfo } from "../../utils/auth"
import { useEffect, useState, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Profile() {
  const { user, userData, setUserData } = useAuthProvider();
  const [reallyWantsToDelete, setReallyWantsToDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Virtualia shop | Profile";
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: any = Object.fromEntries(data.entries());
    // trim values.phone_number to ensure no spaces
    // are included in the phone number
    values.phone_number = values.phone_number.trim();
    if (values.username === "") {
      values.username = userData.username;
    }
    if (values.email === "") {
      values.email = userData.email;
    }
    if (values.phone_prefix === "") {
      values.phone_prefix = userData.phone_prefix;
    }
    if (values.phone_number === "") {
      values.phone_number = userData.phone_number;
    }
    if (values.street_address === "") {
      values.street_address = userData.street_address;
    }
    if (values.city === "") {
      values.city = userData.city;
    }
    if (values.region === "") {
      values.region = userData.region;
    }
    if (values.country === "") {
      values.country = userData.country;
    }
    if (values.zip === "") {
      values.zip = userData.zip;
    }
    if (values.username === "") {
      values.username = userData.username;
    }
    if (values.first_name === "") {
      values.first_name = userData.first_name;
    }
    if (values.last_name === "") {
      values.last_name = userData.last_name;
    }
    try {
      updateUserInfo(values, user.id);
      setUserData(values);
    } catch (error: any) {
      setMessage(error.message);
      setShow(true);
    } finally {
      setMessage("Profil mis à jour avec succès");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  };

  return (
    <>
      <>
        {/* Global notification live region, render this permanently at the end of the document */}
        <div
          aria-live="assertive"
          className="pointer-events-none fixed z-50 inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
              show={show}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="mt-1 text-sm text-gray-600">{message}</p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => {
                          setShow(false);
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>{" "}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Profil
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Ces informations seront affichées publiquement, alors faites
                  attention à ce que vous partagez.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Nom d{`'`}utilisateur
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg rounded-md shadow-sm">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        placeholder={userData?.username || ""}
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-vb focus:ring-vb sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Photo
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center">
                      <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                {userData && userData.points >= 0 ? (
                  <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label className="block text-sm font-medium text-gray-700">
                      Points
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <span className="text-gray-500">

                        {userData?.points + " points"}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Renseignements personnels
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Ces informations ne seront utilisées que pour simplifier la
                  commande de produits
                </p>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Prénom
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      placeholder={userData?.first_name || ""}
                      autoComplete="given-name"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-vb focus:ring-vb sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Nom de famille
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      placeholder={userData?.last_name || ""}
                      autoComplete="family-name"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-vb focus:ring-vb sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Adresse e-mail
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={userData?.email || ""}
                      autoComplete="email"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-vb focus:ring-vb sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Numéro de téléphone
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <label htmlFor="phone_prefix" className="sr-only">
                        préfixe du téléphone
                      </label>
                      <select
                        id="phone_prefix"
                        name="phone_prefix"
                        placeholder="+33"
                        autoComplete="phone_prefix"
                        className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-vb focus:ring-vb sm:text-sm"
                      >
                        {userData?.phone_prefix !== "" ? (
                          <option>{userData?.phone_prefix || "+33"}</option>
                        ) : null}
                        <option>+33</option>
                        <option>+47</option>
                        <option>+31</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      className="block w-full rounded-md border-gray-300 pl-16 focus:border-vb focus:ring-vb sm:text-sm"
                      placeholder={userData?.phone_number || ""}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Pays
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      defaultValue="France"
                      className="block w-full max-w-lg rounded-md border-gray-300 bg-gray-100 text-gray-500 shadow-sm focus:border-vb focus:ring-vb sm:max-w-xs sm:text-sm"
                    >
                      {userData?.country !== "" ? (
                        <option>{userData?.country}</option>
                      ) : null}
                      <option>France</option>
                      <option>Belgium</option>
                      <option>Luxembourg</option>
                    </select>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="street_address"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Adresse
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="street_address"
                      id="street_address"
                      placeholder={userData?.street_address || ""}
                      autoComplete="street_address"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-vb focus:ring-vb sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Ville
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder={userData?.city || ""}
                      autoComplete="address-level2"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-vb focus:ring-vb sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Région
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      placeholder={userData?.region || ""}
                      autoComplete="address-level1"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-vb focus:ring-vb sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Zip / Code postal
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="zip"
                      id="zip"
                      placeholder={userData?.zip || ""}
                      autoComplete="zip"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-vb focus:ring-vb sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 
              <div className="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Notifications
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Nous vous informerons toujours des changements importants,
                    mais vous pouvez choisir à tout moment ce dont vous
                    souhaitez entendre parler régulièrement.
                  </p>
                </div>
                <div className="space-y-6 divide-y divide-gray-200 sm:space-y-5">
                  <div className="pt-6 sm:pt-5">
                    <div role="group" aria-labelledby="label-email">
                      <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                        <div>
                          <div
                            className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                            id="label-email"
                          >
                            Par email
                          </div>
                        </div>
                        <div className="mt-4 sm:col-span-2 sm:mt-0">
                          <div className="max-w-lg space-y-4">
                            <div className="relative flex items-start">
                              <div className="flex h-5 items-center">
                                <input
                                  id="comments"
                                  name="comments"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-vb focus:ring-vb"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="comments"
                                  className="font-medium text-gray-700"
                                >
                                  M'informer des nouveaux arrivages pour les
                                  produits, les marques et les boutiques que je
                                  suis
                                </label>
                              </div>
                            </div>
                            <div className="relative flex items-start">
                              <div className="flex h-5 items-center">
                                <input
                                  id="candidates"
                                  name="candidates"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-vb focus:ring-vb"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="candidates"
                                  className="font-medium text-gray-700"
                                >
                                  Offres spéciales - réductions - prix
                                </label>
                              </div>
                            </div>
                            <div className="relative flex items-start">
                               <div className="flex h-5 items-center">
                                <input
                                  id="offers"
                                  name="offers"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-vb focus:ring-vb"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="offers"
                                  className="font-medium text-gray-700"
                                >
                                  Ne pas me notifier par email
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 sm:pt-5">
                    <div role="group" aria-labelledby="label-notifications">
                      <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                        <div>
                          <div
                            className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                            id="label-notifications"
                          >
                            Notifications push
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="max-w-lg">
                            <p className="text-sm text-gray-500">
                              Ceux-ci sont livrés par SMS sur votre téléphone
                              mobile.
                            </p>
                            <div className="mt-4 space-y-4">
                              <div className="flex items-center">
                                <input
                                  id="push-everything"
                                  name="push-notifications"
                                  type="radio"
                                  className="h-4 w-4 border-gray-300 text-vb focus:ring-vb"
                                />
                                <label
                                  htmlFor="push-everything"
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  Tout
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="push-email"
                                  name="push-notifications"
                                  type="radio"
                                  className="h-4 w-4 border-gray-300 text-vb focus:ring-vb"
                                />
                                <label
                                  htmlFor="push-email"
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  Identique à l'e-mail
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="push-nothing"
                                  name="push-notifications"
                                  type="radio"
                                  className="h-4 w-4 border-gray-300 text-vb focus:ring-vb"
                                />
                                <label
                                  htmlFor="push-nothing"
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  Pas de notifications push
                                </label>
                              </div>
                            </div>
                          </div>  
                          </div>
                      </div>
                    </div>
                  </div>                </div>
              </div>*/}
          </div>

          <div className="pt-5">
            <div className="flex flex-col-reverse xs:flex-row gap-4 justify-between">
              <div className="flex flex-col gap-2">
                <span
                  onClick={() => setReallyWantsToDelete(true)}
                  className="text-sm text-red-500"
                >
                  Supprimer un compte
                </span>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-vb py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-vb focus:outline-none focus:ring-2 focus:ring-vb focus:ring-offset-2"
              >
                Sauvegarder mes changements
              </button>
            </div>
          </div>

          {reallyWantsToDelete && (
            <p className="text-sm text-red-500 py-2">
              Nous sommes désolés de vous voir partir, en êtes-vous sûr?
            </p>
          )}
        </form>
        {/*<form
            onSubmit={handleMagicLink}
            className="space-y-6 mb-12 pt-8 sm:space-y-5 sm:pt-10"
          >
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Points de fidélité
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Faites profiter vos amis de Virtualia et gagnez 20 points de
                fidélité par personne. Les points seront délégués après que
                l'email de votre ami ait été authentifié.
              </p>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="refferral_email"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Email de votre ami
              </label>
              <div className="mt-1 flex gap-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="refferral_email"
                  id="refferral_email"
                  placeholder={"email"}
                  autoComplete="refferral_email"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-vb focus:ring-vb sm:max-w-xs sm:text-sm"
                />

                <button
                  type="submit"
                  className="px-4 rounded-md border border-transparent bg-vb text-sm font-medium text-white shadow-sm hover:bg-vb focus:outline-none focus:ring-2 focus:ring-vb focus:ring-offset-2"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </form>*/}
      </div>
    </>
  );
}
Profile.layout = "L1"
