import { Fragment, useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import gsap from "gsap";
import Link from "next/link";
import { getStores } from "../../utils/app";
import { getStoreLikes, getStoreFollowers } from "../../utils/like";
import { getFilters } from "../../utils/filters";
import { useStore } from "../../context/StoreContext"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const sortOptions = [
  { name: "Le plus récent", current: true },
  { name: "Le plus suivi", current: false },
  { name: "Le plus aimé", current: false },
];

export async function getStaticProps() {
  const stores = await getStores().then(async (res: any) => {
    if (res) {
      const likes = await getStoreLikes(res.store_id)
      const followers = await getStoreFollowers(res.store_id)
      res.likes = likes
      res.followers = followers
    }
    return res
  })
  const filters = await getFilters(11898)
  return {
    props: {
      filters: filters,
      s: stores
    }
  }
}


export default function Boutiques({ filters, s }: any) {
  const [open, setOpen] = useState<boolean>(false)
  const [stores, setStores] = useState<any>(s)
  const [activeFilters, setActiveFilters] = useState<any>([])

  useEffect(() => {
    const filteredResults = s.filter((result: any) => {
      if (activeFilters.length === 0) {
        return result;
      }
      return activeFilters.some(
        (filter: any) =>
          result.store_type.includes(filter.value) ||
          result.country.includes(filter.value)
      );
    });
    setStores(filteredResults);

  }, [activeFilters, s, stores])

  const handleCheck = (option: any) => {
    // set option.checked to true and push the option to activeFilters
    option.checked = !option.checked;
    if (option.checked) {
      setActiveFilters([...activeFilters, option]);
    } else {
      const newFilters = activeFilters.filter(
        (filter: any) => filter.value !== option.value
      );
      setActiveFilters(newFilters);
    }
  };

  const handleSort = (sortOption: any) => {
    // set sortOption.current to true and set all others to false
    sortOptions.forEach((option) => {
      option.current = false;
    });
    sortOption.current = true;

    // sort the stores array
    if (sortOption.name === "Le plus récent") {
      setStores(s);
    }
    if (sortOption.name === "Le plus suivi") {
      setStores(
        s.sort(
          (a: any, b: any) => a.followers.length - b.followers.length
        )
      );
    }
    if (sortOption.name === "Le plus aimé") {
      setStores(
        s.sort((a: any, b: any) => b.likes.length - a.likes.length)
      );
    }
  };

  const handleRemove = (option: any) => {
    const newFilters = activeFilters.filter(
      (filter: any) => filter.value !== option.value
    );
    // set option.checked to false
    option.checked = false;
    setActiveFilters(newFilters);
  };

  return (
    <div className="relative min-h-[91.5vh] overflow-hidden bg-warm-gray py-28">
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filtrer</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Fermer le menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section: any) => (
                    <Disclosure
                      as="div"
                      key={section.name}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options?.map(
                                (option: any, optionIdx: number) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      onChange={() => handleCheck(option)}
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-vb focus:ring-vb"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-500"
                                    >
                                      {option.name}
                                    </label>
                                  </div>
                                )
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Filters */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filtres
        </h2>

        <div className="border-b border-gray-200 pb-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Trier par
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-50 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <button
                            onClick={() => handleSort(option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filtrer
            </button>

            <div className="hidden sm:block">
              <div className="flow-root">
                <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                  {filters && filters.map((section: any, sectionIdx: number) => (
                    <Popover
                      key={sectionIdx}
                      className="relative inline-block px-4 text-left"
                    >
                      <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>{section.name}</span>

                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Popover.Panel className="absolute max-h-96 overflow-y-scroll right-0 z-50 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <form className="space-y-4">
                            {section.options.map(
                              (option: any, optionIdx: number) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    checked={option.checked}
                                    onChange={() => handleCheck(option)}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-vb focus:ring-vb"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                  >
                                    {option.name}
                                  </label>
                                </div>
                              )
                            )}
                          </form>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ))}
                </Popover.Group>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        <div className="">
          <div className="mx-auto mb-16 max-w-7xl py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 className="text-sm font-medium text-gray-500">
              Filtrer
              <span className="sr-only">, actif</span>
            </h3>

            <div
              aria-hidden="true"
              className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
            />

            <div className="mt-2 sm:mt-0 sm:ml-4">
              <div className="-m-1 flex flex-wrap items-center">
                {activeFilters && activeFilters.map((activeFilter: any) => (
                  <span
                    key={activeFilter.value}
                    className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                  >
                    <span>{activeFilter.label}</span>
                    <button
                      type="button"
                      className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                      onClick={() => handleRemove(activeFilter)}
                    >
                      <span className="sr-only">
                        Retirer le filtre pour {activeFilter.name}
                      </span>
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <main>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-6 sm:gap-y-16 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
            {stores.map((store: any, idx: number) => (
              <Store store={store} key={idx} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const Store = ({ store }: any) => {
  const { setStore } = useStore()
  const ref = useRef<any>(null);
  useLayoutEffect(() => {
    ref.current?.addEventListener("mouseenter", () => {
      gsap.to(ref.current, {
        opacity: 1,
        y: -50,
        duration: 0.5,
        stagger: 0.1,
      });
    });
    ref.current?.addEventListener("mouseleave", () => {
      gsap.to(ref.current, {
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      });
    });
  }, [ref]);

  return (
    <article key={store.store_id} className="group relative z-10">
      <div className="aspect-w-2 aspect-h-1 w-full overflow-hidden rounded-2xl sm:aspect-w-2 sm:aspect-h-2">
        <div className="absolute h-full w-full bg-vod flex flex-col justify-end items-center">
          <h3 className="w-full text-xl uppercase text-center font-bold text-white">
            {store.title}
          </h3>
          <span className="text-white">
            {/*typesOfStore
                ? typesOfStore[`${store.marker_id < 44 ? store.marker_id : 43}`]
                  .name
                : null*/}
          </span>
        </div>
      </div>
      <Link
        href={`/${store.city}/${store.slug}`}
        onClick={() => setStore(store)}
      >
        <div
          ref={ref}
          className="absolute z-1 rounded-2xl inset-0 shadow-2xl"
        >
          <div className="relative h-full w-full">
            <Image
              width={400}
              height={500}
              src={store.shop_image}
              alt={store.title}
              className="h-full w-full rounded-2xl object-cover object-center"
            />
          </div>
        </div>
      </Link>
    </article>
  );
};

Boutiques.layout = "L1"
