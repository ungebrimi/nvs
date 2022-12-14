import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
//import HCaptcha from "@hcaptcha/react-hcaptcha";
import Image from "next/image";

export default function ForgottenPassword() {
  const [event, setEvent] = useState<any>(null)
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      setEvent(event)
    });
  }, [])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const values: any = Object.fromEntries(d.entries());
    if (values.password !== values.password_confirmation) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    // check if password is longer than 8 characters
    if (values.password < 8) {
      alert("Le mot de passe doit faire au moins 8 caractères");
      return;
    }
    const { data, error } = await supabase.auth.updateUser({
      password: values.password,
    });
    if (error) setMessage(error.message)
    if (data) {
      setMessage("Sucess")
      setTimeout(() => {
        window.location.href = "/"
      }, 700)
    }
  }

  return (
    <>
      <div className="flex min-h-[91.5vh] bg-warm-gray items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              className="mx-auto h-12 w-auto"
              width={300}
              height={400}
              src="/logo/logo-o.png"
              alt="Virtualia shop"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Mot de passe oublié
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Saisissez votre adresse e-mail pour réinitialiser votre mot de
              passe. Nous vous enverrons ensuite un e-mail avec un lien pour
              réinitialiser votre mot de passe. n{`'`}oubliez pas de vérifier votre
              dossier spam
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <span className="text-green-500 block pb-2 text-sm">
                {message}
              </span>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-vb focus:outline-none focus:ring-vb sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-vod py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Réinitialiser le mot de passe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
ForgottenPassword.layout = "L1"
