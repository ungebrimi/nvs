import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Dialog, Transition, RadioGroup, Tab } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BiDetail } from "react-icons/bi";
//import ModelViewer from "./Modelviewer";
import LikeProduct from "../store/LikeProduct";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Popup({ open, setOpen, product, idx, store }: any) {
  //const [displayModel, setDisplayModel] = useState(false);
  const [displayedImage, setDisplayedImage] = useState<any>({
    type: "image",
    src: product.thumbnail,
  });

  const handleImage = (type: string, src: string) => {
    setDisplayedImage({ type, src });
  };

  let regex = /\/n/g;
  let result = product.description?.replace(regex, "");

  return (
    <Transition.Root show={open} as={Fragment} key={product.product_id}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex xs:min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden md:inline-block md:h-screen md:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel
                key={product.product_id}
                className="flex md:mt-0 w-full min-h-screen md:min-h-0 transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
              >
                <div
                  key={product.product_id}
                  className="relative sm:rounded-xl flex w-full items-center overflow-hidden bg-[#f3f4f6] px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
                >
                  <button
                    type="button"
                    className="absolute top-8 right-8 text-gray-400 hover:text-gray-500 sm:top-10 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-">
                    <Tab.Group
                      as="div"
                      className="flex w-full sm:col-span-4 lg:col-span-6 flex-col-reverse"
                    >
                      {/* Image selector */}
                      <div className="mx-auto mt-6 w-full max-w-2xl block px-4 lg:max-w-none">
                        <Tab.List className="grid grid-cols-4 gap-6">
                          {product.image.map((image: any) => (
                            <Tab
                              key={image}
                              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-gray-100 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                            >
                              {({ selected }) => (
                                <>
                                  <span className="sr-only">
                                    {" "}
                                    {product.name}{" "}
                                  </span>
                                  <span className="absolute inset-0 overflow-hidden rounded-md">
                                    <Image
                                      width={400}
                                      height={500}
                                      src={image}
                                      alt=""
                                      className="h-full w-full object-contain object-center"
                                      onClick={() =>
                                        handleImage("image", image)
                                      }
                                    />
                                  </span>
                                  <span
                                    className={classNames(
                                      selected
                                        ? "ring-gray-500"
                                        : "ring-transparent",
                                      "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                                    )}
                                    aria-hidden="true"
                                  />
                                </>
                              )}
                            </Tab>
                          ))}
                          {product.iframe ? (
                            <div className="relative hover:shadow-md border-2 transition-ease duration-200">
                              <iframe
                                src={product.iframe}
                                className="object-contain w-24 h-24"
                              />
                              <div
                                onClick={() =>
                                  handleImage("iframe", product.iframe)
                                }
                                className="absolute top-0 left-0 h-full w-full z-10"
                              ></div>
                            </div>
                          ) : null}
                          {product.video ? (
                            <div className="relative hover:shadow-md border-2 transition-ease duration-200">
                              <div
                                onClick={() =>
                                  handleImage("video", product.video)
                                }
                                className="absolute w-full h-full z-10 bg-none"
                              ></div>
                              <video
                                src={product.video}
                                controls
                                className="w-24 h-24"
                              />
                            </div>
                          ) : null}{" "}
                        </Tab.List>
                      </div>

                      <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                        {product.image.map((image: any) => (
                          <Tab.Panel key={image}>
                            <>
                              {displayedImage.type === "image" ? (
                                <Image
                                  alt={product.name}
                                  width={400}
                                  height={500}
                                  src={displayedImage.src}
                                  className="h-full w-full object-contain object-center rounded-lg"
                                />
                              ) : null}
                              {displayedImage.type === "video" ? (
                                <video
                                  src={displayedImage.src}
                                  className="h-full w-full object-cover object-center rounded-lg"
                                  controls
                                />
                              ) : null}
                              {displayedImage.type === "iframe" ? (
                                <iframe
                                  src={displayedImage.src}
                                  className="h-full w-full object-contain object-center rounded-lg"
                                />
                              ) : null}
                            </>
                          </Tab.Panel>
                        ))}
                      </Tab.Panels>
                    </Tab.Group>
                    <div className="sm:col-span-8 lg:col-span-6">
                      <h2 className="text-2xl font-medium text-gray-900 mt-8">
                        {product.name}{" "}
                        {product.brand && product.brand !== "N/A"
                          ? `- ${product.brand}`
                          : null}
                      </h2>
                      <p className={product.sku ? "" : "hidden"}>
                        SKU: {product.sku}
                      </p>
                      <section
                        aria-labelledby="information-heading"
                        className="mt-1"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>
                        {/* Reviews */}
                        <p className="font-medium text-accent text-2xl">
                          {product.price ? `€${product.price}` : ""}
                        </p>
                        <p className="mt-2 text-gray-600 whitespace-pre-line">
                          {result}
                        </p>
                        <div className="font-medium">
                          {product.characteristics ? (
                            <>
                              <h2 className="flex items-center gap-2 text-lg pt-2">
                                <BiDetail className="text-accent" />
                                Détails du produit
                              </h2>
                              <ul role="list" className="">
                                <>
                                  {product.characteristics.map(
                                    (item: any, idx: number) => {
                                      return (
                                        <li
                                          key={`${item}-${idx}`}
                                          className="flex list-disc text-base gap-2 items-center text-gray-500"
                                        >
                                          {item.title}: {item.value}{" "}
                                        </li>
                                      );
                                    }
                                  )}
                                </>
                              </ul>
                            </>
                          ) : null}
                          <h4 className="sr-only">Likes</h4>
                          <LikeProduct store={store} product={product} />
                        </div>
                      </section>
                      <form>
                        {product.colors && product.colors.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Couleur
                            </h4>

                            <RadioGroup className="mt-2">
                              <RadioGroup.Label className="sr-only">
                                {" "}
                                Choose a color{" "}
                              </RadioGroup.Label>
                              <div className="grid grid-cols-4 gap-4">
                                {product.colors &&
                                  product.colors.map((option: any) => (
                                    <RadioGroup.Option
                                      key={option.id}
                                      value={option.color}
                                      disabled={!option.inStock}
                                      className={({ active }) =>
                                        classNames(
                                          active ? "ring-2 ring-gray-500" : "",
                                          "group bg-gray-200 shadow-sm text-gray-700 cursor-pointer relative border rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium Capitalize hover:bg-gray-100 focus:outline-none sm:flex-1"
                                        )
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <RadioGroup.Label as="span">
                                            {option.color}
                                          </RadioGroup.Label>
                                          <span
                                            className={classNames(
                                              active ? "border" : "border-2",
                                              checked
                                                ? "border-vb"
                                                : "border-transparent",
                                              "pointer-events-none absolute -inset-px rounded-md"
                                            )}
                                            aria-hidden="true"
                                          />
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  ))}
                              </div>
                            </RadioGroup>
                          </div>
                        )}

                        {product.sizes && product.sizes.length > 0 && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">
                                Taille
                              </h4>
                            </div>

                            <RadioGroup className="mt-2">
                              <RadioGroup.Label className="sr-only">
                                {" "}
                                Choose a size{" "}
                              </RadioGroup.Label>
                              <div className="grid grid-cols-4 gap-4">
                                {product.sizes &&
                                  product.sizes.length > 0 &&
                                  product.sizes.map((size: any) => (
                                    <RadioGroup.Option
                                      key={size.id}
                                      value={size.size}
                                      disabled={!size.inStock}
                                      className={({ active }) =>
                                        classNames(
                                          active ? "ring-2 ring-vb" : "",
                                          "group bg-gray-200 shadow-sm text-gray-700 cursor-pointer relative border rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-100 focus:outline-none sm:flex-1"
                                        )
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <RadioGroup.Label as="span">
                                            {size.size}
                                          </RadioGroup.Label>
                                          <span
                                            className={classNames(
                                              active ? "border" : "border-2",
                                              checked
                                                ? "border-vb"
                                                : "border-transparent",
                                              "pointer-events-none absolute -inset-px rounded-md"
                                            )}
                                            aria-hidden="true"
                                          />
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  ))}
                              </div>
                            </RadioGroup>
                          </div>
                        )}
                        {store.is_ecommerce && (
                          <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-3 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                          >
                            Add to bag
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
