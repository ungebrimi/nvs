import React, { useEffect, useState, Fragment } from 'react'
import { getProductsView, addImagesToProductsFeed } from '../../utils/products'
import Popup from '../../components/home/Popup';
import Image from 'next/image'
import Pagination from "../../components/Pagination";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { getStoreById } from '../../utils/store';

export async function getStaticProps() {
  const products = await getProductsView()
  const p = await addImagesToProductsFeed(products)

  return {
    props: {
      p: p,
    },
  }
}

const arr: any = [
  {
    id: "brand",
    name: "Marque",
    options: [],
  },
  {
    id: "category",
    name: "Type de produit",
    options: [],
  },
];

const sort = [
  { name: "Plus récent", value: "newest", href: "#", current: false },
  {
    name: "Prix croissant",
    value: "increasing",
    current: false,
  },
  { name: "Prix décroissant", value: "decreasing", current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Index = ({ p }: any) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any>(p)
  const [currentProducts, setCurrentProducts] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [activeFilters, setActiveFilters] = useState<any>([]);
  const [filters, setFilters] = useState<any>(arr);
  const [sortOptions, setSortOptions] = useState<any>(sort);
  const [store, setStore] = useState<any>([])
  const initialProducts = p;

  const addStore = async (pid: any) => {
    if (pid !== undefined) {
      try {
        const store = await getStoreById(pid)
        return store
      } catch (err: any) {
        console.log(err.message)
      }
    }
  }

  useEffect(() => {
    addStore(selectedProduct.product_id).then(res => setStore(res))
  }, [selectedProduct])

  let PageSize = 10;

  const infiniteScroll = (data: any, limit: number, page: any) => {
    const ending = limit * page;
    return data.slice(0, ending);
  };

  // useInifitescroll on product and set it to currentProducts
  useEffect(() => {
    const currentProducts = infiniteScroll(products, 10, currentPage);
    setCurrentProducts(currentProducts);
  }, [currentPage, products]);

  const handleClick = (product: any) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const uArray = (array: any) => {
    var out = [];
    for (var i = 0, len = array.length; i < len; i++)
      if (out.indexOf(array[i]) === -1)
        out.push(array[i]);
    return out;
  }

  useEffect(() => {
    const brands = products.map((product: any) => product.brand);
    const categories = products.map((product: any) => product.product_category);
    // sort brands in alphabetical order
    const sortedBrands = brands.sort();
    // sort categories in alphabetical order
    const sortedCategories = categories.sort();
    const uniqueBrands = uArray(sortedBrands)
    const uniqueCategories = uArray(sortedCategories)
    uniqueBrands.forEach((brand: any) => {
      filters[0].options.push({
        name: brand,
        value: brand,
        checked: false,
        type: "brand",
      });
    });
    uniqueCategories.forEach((category: any) => {
      filters[1].options.push({
        name: category,
        value: category,
        checked: false,
        type: "category",
      });
    });
  }, [products, filters])

  useEffect(() => {
    let both = false;
    if (activeFilters.length >= 1) {
      // check if active filters contains type === "brand" and type ="category"
      const brands = activeFilters.filter((filter: any) => {
        return filter.type === "brand";
      });
      const categories = activeFilters.filter((filter: any) => {
        return filter.type === "category";
      });
      if (brands.length > 0 && categories.length > 0) {
        both = true;
      } else {
        both = false;
      }
      const filteredProducts = initialProducts.filter((product: any) => {
        if (both) {
          return (
            brands.some((brand: any) => {
              return brand.value === product.brand;
            }) &&
            categories.some((category: any) => {
              return category.value === product.product_category;
            })
          );
        } else {
          return (
            brands.some((brand: any) => {
              return brand.value === product.brand;
            }) ||
            categories.some((category: any) => {
              return category.value === product.product_category;
            })
          );
        }
      });
      setProducts(filteredProducts);
    } else {
      setProducts(initialProducts);
    }
  }, [activeFilters, initialProducts]);

  const handleCheck = (option: any) => {
    // filter the options. where the option is the same as the one that was clicked, change the checked value to the opposite of what it was
    // then set the filters to the new array
    const newFilters = filters.map((filter: any) => {
      filter.options = filter.options.map((opt: any) => {
        if (opt.value === option.value) {
          opt.checked = !opt.checked;
        }
        return opt;
      });
      return filter;
    });
    setFilters(newFilters);

    if (option.checked) {
      setActiveFilters([...activeFilters, option]);
    } else {
      // clean the activeFilters array from the option
      // set option.checked to false
      const newActiveFilters = activeFilters.filter(
        (filter: any) => filter.value !== option.value
      );
      setActiveFilters(newActiveFilters);
    }
  };

  const handleRemove = (option: any) => {
    option.checked = false;
    const newActiveFilters = activeFilters.filter(
      (filter: any) => filter.value !== option.value
    );

    setActiveFilters(newActiveFilters);
  };

  const handleSort = (sort: any) => {
    setSortOptions((prev: any) => {
      return prev.map((option: any) => {
        if (option.value === sort.value) {
          option.current = true;
        } else {
          option.current = false;
        }
        return option;
      });
    });
  };

  useEffect(() => {
    if (sortOptions[0].current) {
      setProducts(initialProducts);
    }
    if (sortOptions[1].current) {
      setProducts([...products].sort((a, b) => a.price - b.price));
    }
    if (sortOptions[2].current) {
      setProducts([...products].sort((a, b) => b.price - a.price));
    }
  }, [sortOptions, initialProducts, products]);

  return (
    <div className="bg-warm-gray">
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 sm:hidden"
          onClose={setMobileFiltersOpen}
        >
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
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
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
                            <Disclosure.Button className="flex w-full items-center justify-between bg-warm-gray px-2 py-3 text-sm text-gray-400">
                              <span className="text-gray-900">
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
                          <Disclosure.Panel className="mr-2 pt-6 h-96 overflow-scroll">
                            <div className="space-y-6">
                              {section.options.map(
                                (option: any, optionIdx: number) => {
                                  return (
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
                                        className="pl-6 text-sm text-gray-500"
                                      >
                                        {option.name}
                                      </label>
                                    </div>
                                  );
                                }
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

      <main className="max-w-7xl mx-auto py-4 h-full">
        <div className="bg-warm-gray">
          <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Produits disponibles
            </h1>
            <p className="mt-4 max-w-xl text-gray-700">
              Voir une collection de produits de nos boutiques partenaires.
            </p>
          </div>
        </div>

        {/* Filters */}
        <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" className="sr-only">
            Filtrer
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
                  <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option: any) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              className={classNames(
                                option.current
                                  ? "text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={() => handleSort(option)}
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
                onClick={() => setMobileFiltersOpen(true)}
              >
                Filtrez
              </button>

              <div className="hidden sm:block">
                <div className="flow-root">
                  <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                    {filters.map((section: any) => (
                      <Popover
                        key={section.name}
                        className="relative inline-block px-4 text-left"
                      >
                        <Popover.Button className="group inline-flex justify-center text-sm  text-gray-700 hover:text-gray-900">
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
                          <Popover.Panel className="absolute right-0 z-10 mt-2 h-96 overflow-y-auto origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                      onChange={() => handleCheck(option)}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 px-2 rounded border-gray-300 text-vb focus:ring-vb"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="whitespace-nowrap pl-3 text-sm  text-gray-900"
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
          <div className="bg-warm-gray">
            <div className="mx-auto max-w-7xl py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
              <h3 className="text-sm font-medium text-gray-500">
                Filtré par:
                <span className="sr-only">, active</span>
              </h3>

              <div
                aria-hidden="true"
                className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
              />

              <div className="mt-2 sm:mt-0 sm:ml-4">
                <div className="-m-1 flex flex-wrap items-center">
                  {activeFilters.map((activeFilter: any) => (
                    <span
                      key={activeFilter.value}
                      className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm  text-gray-900"
                    >
                      <span>{activeFilter.name}</span>
                      <button
                        type="button"
                        className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                        onClick={() => handleRemove(activeFilter)}
                      >
                        <span className="sr-only">
                          Remove filter for {activeFilter.name}
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

        {/* Product grid */}
        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-2xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:max-w-7xl min-h-[66.3vh] lg:px-8"
        >
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-2 gap-y-1 gap-x-1 md:grid-cols-4 md:gap-y-2 md:gap-x-2 xl:grid-cols-4 xl:gap-x-4 xl:gap-y-4">
            {currentProducts &&
              currentProducts.map((product: any) => {
                return (
                  <div
                    key={product.product_id}
                    className="group relative flex flex-col overflow-hidden rounded-lg shadow-sm border border-gray-200 bg-white"
                  >
                    <div className="aspect-w-3 aspect-h-4 bg-gray-100 group-hover:opacity-75 ">
                      <Image
                        width={500}
                        height={500}
                        alt={product.name}
                        onClick={() => handleClick(product)}
                        src={product.thumbnail}
                        className="h-full w-full object-contain object-center sm:h-full sm:w-full"
                      />
                    </div>
                  </div>
                );
              })}
            {products && products.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg text-gray-500">
                  Aucun produit ne correspond à votre recherche
                </p>
              </div>
            )}
          </div>
          <div className="flex mt-6 justify-center py-2 items-center w-full">
            <Pagination
              currentPage={currentPage}
              totalCount={products.length}
              pageSize={PageSize}
              onPageChange={(page: any) => setCurrentPage(page)}
            />
          </div>
        </section>
        <>
          {isOpen ? (
            <Popup
              open={isOpen}
              setOpen={setIsOpen}
              product={selectedProduct}
              id={selectedProduct.id}
              store={store}
            />
          ) : null}
        </>
      </main>
    </div>
  );
}

export default Index
Index.layout = "L1"
