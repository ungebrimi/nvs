import React, { useState, useEffect, useRef } from 'react'
import { getStore, getStoreProductfilters } from "../../../utils/store"
import { getStorePaths } from '../../../utils/paths'
import { initialize } from "../../../utils/products"
import { getStoreLikes, getStoreFollowers } from '../../../utils/like'
import Head from 'next/head'
import { GiSoundOn, GiSoundOff } from "react-icons/gi"
import { useMatterport } from '../../../context/MatterportContext'
import SceneProducts from "../../../components/store/SceneProducts"
import ProductList from '../../../components/store/ProductList'
import { useStore } from '../../../context/StoreContext'
import Chevron from '../../../components/store/Chevron'

export async function getStaticPaths() {
  const storePaths = await getStorePaths()
  return {
    paths: storePaths,
    fallback: true,
  }
}

export async function getStaticProps({ params }: any) {
  const store: any = await getStore(params.slug, params.city)
  if (store) {
    const products = await initialize(store[0].store_id)
    const productfilters = await getStoreProductfilters(store[0].store_id)
    store[0].likes = await getStoreLikes(store[0].store_id)
    store[0].followers = await getStoreFollowers(store[0].store_id)
    return {
      props: {
        store: store[0],
        filters: productfilters,
        products: products,
      },
      // give this a value when stores are more active
      // revalidate: 60,
    }
  }
}


const Store = ({ store, products, filters }: any) => {
  const { setStore } = useStore()
  if (store) {
    setStore(store)
  }

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const { setMpSdk, mpSdk, tags, hideTags, changeTagColor, preventTagAction } =
    useMatterport();
  const iframeRef = useRef<any>(null)
  const audioRef = useRef<any>(null)

  useEffect(() => {
    if (store) {
      const load = async () => {
        try {
          const mpsdk = await window.MP_SDK.connect(
            iframeRef.current, // obtained earlier
            process.env.MATTERPORT_SDK, // your sdk key
            "" // unused but needs to be a valid string
          );
          setMpSdk(mpsdk);
        } catch (e) {
          console.error(e);
        }
      };

      if (iframeRef.current) {
        load();
      }
    }
  }, [store, setMpSdk]);

  useEffect(() => {
    if (tags.length) {
      changeTagColor(0.266, 0.435, 0.443);
    }
  }, [tags, changeTagColor]);

  useEffect(() => {
    if (store && store.hide_mattertags === true) {
      if (tags.length && mpSdk) {
        //@ts-ignore
        preventTagAction(tags);
        hideTags(products && products.map((product: any) => product.tag_sid));
      }
    }
  }, [tags, preventTagAction, hideTags, mpSdk, store, products]);

  if (!store) return <div>Loading...</div>
  return (
    <main className="xl:px-4 h-full xl:py-4">
      <Head>
        <meta charSet="utf-8" />
        <title>{`Virtualia shop | ${store?.title}`}</title>
        <meta name="description" content={store?.description} />
        <meta
          name="title"
          content={`Virtualia shop | ${store?.title} - ${store?.city}`}
        />
        <meta name="keywords" content={store?.keywords_seo} />
      </Head>
      <div className="relative min-h-[85.1vh]  max-w-[101rem] m-auto">
        <section className="w-full xl:py-14 grid grid-cols-4 gap-4">
          <aside className="hidden xl:block xl:col-span-1">
            <SceneProducts products={products} store={store} />
          </aside>
          <div className="col-span-4 relative xl:col-span-3 h-screen xl:h-[42rem]">
            <iframe
              ref={iframeRef}
              id="showcase"
              src={`/bundle/showcase.html?m=${store?.matterport_id
                }&play=1&qs=1&log=0&brand=0&help=0&vr=0&search=0&fp=0&dh=0&mls=1&applicationKey=${process.env.MATTERPORT_KEY
                }`}
              width="100%"
              height="100%"
              className="xl:rounded-xl shadow-xl"
              allow="xr-spatial-tracking"
              allowFullScreen
            ></iframe>
            <Chevron store={store} />
            {store.music_url && (
              <button className="absolute top-36 sm:top-4 right-4 z-10">
                <>
                  {isPlaying ? (
                    <GiSoundOff
                      className="text-3xl text-gray-200"
                      onClick={() => setIsPlaying(false)}
                    />
                  ) : (
                    <GiSoundOn
                      className="text-3xl text-gray-200"
                      onClick={() => setIsPlaying(true)}
                    />
                  )}
                </>
                <audio ref={audioRef}>
                  <source src={store.music_url} type="audio/mpeg" />
                </audio>
              </button>
            )}
          </div>
        </section>
        {store.is_simple_virtual_visit ? null : (
          <section id="products">
            <ProductList p={products} f={filters} store={store} />
          </section>
        )}
      </div>
    </main>
  )
}
Store.layout = "L2"
export default Store
