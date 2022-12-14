import { Disclosure } from "@headlessui/react";
import { FiLock } from "react-icons/fi";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/24/outline";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Filter = ({ filters, activeFilters, handleCheck, handleRemove }: any) => {

  return (
    <div className="mx-auto max-w-7xl bg-white py-8 rounded-2xl shadow-md sm:px-6 lg:px-8 mt-4">
      <div className="grid grid-cols-5 px-4 gap-4 items-center">
        <div className="col-span-5 lg:col-span-2">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Recherche par ville
          </label>
          <div className="relative mt-1 text-gray-700 flex items-center">
            <input
              type="text"
              name="search"
              id="search"
              value="Montauban"
              placeholder="Montauban"
              className="block w-full bg-neutral-50 rounded-md border-gray-300 pr-12 shadow-sm focus:border-vb focus:ring-vb sm:text-sm"
              onChange={(e) => console.log(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex">
              <kbd className="inline-flex items-center bg-vol rounded text-white px-2 font-sans text-sm font-medium">
                <FiLock className="h-5 w-5" />
              </kbd>
            </div>
          </div>
        </div>
        {filters.map((section: any) => (
          <Disclosure
            as="div"
            key={section.name}
            className="col-span-5 mt-6 relative lg:col-span-1"
          >
            {({ open }) => (
              <>
                <h3 className=" flow-root">
                  <Disclosure.Button className="relative flex justify-between w-full cursor-default rounded-md border border-gray-300 bg-white py-2 px-3 text-left shadow-sm focus:border-vb focus:outline-none focus:ring-1 focus:ring-vb sm:text-sm">
                    <span className="block truncate text-gray-500">
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
                <Disclosure.Panel className="absolute px-2 py-2 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white overflow-y-auto text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <div className="">
                    {section.options.map((option: any, optionIdx: number) => (
                      <div
                        key={`${option.value} - ${optionIdx}`}
                        onClick={() => handleCheck(option)}
                        className="flex h-8 items-center justify-between"
                      >
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="text-sm text-gray-500"
                        >
                          {option.name}
                        </label>
                        {option.checked && (
                          <CheckIcon className={`h-5 w-5 text-gray-500 mr-3`} />
                        )}
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
        <div className="-m-1 flex flex-wrap items-center col-span-5">
          {activeFilters.map((activeFilter: any) => (
            <span
              key={activeFilter.value}
              className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-gray-100 py-1.5 pl-3 pr-2 text-sm  text-gray-700"
            >
              <span>{activeFilter.name}</span>
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
  );
}

export default Filter

