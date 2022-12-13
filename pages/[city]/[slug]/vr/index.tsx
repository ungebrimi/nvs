import React, { useRef } from "react";
import { getStore } from "../../../../utils/store";
import { useStore } from "../../../../context/StoreContext";

export const getServerSideProps = async (context: any) => {
  const { city, slug } = context.query;
  const store: any = await getStore(slug, city)

  return {
    props: {
      store: store[0],
    },
  }
}

const VrScene = ({ store }: any) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { setStore } = useStore()
  setStore(store)

  return (
    <main className="xl:px-4 h-full xl:py-4">
      <div className="relative min-h-[88.1vh]  max-w-[101rem] m-auto">
        <section className="w-full xl:py-8 grid grid-cols-4 gap-4">
          <div className="col-span-4 relative h-screen xl:h-[50rem]">
            <iframe
              ref={iframeRef}
              id="showcase"
              src={`https://my.matterport.com/show/?m=${store?.matterport_url_vr}`}
              width="100%"
              height="100%"
              className="xl:rounded-xl shadow-xl"
              allow="xr-spatial-tracking"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </div>
    </main>
  );
};
VrScene.layout = "L2"
export default VrScene;
