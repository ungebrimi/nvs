import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useStore } from "../context/StoreContext";
import { useAuthProvider } from "../context/AuthContext";
import { signOut } from "../utils/auth"
import { useRouter } from "next/router";
import Breadcrumb from "../components/Breadcrumb";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function StoreNavbar() {
  const { store } = useStore();
  const { isAuth, userData } = useAuthProvider();
  const router = useRouter()
  const disconnect = () => {
    signOut()
    router.push("/")
  }
  const data = [
    {
      text: "Revenir à l'accueil ",
      link: "/",
    },
    {
      text: "Boutique virtuelle",
      link: `/${store?.city}/${store?.slug}`,
    },
    {
      text: "Contactez-nous",
      link: `/${store?.city}/${store?.slug}/contactez`,
    },
  ];
  // ${store=.city}/${store.slug}
  return (
    <>{store ? (
      <>
        <Disclosure
          as="nav"
          className="bg-vb py-2 fixed z-50 sm:relative w-full sm:bg-white shadow"
        >
          {({ open }) => (
            <>
              <div className="mx-auto px-6 max-w-[92rem]">
                <div className="flex h-16 justify-between">
                  <div className="flex items-center">
                    <div className="flex flex-shrink-0 gap-2 items-center">
                      <Link href={`/${store.city}/${store.slug}`}>
                        <img
                          className="hidden sm:block h-8 w-auto lg:hidden"
                          src={store.logo !== "" ? store.logo : "/logo/logo-ao.png"}
                          alt={store.title}
                        />
                        <img
                          className="h-11 w-auto hidden lg:block"
                          src={store.logo !== "" ? store.logo : "/logo/logo-ao.png"}
                          alt={store.title}
                        />
                      </Link>
                      <h2
                        className={`${store.logo === "" ? "hidden lg:block" : "hidden"
                          } text-xl font-bold`}
                      >
                        {store.title}
                      </h2>
                    </div>
                    <p className="sm:hidden text-md text-gray-100">
                      Bienvenue chez{" "}
                      <span className="capitalize text-accent">{store.title}</span>,
                      un magasin 100% immersif à {store.city}
                    </p>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
                      {data.map((item, idx: number) => (
                        <Link
                          key={idx}
                          href={item.link}
                          className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm  text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                          {item.text}
                        </Link>
                      ))}
                      {store && store.matterport_url_vr && (
                        <Link
                          href={`/${store.city}/${store.slug}/vr`}
                          className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                          Visite en réalité virtuelle
                        </Link>
                      )}
                    </div>
                    {/* Profile dropdown */}
                    {isAuth ? (
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-vb focus:ring-offset-2">
                            <span className="sr-only">Open user menu</span>
                            <svg
                              className="h-8 w-8 rounded-full bg-gray-100 text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/profil"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Mon profil
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  onClick={() => disconnect()}
                                >
                                  Se déconnecter
                                </button>
                              )}
                            </Menu.Item>
                            {userData && userData.points ? (

                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                    )}
                                  >
                                    {userData?.points && userData.points > 0 ? (userData.points + " points") : null}
                                  </button>
                                )}
                              </Menu.Item>
                            ) : (null)}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-vb focus:ring-offset-2">
                            <span className="sr-only">
                              Ouvrir le menu utilisateur
                            </span>
                            <svg
                              className="w-6 h-6 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              ></path>
                            </svg>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/connexion"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Connexion
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="inscrivez-vous"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Créer un compte
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-100 focus:ring-vb">
                      <span className="sr-only">Ouvrir le menu principal</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pt-2 pb-3">
                  {data.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.link}
                      className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm  text-gray-100"
                    >
                      {item.text}
                    </Link>
                  ))}
                  {store && store.matterport_url_vr && (
                    <Link
                      href={`/${store.city}/${store.slug}/vr`}
                      className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm text-gray-100"
                    >
                      Visite en réalité virtuelle
                    </Link>
                  )}
                  {isAuth ? (
                    <div className="mt-3 space-y-1 ">
                      <Link
                        href="/profil"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm text-gray-100"
                      >
                        Mon profil
                      </Link>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm text-gray-100"
                        onClick={() => disconnect()}
                      >
                        Se déconnecter
                      </Disclosure.Button>
                      {userData && userData.points ? (

                        <Disclosure.Button
                          as="a"
                          href="#"
                          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm  text-gray-100"
                        >
                          {userData?.points && userData.points > 0 ? (userData?.points + " points") : null}
                        </Disclosure.Button>
                      ) : null}
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/connexion"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm  text-gray-100"
                      >
                        Connexion
                      </Link>
                      <Link
                        href="/inscrivez-vous"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm text-gray-100"
                      >
                        Créer un compte
                      </Link>
                    </>
                  )}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

      </>
    ) : null}</>
  );
}
