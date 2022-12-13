import { useState, useEffect } from "react";
import Image from "next/image";

interface HoveredProps {
  index: number;
  product: any;
}

const Hovered = ({ index, product }: HoveredProps) => {
  const [cost, setCost] = useState<number>(0);

  // // useEffect that takes product.price removes last character and turns rest into a number
  useEffect(() => {
    if (product.price) {
      setCost(parseInt(product.price));
    }
  }, [product.price]);

  let regex = /\/n/g;
  let result = product.description?.replace(regex, "");

  // only show a certain amount of characters on product.description and add ... at the end
  let description = result?.slice(0, 300);
  if (result?.length > 300) {
    description += "...";
  }

  return (
    <div
      key={index}
      className="h-[42rem] flex flex-col justify-between shadow-md bg-white rounded-xl"
    >
      <div>
        <div className="aspect-w-3 aspect-h-4 bg-gray-100 group-hover:opacity-75 sm:aspect-none sm:h-96">
          <Image
            width={400}
            height={400}
            alt={product.name}
            className="h-full w-full p-[30px] object-contain  object-center lg:h-full lg:w-full"
            src={product.thumbnail}
          />
        </div>
        <div className="p-[30px]">
          <h2 className="hovered__name text-xl font-medium">
            {product.name} {`${product.brand ? `- ${product.brand}` : ""}`}
          </h2>
          <span className="mt-2 text-sm">{description}</span>
          <p className="mt-2 text-xl text-accent">
            {cost === 0 ? "" : `${cost} €`}
          </p>
        </div>
      </div>
      <div>
        {/*!store.is_store_visit && !store.is_simple_virtual_visit ? (
          <>
            <div className="flex text-white w-[5rem] bg-accent p-1 mt-4 text-sm rounded-lg justify-evenly items-center">
              <div>
                <button onClick={() => decrement()}>
                  <FaMinus className="stroke-[1px]" />
                </button>
              </div>
              <span className="text-md">{quantity}</span>
              <div>
                <button onClick={() => increment()}>
                  <FaPlus className="stroke-[0.3px] font-thin" />
                </button>
              </div>
            </div>
            <button className="bg-accent mb-4 mt-4 text-white text-sm font-bold w-full py-2 rounded-md">
              Add to cart
            </button>
          </>
        ) : null*/}
      </div>
    </div>
  );
};

export default Hovered;
