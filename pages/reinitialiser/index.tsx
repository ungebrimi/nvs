import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Image from "next/image";

export default function UpdatePassword() {
  const [event, setEvent] = useState<any>(null)
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      setEvent(event)
    });
  }, [])

  useEffect(() => {
    document.title = "Virtualia shop | Créez votre compte";
  }, []);

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
      <div className="flex min-h-[91vh] bg-warm-gray items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              width={300}
              height={200}
              className="mx-auto h-12 w-auto"
              src="/logo/logo-o.png"
              alt="Virtualia shop"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Saisissez un nouveau mot de passe
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Nous espérons que vous prendrez le temps de saisir un mot de passe
              fort. Un bon mot de passe contient des lettres, des symboles et
              des chiffres inférieurs et majuscules.
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
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
            {message && <p className="text-red-500 text-sm">{message}</p>}
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
UpdatePassword.layout = "L1"
