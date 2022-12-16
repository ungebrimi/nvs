import { useStore } from "../context/StoreContext";

export default function Banner() {
  const { store } = useStore();

  return (
    <>
      {store ? (
        <div className="relative hidden sm:block bg-vb" >
          <div className="mx-auto max-w-7xl py-2 px-3 sm:px-6 lg:px-8">
            <div className="pr-16 sm:px-16 sm:text-center">
              <p className="text-white">
                Bienvenue chez{" "}
                <span className="capitalize text-accent">{store.title}</span>, un
                magasin 100% immersif à {store.city}
              </p>
            </div>
          </div>
        </div>
      ) : null
      }
    </>
  );
}
