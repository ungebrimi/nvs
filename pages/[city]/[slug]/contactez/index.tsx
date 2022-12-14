import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { getStore } from "../../../../utils/store";
import { getStorePaths } from "../../../../utils/paths"
import OpeningHours from "../../../../components/store/OpeningHours";
import { useStore } from "../../../../context/StoreContext"
import emailjs from "@emailjs/browser"
import { useRef, useState } from "react";

export async function getStaticPaths() {
  const storePaths = await getStorePaths()
  return {
    paths: storePaths,
    fallback: true
  }
}

export async function getStaticProps({ params }: any) {
  const store: any = await getStore(params.slug, params.city)
  if (store) {
    return {
      props: {
        store: store[0],
      },
      revalidate: 1,
    }
  }
}


export default function Contactez({ store }: any) {
  const { setStore } = useStore()
  if (store) {
    setStore(store)
  }
  const [didSend, setDidSend] = useState<boolean>(false)
  const form = useRef<any>()

  function sendEmail(e: any) {
    e.preventDefault();
    // these IDs from the previous steps
    emailjs.sendForm('service_opj5yh7', 'template_9brzo9w', form.current, 'Zrsu5XoQuJGAxGnN1')
      .then((result: any) => {
        console.log(result.text);
        setDidSend(true)
      }, (error: any) => {
        console.log('FAILED...', error);
      });
  }

  if (!store) return <div>Loading...</div>
  return (
    <main className="overflow-hidden min-h-[90.3vh]">
      <div className="bg-warm-gray-50">
        <div className="py-24 lg:py-32">
          <div className="relative z-10 mx-auto max-w-7xl pl-4 pr-8 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-warm-gray-900 sm:text-5xl lg:text-6xl">
              Entrer en contact
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-warm-gray-500">
              Pour toute demande, merci de nous envoyer un message via le
              formulaire de contact.
            </p>
          </div>
        </div>
      </div>
      <section
        className="relative bg-white pb-28"
        aria-labelledby="contact-heading"
      >
        <div
          className="absolute h-1/2 w-full bg-warm-gray-50"
          aria-hidden="true"
        ></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <svg
            className="absolute top-0 right-0 z-0 -translate-y-16 translate-x-1/2 transform sm:translate-x-1/4 md:-translate-y-24 lg:-translate-y-72"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-warm-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="384"
              fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
            />
          </svg>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white shadow-xl">
            <h2 id="contact-heading" className="sr-only">
              Entrer en contact
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="relative overflow-hidden bg-gradient-to-b from-accent to-accent py-10 px-6 sm:px-10 xl:p-12">
                <div
                  className="pointer-events-none absolute inset-0 sm:hidden"
                  aria-hidden="true"
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    width="343"
                    height="388"
                    viewBox="0 0 343 388"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                      fill="url(#linear1)"
                      fillOpacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear1"
                        x1="254.553"
                        y1="107.554"
                        x2="961.66"
                        y2="814.66"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#fff"></stop>
                        <stop
                          offset="1"
                          stopColor="#fff"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden"
                  aria-hidden="true"
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    width="359"
                    height="339"
                    viewBox="0 0 359 339"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                      fill="url(#linear2)"
                      fillOpacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear2"
                        x1="192.553"
                        y1="28.553"
                        x2="899.66"
                        y2="735.66"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#fff"></stop>
                        <stop
                          offset="1"
                          stopColor="#fff"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block"
                  aria-hidden="true"
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    width="160"
                    height="678"
                    viewBox="0 0 160 678"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                      fill="url(#linear3)"
                      fillOpacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear3"
                        x1="192.553"
                        y1="325.553"
                        x2="899.66"
                        y2="1032.66"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#fff"></stop>
                        <stop
                          offset="1"
                          stopColor="#fff"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">
                  Informations de contact
                </h3>
                <dl className="mt-8 space-y-6">
                  <dt>
                    <span className="sr-only">Numéro de téléphone</span>
                  </dt>

                  {store.phone ? (
                    <dd className="flex text-white">

                      <svg
                        className="h-6 w-6 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                      <a
                        href={`tel:${store.phone_prefix}${store.phone}`}
                        className="ml-3"
                      >
                        (+{store.phone_prefix}) {store.phone}
                      </a>
                    </dd>

                  ) : null}
                  {store.email ? (
                    <>
                      <dt>
                        <span className="sr-only">Email</span>
                      </dt>
                      <dd className="flex text-white">
                        <svg
                          className="h-6 w-6 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>
                        <span className="ml-3">{store.email}</span>
                      </dd>
                    </>
                  ) : null}
                  <div className="flex flex-wrap items-center">
                    {store.website && (
                      <a
                        className="block mt-4 text-sm underline text-gray-100"
                        href={store.website}
                      >
                        <GlobeAltIcon className="inline-block w-6 h-6 mr-2" />
                      </a>
                    )}
                    {store.instagram && (
                      <a
                        className="block mt-4 text-sm underline text-gray-100"
                        href={store.instagram}
                      >
                        <AiFillInstagram className="inline-block w-6 h-6 mr-2" />
                      </a>
                    )}
                    {store.tiktok && (
                      <a
                        className="block mt-4 text-sm underline text-gray-100"
                        href={store.tiktok}
                      >
                        <FaTiktok className="inline-block w-6 h-6 mr-2" />
                      </a>
                    )}
                    {store.facebook && (
                      <a
                        href={store.facebook}
                        className="block mt-4 text-sm underline text-gray-100"
                      >
                        <AiFillFacebook className="inline-block w-6 h-6 mr-2" />
                      </a>
                    )}
                  </div>
                </dl>
                <h3 className="text-lg mt-8 font-medium text-white">
                  Horaires d{`'`}ouverture
                </h3>
                <OpeningHours store={store} />
              </div>
              <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                <h3 className="text-lg font-medium text-warm-gray-900">
                  Contactez-nous
                </h3>
                <form
                  action="#"
                  ref={form}
                  method="POST"
                  className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                >
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-warm-gray-900"
                    >
                      Prénom
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-accent focus:ring-accent"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-warm-gray-900"
                    >
                      Nom de famille
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-accent focus:ring-accent"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-warm-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-accent focus:ring-accent"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-warm-gray-900"
                      >
                        Numéro de téléphone
                      </label>
                      <span
                        id="phone-optional"
                        className="text-sm text-warm-gray-500"
                      >
                        Optionnel
                      </span>
                    </div>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-accent focus:ring-accent"
                        aria-describedby="phone-optional"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-warm-gray-900"
                    >
                      Sujet du message
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-accent focus:ring-accent"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-warm-gray-900"
                      >
                        Message
                      </label>
                      <span
                        id="message-max"
                        className="text-sm text-warm-gray-500"
                      >
                        Max. 500 caractères
                      </span>
                    </div>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-accent focus:ring-accent"
                        aria-describedby="message-max"
                      ></textarea>
                    </div>
                  </div>
                  <div className="sm:col-span-2 sm:flex sm:justify-end">
                    <button
                      type="submit"
                      className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-accent px-6 py-3 font-medium text-white shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 sm:w-auto"
                    >
                      Envoyer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

Contactez.layout = "L2"
