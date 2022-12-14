import { useEffect, useRef } from "react";
import Image from "next/image";
import { useStore } from "../../context/StoreContext"
import Link from "next/link";
import gsap from "gsap";

export const BoutiqueCard = ({ store }: any) => {
  const { setStore } = useStore()
  const ref = useRef<any>(null);
  useEffect(() => {
    ref.current?.addEventListener("mouseenter", () => {
      gsap.to(ref.current, {
        opacity: 1,
        y: -50,
        duration: 0.5,
        stagger: 0.1,
      });
    });
    ref.current?.addEventListener("mouseleave", () => {
      gsap.to(ref.current, {
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      });
    });
  }, [ref]);

  return (
    <article key={store.store_id} className="group relative z-10">
      <div className="aspect-w-2 aspect-h-1 w-full overflow-hidden rounded-2xl sm:aspect-w-2 sm:aspect-h-2">
        <div className="absolute h-full w-full bg-vod flex flex-col justify-end items-center">
          <h3 className="w-full text-xl uppercase text-center font-bold text-white">
            {store.title}
          </h3>
          <span className="text-white">
            {/*typesOfStore
                ? typesOfStore[`${store.marker_id < 44 ? store.marker_id : 43}`]
                  .name
                : null*/}
          </span>
        </div>
      </div>
      <Link
        href={`/${store.city}/${store.slug}`}
        onClick={() => setStore(store)}
      >
        <div
          ref={ref}
          className="absolute z-1 rounded-2xl inset-0 shadow-2xl"
        >
          <div className="relative h-full w-full">
            <Image
              width={400}
              height={500}
              src={store.shop_image}
              alt={store.title}
              className="h-full w-full rounded-2xl object-cover object-center"
            />
          </div>
        </div>
      </Link>
    </article>
  );
};
export default BoutiqueCard;
