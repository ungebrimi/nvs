import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

const faqs = [
  {
    question: "Qu’est-ce que Virtualia Shop ?",
    answer:
      "Virtualia Shop permet dans un premier temps de faire une visite virtuelle et interactive de boutiques dans le but de promouvoir les commerces de proximité afin d'acheter local! Nous proposons également la possibilité de faire du shopping virtuel pour certaines boutiques intéressées. Les boutiques proposent d'ici peu du click and collect, du pay and collect, de la livraison à domicile avec Mondial Relay et une livraison le soir même.",
  },
  {
    question: "Pourquoi Virtualia Shop?",
    answer:
      "Nous avons créé Virtualia Shop pour notifier les utilisateurs des nouveaux arrivages dans les boutiques proches de chez eux, de donner envie d'aller voir sur place en cassant la peur de rentrer dans une boutique, de découvrir des boutiques jusqu'alors inconnues et dans le but social d'aider les commerces de proximité à exister en achetant chez eux plutôt que chez les géants de l'e-commerce.",
  },
  {
    question: "Quels sont les concepts de Virtualia Shop ?",
    answer:
      "C'est un outil de visite virtuelle centrée autour d'une carte (et qui évoluera vers une navigation de type Google Street/Google Earth 3D dans une version future). Après les boutiques, l'utilisateur pourra visiter virtuellement des restaurants pour réserver une tabke, ou commander un repas après prévisualisation en réalité augmentée, de payer pour une chambre d'hôtel après une visite virtuelle, de découvrir aussi des espaces d'art et culture sur la carte tels que les musées, de projeter chez soi des œuvres d'art ou d'aller au cinéma virtuellement pour louer en streaming un film dans un espace 3D. Nous offrons aussi la possibilité aux boutiques d'évoluer vers une plateforme d'e-commerce 3.0 pour du shopping immersif avec click&collect ou livraison le même jour pour les habitants locaux. Virtualia Shop cohabitera avec une technosphère d'applications 3DVRAR au service de l'économie locale, tel que l'utilisation de la réalité augmentée pour voir des informations supplémentaires sur les produits, ou pour prévisualiser chez soi le produit, être notifié d'arrivages, de recevoir des promos, de découvrir des guides touristiques et des expériences locales. La plateforme évoluera enfin vers un monde hybride entre boutiques réelles virtualisées et boutiques totalement virtuelles mais existantes ailleurs (pour pouvoir vendre à Lyon tout en ayant une seule boutique à Toulouse) ou mettant en avant un artisan qui n'aurait pas eu les finances pour avoir son propre local. Il y aura cependant des limites pour ne pas concurrencer des boutiques locales ailleurs avec les même produits! Notre philosophie est d'utiliser la technologie pour le bien commun du plus grand nombre de boutiques.",
  },
  {
    question: "Qu’elle est l’ambition de Virtualia Shop ?",
    answer:
      "Virtualia Shop est l'ouverte d'un monde hybride (réel/virtuel) offrant une opportunité de digitalisation massive des acteurs de l'économie réelle en commençant par les commerces de proximité. Virtualia Shop fait partie intégrante d'un écosystème encore plus grand (voir le projet Virtualia sur https://virtualia.ai). C'est une transformation de l'acte de consommation avec un lien renforcé avec les produits du terroir, le gérant, les hommes et femmes du coin qui font le tissu économique réel. Nous croyons que nous pouvons permettre les commerces de détail locaux de lutter à armes égales contre la standardisation des marchandises, l'uniformisation de la créativité en permettant aux artisans d'être visible, grâce à la technologie immersive 3D, et dze livrer à moindre frais via l'automatisation de processus et l'intelligence collective.",
  },
  {
    question: "Pourquoi rejoindre l’aventure Virtualia Shop?",
    answer:
      "Faîtes partis de la révolution de l'ecommerce 3.0 avec une intégration complète de l'économie réelle dans le monde virtualisé de VIRTUALIA – une duplication du monde réel où vous pouvez trouver sur Virtualia.shop des boutiques, hôtels, restaurants, bars, discothèques, écoles, des biens à vendre, et sur nos applications partenaires, des musées, galeries d'art, théâtres, cinémas en ligne, le tout ouvert 24h sur 24h n'importe où vous soyez dans le monde. Partez faire du shopping à New-York, Paris ou Tokyo et faîtes-vous livrer en quelques clics.",
  },
  {
    question: "À quoi sert Virtualia Shop ?",
    answer:
      "Les petites boutiques apparaissent et disparaissent avec un temps de vie de plus en plus court au profit de grands groupes, chaînes ou des géants de l’ecommerce, créant une uniformité des produits ou de provenance dans toutes les villes. Face à la visibilité internationale des grands groupes et sites ecommerces, les boutiques ne font pas le poids même quand il s’agit de part de marché local! Il y a aussi un manque de digitalisation des acteurs. La plupart des commerces locaux n’ont pas de site web, de gestion d’inventaire ou de services de livraison à domicile efficace, sans compter un marketing web obsolète, ne misant que sur les visites physiques sur place. Cette problématique est répondue en partie parfois par de belles initiatives locales (e.g. Letzshop au Luxembourg, DansMaZone en Occitanie) ou privée (bootic) mais restent peu dynamique, chères à entretenir et requièrent beaucoup trop de travail pour les commerçants. Nous intégrons les boutiques en quelques heures et notre maintenance se fait en quelques minutes par semaine … Nous leur offrons un site internet vitrine, un site e-commerce, une visite virtuelle, des espaces 3D pour de la pub, du SEO boosté, du traffic supplémentaire pour leur boutique physique, une communauté, une relation proche avec ses clients et un jour prochain, une livraison le jour-même et un écosystème d’applications complémentaires.",
  },
  {
    question: "En quoi cela a de virtuel?",
    answer:
      "Nous utilisons la réalité virtuelle pour le côté ludique de l'exploration d'une boutique, et la réalité augmentée quand nous présentons un produit de nos clients. Vous pouvez ainsi prévisualiser le produit chez vous en le projetant devant vous avec votre smartphone. Vous pouvez aussi voir le produit sous tous ces angles sans avoir besoin d'ouvrir l'emballage. C'est plus intéractif que de simples images.",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function About() {
  useEffect(() => {
    document.title = "Virtualia Shop | À propos";
  }, []);

  return (
    <div className="min-h-screen bg-warm-gray">
      <div className="relative overflow-hidden bg-warm-gray">
        <div
          className="hidden lg:absolute lg:inset-0 lg:block"
          aria-hidden="true"
        >
          {" "}
          <svg
            className="absolute top-0 left-1/2 translate-x-64 -translate-y-6 transform"
            width={640}
            height={784}
            fill="none"
            viewBox="0 0 640 784"
          >
            <defs>
              <pattern
                id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
                x={118}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-vod opacity-50"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              y={72}
              width={640}
              height={640}
              className="text-vod opacity-10"
              fill="currentColor"
            />
            <rect
              x={118}
              width={404}
              height={784}
              fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
            />
          </svg>
        </div>
        <div className="mx-auto relative z-10 mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <h1>
                <span className="mt-1 gap-4 flex sm:justify-center lg:justify-start text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                  <span className="block text-vol">À </span>
                  <span className="block text-gray-900">propos</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Virtualia Shop est un réseau 3D immersif de boutiques afin de
                faire vivre le commerce de proximité en achetant près de chez
                soi.
              </p>
              <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
                <Link href="/inscrivez-vous">
                  <button className="mt-3 w-full rounded-md border border-transparent bg-vod px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-vb focus:ring-offset-2 sm:mt-0 sm:inline-flex sm:w-auto sm:flex-shrink-0 sm:items-center">
                    Je m{`'`}inscris
                  </button>
                </Link>
              </div>
              <div className="mt-8 mb-4 px-1 font-bold text-base">
                <Link href="/mentions-legales">Mentions légales</Link>
              </div>
            </div>
            <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
              <svg
                className="absolute top-0 left-1/2 origin-top -translate-x-1/2 -translate-y-4 scale-75 transform sm:scale-100 lg:hidden"
                width={640}
                height={784}
                fill="none"
                viewBox="0 0 640 784"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                    x={118}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-vod opacity-50"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  y={72}
                  width={640}
                  height={640}
                  className="text-vod opacity-10"
                  fill="currentColor"
                />
                <rect
                  x={118}
                  width={404}
                  height={784}
                  fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
                />
              </svg>
              <div className="relative mx-auto w-full rounded-lg  lg:max-w-xl">
                <iframe
                  src="https://player.vimeo.com/video/756007090"
                  className="w-full h-96 rounded-lg"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-warm-gray">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Questions fréquentes
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                          <span className="font-medium text-gray-900">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base text-gray-500">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
About.layout = "L1"
