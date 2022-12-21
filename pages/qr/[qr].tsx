import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuthProvider } from '../../context/AuthContext'
import {
  getQrCodes,
  getDynamicQrCodes,
  claimPoints,
  updateUserPoints,
  decrementStaticEditions,
  decrementDynamicEditions,
  getAllUserQrCodes,
} from '../../utils/qr'

export async function getServerSideProps(context: any) {
  const { params } = context
  const { qr } = params
  const qrCodes = await getQrCodes()

  return {
    props: {
      qr,
      qrCodes,
    }, // will be passed to the page component as props
  }
}

const QR = ({ qrCodes, qr }: any) => {
  const [claimedBefore, setClaimedBefore] = useState<boolean>(false)
  const [showClaimButton, setShowClaimButton] = useState<boolean>(true)
  const [successMessage, setSuccesMessage] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [pointsToClaim, setPointsToClaim] = useState<any>()
  const [userClaimedQrCodes, setUserClaimedQrCodes] = useState<any>([])
  const { user, isAuth, setSlug, setRedirectBackToClaimPoints, userData } =
    useAuthProvider();
  const allValidKeys = qrCodes.map((qrCode: any) => qrCode.unique_key)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      getAllUserQrCodes(user.id).then((res) => {
        setUserClaimedQrCodes(res)
      })
    }
  }, [user])

  const handleForgottenLogin = () => {
    setRedirectBackToClaimPoints(true)
    setSlug(router.asPath)
    router.push('/connexion')
  }

  useEffect(() => {
    userClaimedQrCodes.map((code: any) => {
      if (code.unique_key === qr) {
        setClaimedBefore(true)
        setMessage("Vous avez déjà réclamé ce code")
      } else {
        if (allValidKeys.includes(qr)) {
          const code = qrCodes.find((code: any) => code.unique_key === qr);
          setPointsToClaim(code);
          setMessage(
            `Bravo, vous avez scanné un code valide ! Vous pouvez réclamer ${code.points} points.`
          );
          setShowClaimButton(true);
        } else {
          setMessage(
            "Code invalide, cliquez ci-dessous pour retourner à la page d'accueil"
          );
          setShowClaimButton(false);
        }
      }
    })
  }, [allValidKeys, pointsToClaim, userClaimedQrCodes, qrCodes, qr]);

  const handleClaim = async () => {
    let points = userData.points + pointsToClaim.points;
    await claimPoints(
      user.id,
      pointsToClaim.store_id,
      pointsToClaim.points,
      pointsToClaim.unique_key
    );
    await updateUserPoints(user.id, points);
    if (
      (pointsToClaim.action_type === 2 && pointsToClaim.editions > 0) ||
      (pointsToClaim.action_type === 9 && pointsToClaim.editions > 0)
    ) {
      let editions = pointsToClaim.editions;
      editions--;
      // there is a need for store_id here because the unique_key is not unique
      await decrementStaticEditions(pointsToClaim.store_id, editions);
      setSuccesMessage(
        "Les points ont été réclamés, vous allez être redirigé vers la page d'accueil dans 5 secondes"
      );

      setTimeout(() => {
        router.push('/');
      }, 5000);
    } else if (pointsToClaim.action_type === 5 && pointsToClaim.editions > 0) {
      // there is no need for a store_id because the unique_key is unique
      await decrementDynamicEditions(pointsToClaim.unique_key);
      setSuccesMessage(
        "Les points ont été réclamés, vous allez être redirigé vers la page d'accueil dans 5 secondes"
      );

      setTimeout(() => {
        router.push('/');
      }, 5000);
    } else {
      // all other that does not have editions
      setSuccesMessage(
        "Les points ont été réclamés, vous allez être redirigé vers la page d'accueil dans 5 secondes"
      );

      setTimeout(() => {
        router.push('/');
      }, 5000);
    }
  };


  return (
    <>
      <Head>
        <title>QR Code</title>
      </Head>
      <div className="min-h-[91.4vh]  bg-warm-gray px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="md:flex">
            <Image
              width={300}
              height={500}
              src="/logo/logo-ao.png"
              alt=""
              className="object-contain h-48 mx-auto mb-12"
            />
            <div className="sm:ml-6 text-center md:text-left">
              <div className="md:border-l md:border-gray-200 md:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Réclamer des points
                </h1>
                {isAuth ? (
                  <>
                    {claimedBefore ? (
                      <>
                        <p className="mt-1 text-base text-gray-500">
                          {message}
                        </p>
                        <Link
                          href="/"
                          className="inline-flex mt-4 items-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                        >
                          Retour à la page d{`'`}accueil
                        </Link>
                      </>
                    ) : (
                      <>
                        <p className="mt-1 text-base text-gray-500">{message}</p>
                        <p className="mt-1 text-base text-gray-500">{successMessage}</p>
                        <div className="mt-10 flex items-center justify-center md:justify-start space-x-3">
                          {showClaimButton ? (
                            <button
                              onClick={handleClaim}
                              className="inline-flex items-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                            >
                              Réclamer les points
                            </button>
                          ) : (
                            <Link
                              href="/"
                              className="inline-flex items-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                            >
                              Retour à la page d{`'`}accueil
                            </Link>
                          )}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <p className="mt-1 text-base text-gray-500">
                      Vous devez être connecté pour réclamer les points
                    </p>
                    <button
                      onClick={() => handleForgottenLogin()}
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    >
                      <Link href="/connexion">Se connecter</Link>
                    </button>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
QR.layout = "L1"

export default QR

