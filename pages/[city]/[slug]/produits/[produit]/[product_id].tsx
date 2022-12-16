import { useState } from 'react'
import { getProductPaths } from "../../../../../utils/paths"
import { getProduct, addImagesToProduct } from '../../../../../utils/products'
import { getStore } from "../../../../../utils/store"
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import LikeProduct from '../../../../../components/store/LikeProduct'
import { useStore } from "../../../../../context/StoreContext"
import Breadcrumb from '../../../../../components/Breadcrumb'

export async function getStaticPaths() {
  const paths = await getProductPaths()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  // turn params.product_id into a number
  const product_id = Number(params.product_id)
  const store: any = await getStore(params.slug, params.city)
  const product: any = await getProduct(product_id).then(async (res: any) => {
    await addImagesToProduct(res[0])
    return res
  })
  return {
    props: {
      product: product[0],
      store: store[0]
    },
    revalidate: 10,
  }
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Produit = ({ product, store }: any) => {
  const { setStore } = useStore()
  if (store) {
    setStore(store)
  }
  const [selectedColor, setSelectedColor] = useState()
  const [displayModel, setDisplayModel] = useState(false);
  const [displayedImage, setDisplayedImage] = useState<any>({
    type: "image",
    src: product.thumbnail,
  });


  const handleImage = (type: string, src: string) => {
    setDisplayedImage({ type, src });
    setDisplayModel(false);
  };

  let regex = /\/n/g;
  let result = product.description?.replace(regex, "");
  let path = product.name.toLowerCase().replace(/ /g, '-')
  let id = product.product_id.toString()

  let paths;
  if (store && product) {
    paths = [
      {
        href: `/${store.city}/${store.slug}`,
        breadcrumb: `${store.title}`
      },
      {
        href: `/${store.city}/${store.slug}/${path}/${id}`,
        breadcrumb: `Produit - ${product.name}`
      },
    ]
  }

  return (
    <div className="min-h-[85.1vh] max-w-[101rem] overflow-hidden">
      <div className="mx-auto max-w-2xl py-24 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="pb-8">
          <Breadcrumb paths={paths} />
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product.images.map((image: any) => (
                  <Tab
                    key={image}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => {
                      return (
                        <>
                          <span className="sr-only"> {product.name} </span>
                          <span
                            onClick={() => handleImage("image", image)}
                            className="absolute inset-0 overflow-hidden bg-gray-100 rounded-md">
                            <Image width={500} height={700} src={image} alt="" className="h-full w-full object-contain object-center" />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-vb' : 'ring-transparent',
                              'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                            )}
                            aria-hidden="true"
                          />

                        </>
                      )
                    }}
                  </Tab>
                ))}
                {product.iframe ? (
                  <div className="relative hover:shadow-md border-2 bg-gray-100 transition-ease duration-200">
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
                  <div className="relative hover:shadow-md border-2 bg-gray-100 transition-ease duration-200">
                    <div
                      onClick={() =>
                        handleImage("video", product.video)
                      }
                      className="absolute w-full h-full z-10 bg-none"
                    ></div>
                    <video
                      src={product.video}
                      controls
                      className="w-32"
                    />
                  </div>
                ) : null}{" "}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-w-1 bg-gray-100 rounded-lg aspect-h-1 w-full">
              {product.images.map((image: any) => (
                <Tab.Panel key={image.id}>
                  <>
                    {displayedImage.type === "image" ? (
                      <Image
                        width={500}
                        height={800}
                        alt=""
                        src={displayedImage.src}
                        className="h-full w-full object-contain bg-gray-100 object-center sm:rounded-lg"
                      />
                    ) : null}
                    {displayedImage.type === "video" ? (
                      <video
                        src={displayedImage.src}
                        className="h-full w-full object-contain bg-gray-100 object-center sm:rounded-lg"
                        controls
                      />
                    ) : null}
                    {displayedImage.type === "iframe" ? (
                      <iframe
                        src={displayedImage.src}
                        className="h-full w-full object-cover bg-gray-100 object-center sm:rounded-lg"
                      />
                    ) : null}
                  </>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{product.price ? `€${product.price}` : ""}
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <LikeProduct product={product} store={store} />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <p className="mt-2 text-gray-600 whitespace-pre-line">
                {result}
              </p>
            </div>

            <form className="mt-6">
              {/* Colors */}
              <div>
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
              </div>

              <div className="sm:flex-col1 mt-10 flex">
                {store && store.isEcommerce ? (
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-vb py-3 px-8 text-base font-medium text-white hover:bg-vb focus:outline-none focus:ring-2 focus:ring-vb focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Ajouter au panier
                  </button>
                ) : null}
                {/*
                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  <span className="sr-only">Add to favorites</span>
                </button>*/}
              </div>
            </form>
            {product.characteristics && product.characteristics.length > 0 ? (
              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {product.characteristics.map((detail: any) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(open ? 'text-vb' : 'text-gray-900', 'text-sm font-medium')}
                              >
                                {detail.title}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-vb group-hover:text-vb"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                            <p>{detail.value}</p>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            ) : null}

          </div>
        </div>
      </div>
    </div>
  )
}
Produit.layout = "L2"
export default Produit
