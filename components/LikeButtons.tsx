import { useAuthProvider } from "../context/AuthContext";
import { useState, useEffect } from "react"
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsBagCheck, BsBagCheckFill } from "react-icons/bs";
import { likeStore, unlikeStore, followStore, unfollowStore } from "../utils/like"
import Link from "next/link";

export default function LikeButtons({ store }: any) {
  const [hasLiked, setHasLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { isAuth, user } = useAuthProvider();

  useEffect(() => {
    if (user) {
      store.likes.forEach((like: any) => {
        if (like.user_id === user.id) {
          setHasLiked(true);
        }
      })
      store.followers.forEach((follower: any) => {
        if (follower.user_id === user.id) {
          setIsFollowing(true);
        }
      })
    }
  }, [store, setHasLiked, user])

  const handleLike = async (uid: string, sid: number) => {
    if (hasLiked) {
      await unlikeStore(uid, sid);
      setHasLiked(false);
      store.likes.pop()
    } else {
      await likeStore(uid, sid);
      setHasLiked(true);
      store.likes.push(user.id)
    }
  }

  const handleFollow = async (uid: string, sid: number) => {
    if (isFollowing) {
      await unfollowStore(uid, sid);
      setIsFollowing(false);
      store.followers.pop()
    } else {
      await followStore(uid, sid);
      setIsFollowing(true);
      store.followers.push(user.id)
    }
  }



  return (
    <div>
      {isAuth ? (
        <div className="flex gap-6 absolute bottom-3 mx-auto left-0 right-0 items-center justify-center">
          {hasLiked ? (
            <button
              onClick={() => handleLike(user.id, store.store_id)}
              className="flex items-center gap-1"
            >
              <AiFillLike className="text-xl text-vol" />
              <span className="text-gray-500">{store?.likes.length}</span>
            </button>
          ) : (
            <button
              onClick={() => handleLike(user.id, store.store_id)}
              className="flex items-center gap-1"
            >
              <AiOutlineLike className="text-xl text-vol" />
              <span className="text-gray-500">{store?.likes.length}</span>
            </button>
          )}
          {isFollowing ? (
            <button
              onClick={() => handleFollow(user.id, store.store_id)}
              className="flex items-center gap-1"
            >
              <BsBagCheckFill className="text-xl text-vol" />
              <span className="text-gray-500">{store?.followers.length}</span>
            </button>
          ) : (
            <button
              className="flex items-center gap-1"
              onClick={() => handleFollow(user.id, store.store_id)}
            >
              <BsBagCheck className="text-xl text-vol" />
              <span className="text-gray-500">{store?.followers.length}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="flex absolute bottom-3 left-0 right-0 mx-auto gap-6 items-center justify-center">
          <Link href="/connexion">
            <button className="flex items-center gap-1">
              <AiOutlineLike className="text-xl text-vol" />
              <span className="text-gray-500">{store?.likes.length}</span>
            </button>
          </Link>
          <Link href="/connexion">
            <button className="flex items-center gap-1">
              <BsBagCheck className="text-xl text-vol" />
              <span className="text-gray-500">{store?.followers.length}</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
