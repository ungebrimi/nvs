import { useState } from "react";
import { signUp, signInWithLinkedIn, signInWithGoogle } from "../../utils/auth";
import Link from "next/link";
//import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useAuthProvider } from "../../context/AuthContext";
import { BsGoogle, BsLinkedin } from "react-icons/bs";

export default function Signup() {
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false); //const [captchaToken, setCaptchaToken] = useState();
  const [error, setError] = useState<boolean>(false);
  //const captcha = useRef<any>();
  const { setUser } = useAuthProvider();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: any = Object.fromEntries(data.entries());
    if (values.password !== values.password_confirmation) {
      setValidationMessage(
        "Les mots de passe ne correspondent pas, veuillez réessayer."
      );
      setIsPasswordValid(false);
      return;
    } else {
      setIsPasswordValid(true);
      setValidationMessage("Succès");
    }
    if (!acceptTerms) {
      setValidationMessage(
        "Vous devez accepter les conditions d'utilisation pour vous inscrire."
      );
      return;
    } else {
      try {
        await signUp(values).then((res: any) => {
          if (res.user) {
            setSuccess(true);
            setUser(res.user);
          }
        });
      } catch (err: any) {
        setErrorMessage(err.message);
        setError(true);
      } finally {
        setTimeout(() => {
        }, 5000);
      }
    }
  };

  return (
    <main className="min-h-[91.5vh]">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-16 w-auto"
            src="/logo/Logo Virtualia Shop FR mobile.png"
            alt="Your Company"
          />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <h3 className="text-xl text-gray-700">
                Créez votre compte utilisateur dans Virtualia Shop
              </h3>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Adresse e-mail
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-vb focus:outline-none focus:ring-vb sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Le mot de passe (8 caractères minimum)
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-vb focus:outline-none focus:ring-vb sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Répéter le mot de passe
                </label>
                <div className="mt-1">
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-vb focus:outline-none focus:ring-vb sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Ou continuez avec</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div>
                    <button
                      type="button"
                      onClick={() => signInWithGoogle()}
                      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Google</span>
                      <BsGoogle className="text-xl" />
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => signInWithLinkedIn()}
                      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Linkedin</span>
                      <BsLinkedin className="text-xl" />
                    </button>
                  </div>
                </div>

              </div>
              {/*
              <HCaptcha
                ref={captcha}
                sitekey={import.meta.env.VITE_HCAPTCHA_TOKEN}
                onVerify={(token: any) => {
                  setCaptchaToken(token);
                }}
              />*/}
              <div className="flex items-center">
                <input
                  id=""
                  name=""
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-vb focus:ring-vb"
                />
                <label
                  htmlFor="accept-terms"
                  className="ml-3 pr-6 text-sm font-medium text-gray-900"
                >
                  <Link href="/cgu" className="text-vb underline">
                    J{`'`}accepte les conditions générales d{`'`}utilisation
                  </Link>
                </label>
              </div>
              <span
                className={`${isPasswordValid && acceptTerms === true
                  ? "text-green-500"
                  : "text-red-500"
                  } text-sm`}
              >
                {validationMessage}
              </span>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-vb py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-vb focus:outline-none focus:ring-2 focus:ring-vb focus:ring-offset-2"
                >
                  S{`'`}identifier
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Vous avez déjà un compte?
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="col-span-3">
                  <Link
                    href="/connexion"
                    className="inline-flex col-span-3 w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Aller à la connexion</span>
                    Aller à la connexion
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*redirectBackToClaimPoints && success ? (
        <Navigate href={slug} replace={true} />
      ) : null}
      {!redirectBackToClaimPoints && success ? (
        <Navigate href="/" replace={true} />
      ) : null */}
      <>
        {error ? (
          <div className="rounded-md max-w-3xl bg-red-100 mx-auto px-4 py-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Nous avons rencontré une erreur.
                </h3>
                <div className="mt-2 text-sm text-gray-900">
                  <p>{errorMessage}</p>
                  <p>
                    si le problème persiste, contactez l{`$apos;`}équipe Virtualia Shop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {success ? (
          <div className="rounded-md max-w-3xl bg-green-100 mx-auto px-4 py-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Vous serez redirigé vers notre page de bienvenue dans 5 secondes, veuillez valider votre compte en allant dans votre boîte email puis vous connecter
                </h3>
              </div>
            </div>
          </div>
        ) : null}
      </>
    </main>
  );
}

Signup.layout = "L1"
