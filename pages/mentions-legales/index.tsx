import { useEffect } from "react";
import Link from "next/link";

export default function LegalMentions() {
  useEffect(() => {
    document.title = "Mentions légales";
  }, []);

  return (
    <div className="relative overflow-hidden bg-warm-gray min-h-[91.4vh] py-28">
      <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
        <div
          className="relative mx-auto h-full max-w-prose text-lg"
          aria-hidden="true"
        >
          <svg
            className="absolute top-12 left-full translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
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
                  className="text-vod opacity-10"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
          <svg
            className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
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
                  className="text-vod opacity-10"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute bottom-12 left-full translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
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
                  className="text-vod opacity-10"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
            />
          </svg>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-gray-500">
          <h1>
            <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              MENTIONS LÉGALES
            </span>
          </h1>
          <p className="mt-8">
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
            pour la confiance en l{`'`}économie numérique, il est précisé aux
            utilisateurs du site Virtualia Shop l{`'`}identité des différents
            intervenants dans le cadre de sa réalisation et de son suivi.
          </p>
        </div>
        <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
          <h2 className="text-2xl mt-4">Edition du site</h2>
          <p>
            Le présent site, accessible à l’URL{" "}
            <strong>https://virtualia.shop </strong>(le « Site »), est édité par
            :
          </p>
          <ul role="list">
            <li>
              <strong className="mr-0">
                Virtualia Interactive Technologies
              </strong>
              , société au capital de{" "}
              <strong className="mr-0">43000 euros</strong>, inscrite au R.C.S.
              de <strong className="mr-2">Paris</strong>
              sous le numéro <strong className="mr-2">918615717</strong>, dont
              le siège social est situé au 231 rue Saint-Honoré Paris 1er,
              représenté par{" "}
              <strong className="mr-0">Nobre Kévin, président</strong> dûment
              habilité.
            </li>
            <li className="mt-2">
              Le numéro individuel TVA de l’exploitant est: FR48918615717.
            </li>
          </ul>
          <h2 className="text-2xl mt-4">Hébergement</h2>
          <p>
            Le Site est hébergé par la société{" "}
            <strong className="mr-0">Vercel Inc</strong>, située au 40 S Lemon
            Ave Suite 4133 Walnut, CA 91789, Etats-Unis, (téléphone : (951)
            383-6898).
          </p>
          <h2 className="text-2xl mt-4">Directeur de publication</h2>
          <p>
            Le Directeur de la publication du Site est{" "}
            <strong className="mr-2">Nobre Kévin</strong>.
          </p>
          <h2 className="text-2xl mt-4">Nous contacter</h2>
          <ul role="list">
            <li className="mt-2">
              Par email : <strong className="mr-2">dmo@virtualia.shop</strong>
            </li>
            <li className="mt-2">
              Par courrier :{" "}
              <strong className="mr-2">
                Virtualia Interactive Technologies 231, rue Saint-Honoré, 75001
                Paris, France.
              </strong>
            </li>
          </ul>
          <h2 className="text-2xl mt-4">Données personnelles</h2>
          <p>
            Le traitement de vos données à caractère personnel est régi par
            notre{" "}
            <strong className="text-vod mr-2">
              <Link href="/politique-de-confidentialite">
                Charte du respect de la vie privée
              </Link>
            </strong>
            conformément au Règlement Général sur la Protection des Données
            2016/679 du 27 avril 2016 (« RGPD »)
          </p>
        </div>
      </div>
    </div>
  );
}
LegalMentions.layout = "L1"
