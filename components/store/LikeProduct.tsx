import React, { useState, useEffect } from 'react'
import { useAuthProvider } from '../../context/AuthContext'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { incrementUserPoints, likeProduct, unLikeProduct, decrementUserPoints } from '../../utils/like'
import Link from 'next/link'

const LikeProduct = ({ product, store }: any) => {
  const [productLikes, setProductLikes] = useState<any>(product.likes);
  const [likesProduct, setLikesProduct] = useState<boolean>(false);

  const { isAuth, user } = useAuthProvider();
  // checks if the user has liked or followed the store already
  useEffect(() => {
    if (isAuth) {
      if (productLikes?.length > 0) {
        productLikes.forEach((like: any) => {
          if (like.user_id === user.id) {
            setLikesProduct(true);
          }
        });
      }
    }
  }, [user, productLikes, isAuth]);

  const handleLike = async (user_id: string, product_id: number) => {
    if (isAuth && likesProduct === false) {
      setLikesProduct(true);
      try {
        await likeProduct(user_id, product_id, store.store_id).then(
          (res: any) => {
            setProductLikes((prev: any) => [...prev, ...res]);
            incrementUserPoints(user_id, 1);
          }
        );
      } catch (error: any) {
        console.log(error);
      }
    }
    if (isAuth && likesProduct === true) {
      setLikesProduct(false);
      try {
        await unLikeProduct(user_id, product_id).then((res) => {
          if (res) {
            setProductLikes((prev: any) =>
              prev.filter((like: any) => like.user_id !== user.id)
            );
            decrementUserPoints(user_id, 1);
          }
        });
      } catch (error: any) {
        console.log(error);
      }
    }
  };


  return (
    <div className="flex items-center">
      {isAuth ? (
        <>
          {likesProduct ? (
            <button
              onClick={() =>
                handleLike(user.id, product.product_id)
              }
              className="flex my-4 items-center gap-2 px-6 py-2 bg-gray-200 rounded-md"
            >
              <AiFillLike className="text-2xl text-vol" />
              <span className="text-gray-500">
                {productLikes?.length}
              </span>
            </button>
          ) : (
            <button
              onClick={() =>
                handleLike(user.id, product.product_id)
              }
              className="flex my-4 items-center gap-2 px-6 py-2 bg-gray-200 rounded-md"
            >
              <AiOutlineLike className="text-2xl text-vol" />
              <span className="text-gray-500">
                {productLikes?.length}
              </span>
            </button>
          )}
        </>
      ) : (
        <Link href="/connexion">
          <button
            className="flex my-4 items-center gap-2 px-6 py-2 bg-gray-200 rounded-md"
          >
            <AiOutlineLike className="text-2xl text-vol" />
            <span className="text-gray-500">
              {productLikes?.length}
            </span>
          </button>
        </Link>
      )}
    </div>
  )
}

export default LikeProduct
