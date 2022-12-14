import { signInWithPassword, signInWithGoogle, signInWithLinkedIn } from "../../utils/auth";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BsGoogle, BsLinkedin } from "react-icons/bs";

//@ts-ignore
import isEmail from "validator/lib/isEmail";
import Link from "next/link";
//import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useAuthProvider } from "../../context/AuthContext";
import Router from "next/router";

export default function Login() {
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const {
    setIsAuth,
    setUser,
    setSession,
    user,
  } = useAuthProvider();
  //const [captchaToken, setCaptchaToken] = useState();
  //const captcha = useRef<any>();

  useEffect(() => {
    document.title = "Connexion";
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: any = Object.fromEntries(data.entries());
    if (!isEmail(values.email)) {
      setError("S'il vous plaît, mettez une adresse email valide");
      return;
    }
    console.log(user)

    try {
      await signInWithPassword(values).then((res: any) => {
        if (res.user) {
          setMessage("Vous êtes connecté");
          setSession(res.session);
          setUser(res.user);
          setIsAuth(true);

          setTimeout(() => {
            Router.push("/");
          }, 1000)
        }
      });
    } catch (error: any) {
      setError(error.message)
    }
  };

  return (
    <main className="min-h-[91.5vh]">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto h-16 w-auto"
            src="/logo/Logo Virtualia Shop FR mobile.png"
            width={200}
            height={200}
            alt="Virtualia shop"
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
                  Mot de passe
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
                <span className="text-red-500 text-sm">{error.toString()}</span>
                <span className="text-green-500 text-sm">{message}</span>
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
              <div className="flex items-center justify-start">
                <div className="text-sm">
                  <Link
                    href="/mot-de-passe"
                    className="font-medium text-vb hover:text-vb"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>
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
                    Je n{`'`}ai pas de compte?
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="col-span-3">
                  <Link
                    href="/inscrivez-vous"
                    className="inline-flex col-span-3 w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Créer un compte</span>
                    Créer un compte
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 text-center"></p>}
      </div>
    </main>
  );
}
Login.layout = "L1"
      //
      // {user && !redirectBackToClaimPoints ? (
      //   <Navigate to="/" replace={true} />
      // ) : null}
      // {user && redirectBackToClaimPoints ? (
      //   <Navigate to={slug} replace={true} />
      // ) : null}
