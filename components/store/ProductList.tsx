import Image from "next/image";
import { useMatterport } from "../../context/MatterportContext";
import { useState, Fragment, useEffect } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList({ p, f, store }: any) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<any>(f)
  const [products, setProducts] = useState<any>(p)
  const [activeFilters, setActiveFilters] = useState<any>([]);

  const { flyToTag } = useMatterport();

  useEffect(() => {
    let both = false;
    if (activeFilters.length >= 1) {
      // check if active filters contains type === "brand" and type ="category"
      const brands = activeFilters.filter((filter: any) => {
        return filter.type === "brand";
      });
      const categories = activeFilters.filter((filter: any) => {
        return filter.type === "product_name";
      });
      if (brands.length > 0 && categories.length > 0) {
        both = true;
      } else {
        both = false;
      }


      const filteredProducts = p.filter((product: any) => {
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
      console.log(filteredProducts)
      setProducts(filteredProducts);
    } else {
      setProducts(p);
    }
  }, [activeFilters]);

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

  return (
    <>
      <div
        className={`${store.is_simple_virtual_visit || store.is_museum ? "hidden" : ""
          } warm-gray-50`}
      >
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
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
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white py-4 pb-6 shadow-xl">
                    <div className="mt-14 flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filtrez
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4">
                      {filters && filters.map((section: any) => (
                        <Disclosure
                          as="div"
                          key={section.name}
                          className="border-t border-gray-200 pt-4 pb-4"
                        >
                          {({ open }) => (
                            <fieldset>
                              <legend className="w-full px-2">
                                <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                  <span className="first-letter:capitalize text-sm font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex h-7 items-center">
                                    <ChevronDownIcon
                                      className={classNames(
                                        open ? "-rotate-180" : "rotate-0",
                                        "h-5 w-5 transform"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Disclosure.Button>
                              </legend>
                              <Disclosure.Panel className="px-4 pt-4 pb-2">
                                <div className="space-y-6">
                                  {section.options.map(
                                    (option: any, optionIdx: any) => {
                                      return (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`${section.id}-${optionIdx}-mobile`}
                                            name={`${section.id}`}
                                            defaultValue={option.value}
                                            onChange={() => handleCheck(option)}
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-vb focus:ring-vb"
                                            checked={option.checked}
                                          />
                                          <label
                                            htmlFor={`${section.id}-${optionIdx}-mobile`}
                                            className="first-letter:capitalize ml-3 text-sm text-gray-500"
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </Disclosure.Panel>
                            </fieldset>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          <main className="mx-auto px-4">
            <div className="border-b border-gray-200 pt-24 pb-10">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Nos produits
              </h1>
              <p className="mt-4 text-base text-gray-500">
                Filtrez et recherchez certains de nos produits disponibles
              </p>
            </div>

            <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <aside>
                <h2 className="sr-only">Filtrez</h2>

                <button
                  type="button"
                  className="inline-flex items-center lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="text-sm font-medium text-gray-700">
                    Filtrez
                  </span>
                  <PlusIcon
                    className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                </button>

                <div className="hidden lg:block">
                  {/*DESKTOP FILTers*/}
                  <form className="space-y-10 divide-y divide-gray-200">
                    {filters && filters.map((section: any, sectionIdx: any) => (
                      <div
                        key={sectionIdx}
                        //@ts-ignore
                        className={sectionIdx === 0 ? null : "pt-10"}
                      >
                        <fieldset>
                          <legend className="block text-sm first-letter:capitalize font-medium text-gray-900">
                            {section.name}
                          </legend>
                          <div className="space-y-3 pt-6">
                            {section.options.map(
                              (option: any, optionIdx: any) => (
                                <div
                                  key={optionIdx}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`${section.id}-${optionIdx}`}
                                    name={`${section.id}`}
                                    defaultValue={option.value}
                                    onChange={() => handleCheck(option)}
                                    type="checkbox"
                                    checked={option.checked}
                                    className="h-4 w-4 first-letter:capitalize rounded border-gray-300 text-vb focus:ring-vb"
                                  />
                                  <label
                                    htmlFor={`${section.id}-${optionIdx}`}
                                    className="ml-3 first-letter:capitalize text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              )
                            )}
                          </div>
                        </fieldset>
                      </div>
                    ))}
                  </form>
                </div>
              </aside>
              <section
                aria-labelledby="product-heading"
                className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
              >
                <h2 id="product-heading" className="sr-only">
                  Products
                </h2>
                <div className="grid grid-cols-1 xs:grid-cols-2 xs:gap-x-2 gap-y-4 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3 lg:max-h-screen lg:overflow-y-scroll">
                  {products &&
                    products.map((product: any) => {
                      let regex = /\/n/g;
                      let result = product.description?.replace(regex, "");
                      let description = result?.slice(0, 50);
                      if (result?.length > 50) {
                        description += "...";
                      }
                      let path = product.name.toLowerCase().replace(/ /g, '-')
                      let id = product.product_id.toString()
                      return (
                        <div
                          key={product.product_id}
                          className="group relative flex text-xs flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                        >
                          <Link href={`/${store.city}/${store.slug}/produits/${path}/${id}`}>
                            <div className="aspect-w-3 aspect-h-4 bg-gray-100 group-hover:opacity-75 sm:aspect-none sm:h-96">
                              <Image
                                width={400}
                                height={500}
                                alt={product.name}
                                onClick={() => console.log({ product })}
                                src={product.thumbnail}
                                className="h-full w-full object-contain object-center sm:h-full sm:w-full"
                              />
                            </div>
                          </Link>
                          <div className="flex flex-1 flex-col h-full justify-between space-y-2 p-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">
                                {product.name} - {product.brand}
                              </h3>
                              <p className="text-xs md:text-sm text-gray-500 whitespace-pre-line">
                                {description}
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-xs md:text-base font-medium text-gray-900">
                                {product.price ? product.price + " €" : null}
                              </p>
                              {product.tag_sid ? (
                                <button
                                  onClick={() => flyToTag(product.tag_sid)}
                                  className="text-xs md:text-sm text-vb hover:border-b-[1px]"
                                >
                                  Situer dans le magasin
                                </button>
                              ) : (
                                <button className="text-xs md:text-sm text-vb hover:border-b-[1px]">
                                  Disponible en magasin
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {products.length === 0 && (
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-lg text-gray-500">
                        Aucun produit ne correspond à votre recherche
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
