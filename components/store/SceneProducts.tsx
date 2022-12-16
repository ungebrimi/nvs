import { useState, useEffect } from "react";
import StoreCard from "./StoreCard";
import { useMatterport } from "../../context/MatterportContext";
import { useRouter } from "next/router";
import Hovered from "./Hovered";
import Popup from "../home/Popup";

const SceneProducts = ({ products, store }: any) => {
  const [displayAdd, setDisplayAdd] = useState<boolean>(true);
  const [hoveredProduct, setHoveredProduct] = useState<string>("");
  const [clickedProduct, setClickedProduct] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { mpSdk } = useMatterport();
  const router = useRouter();
  // // sets the click event
  useEffect(() => {
    if (Object.keys(mpSdk).length !== 0) {
      mpSdk.on(mpSdk.Mattertag.Event.HOVER, function(tagSid: string) {
        if (tagSid && store.hide_mattertags === true) {
          setHoveredProduct(tagSid);
          setDisplayAdd(false);
        } else {
          setHoveredProduct("");
        }
      });

      mpSdk.on(mpSdk.Mattertag.Event.CLICK, function(tagSid: string) {
        if (tagSid) {
          setOpen(true);
          setClickedProduct(tagSid);
        } else {
          setClickedProduct("");
        }
      });
    }
  }, [mpSdk, store.hide_mattertags]);

  return (
    <>
      {open ? (
        <>
          {products.map((product: any, idx: number) => {
            if (product.tag_sid === clickedProduct) {
              return (<Popup
                open={open}
                setOpen={setOpen}
                product={product}
                key={idx}
              />
              )
            }
          })}
        </>
      ) : null}
      <>
        {displayAdd ? null : (
          <>
            {products.map((product: any, idx: number) => {
              if (product.tag_sid === hoveredProduct) {
                return <Hovered product={product} index={idx} key={idx} />;
              }
            })}
          </>
        )}
        <StoreCard state={displayAdd} store={store} />
      </>
    </>
  );
};

export default SceneProducts;
