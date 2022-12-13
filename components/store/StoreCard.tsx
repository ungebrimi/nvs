import { useAuthProvider } from "../../context/AuthContext";
import { useState, useEffect } from "react"
import { likeStore, unlikeStore, followStore, unfollowStore } from "../../utils/like"
import Link from "next/link";
import {
  AiOutlineLike,
  AiFillLike,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { BsBagCheck, BsBagCheckFill } from "react-icons/bs";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const Storecard = ({ state, store }: any) => {
  const [description, setDescription] = useState<string>("");
  const notLegalString =
    "https://staging-virtualia.kinsta.cloud/wp-content/uploads/2021/04/default.jpg";

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

  const handleDescription = (text: string, setState: any) => {
    const newDescription = text
      .split("/n")
      .map((str: string, i: number) => <p key={i}>{str}</p>);
    setState(newDescription);
  };

  useEffect(() => {
    if (store.description) {
      handleDescription(store.description, setDescription);
    }
  }, [store]);

  return (
    <div
      className={`${state ? "" : "hidden"
        } h-[42rem] bg-white rounded-xl relative shadow-xl`}
    >
      <div>
        <div
          className={`${store.shop_image !== notLegalString ? "" : "hidden"
            } bg-gray-100 group-hover:opacity-75 sm:aspect-none h-80 rounded-t-xl`}
        >
          <Image
            width={400}
            height={500}
            src={store.shop_image}
            alt={store.title}
            className={`h-full w-full object-cover object-center sm:h-full sm:w-full rounded-t-xl`}
          />
        </div>
        <div className="flex justify-around h-full px-4 py-2 flex-col">
          <div className="text-gray-800">
            <h2 className="hovered__name my-2 text-xl">{store.title}</h2>
            <span className="mt-2 text-[13px] whitespace-pre-line">
              {description}
            </span>
            <div className="flex text-sm absolute bottom-14 flex-wrap items-center">
              {store.website ||
                store.instagram ||
                store.facebook ||
                store.tiktok ? (
                <p className="text-[13px] mr-2">Suivez-nous sur:</p>
              ) : null}
              {store.website && (
                <a
                  className="block text-gray-500 hover:text-gray-600 transition-ease duration-200"
                  href={store.website}
                >
                  <GlobeAltIcon className="inline-block w-5 h-5 mr-2" />
                </a>
              )}
              {store.instagram && (
                <a
                  className="block text-gray-500 hover:text-gray-600 transition-ease duration-200"
                  href={store.instagram}
                >
                  <AiFillInstagram className="inline-block w-5 h-5 mr-2" />
                </a>
              )}
              {store.tiktok && (
                <a
                  className="block text-gray-500 hover:text-gray-600 transition-ease duration-200"
                  href={store.tiktok}
                >
                  <FaTiktok className="inline-block w-4 h-4 mr-2" />
                </a>
              )}
              {store.facebook && (
                <a
                  href={store.facebook}
                  className="block text-gray-500 hover:text-gray-600 transition-ease duration-200"
                >
                  <AiFillFacebook className="inline-block w-5 h-5 mr-2" />
                </a>
              )}
            </div>
          </div>
          {isAuth ? (
            <div className="flex gap-3 mt-4 absolute bottom-2">
              {hasLiked ? (
                <button
                  onClick={() => handleLike(user.id, store.store_id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
                >
                  <AiFillLike className="text-xl text-vol" />
                  <span className="text-gray-500">{store?.likes.length}</span>
                </button>
              ) : (
                <button
                  onClick={() => handleLike(user.id, store.store_id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
                >
                  <AiOutlineLike className="text-xl text-vol" />
                  <span className="text-gray-500">{store?.likes.length}</span>
                </button>
              )}
              {isFollowing ? (
                <button
                  onClick={() => handleFollow(user.id, store.store_id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
                >
                  <BsBagCheckFill className="text-xl text-vol" />
                  <span className="text-gray-500">{store?.followers.length}</span>
                </button>
              ) : (
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
                  onClick={() => handleFollow(user.id, store.store_id)}
                >
                  <BsBagCheck className="text-xl text-vol" />
                  <span className="text-gray-500">{store?.followers.length}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex absolute bottom-3 left-4 right-0 gap-6">
              <Link href="/connexion">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <AiOutlineLike className="text-xl text-vol" />
                  <span className="text-gray-500">{store?.likes.length}</span>
                </button>
              </Link>
              <Link href="/connexion">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <BsBagCheck className="text-xl text-vol" />
                  <span className="text-gray-500">{store?.followers.length}</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Storecard;
