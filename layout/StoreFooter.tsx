import Link from "next/link";
import { useStore } from "../context/StoreContext";

const leftLinks = [
  {
    name: "À propos",
    path: "/a-propos",
  },
  {
    name: "Accueil",
    path: "/",
  },
];

const rightLinks = [
  {
    name: "Politique de confidentialité",
    path: "/politique-de-confidentialite",
  },
  {
    name: "CGU",
    path: "/cgu",
  },
];

const allLinks = [...leftLinks, ...rightLinks];

const Footer = () => {
  const { store } = useStore();

  return (
    <footer
      className={
        store !== null && store.is_simple_virtual_visit || store !== null && store.is_museum
          ? " flex py-4 xl:py-0 flex-col xl:flex-row justify-center xl:justify-between w-full xl:h-12 items-center bg-[#373737] text-gray-300"
          : "relative flex py-4 xl:py-0 flex-col xl:flex-row justify-center xl:justify-between w-full xl:h-12 items-center bg-[#373737] text-gray-300"
      }
    >
      <ul className="hidden xl:flex h-full">
        <li className="xl:px-3 h-full flex items-center hover:bg-[#394040] transition-ease duration-200 justify-center border-r-[1px] border-gray-400">
          <a href="https://business.virtualia.shop" className="">
            Espace pro
          </a>
        </li>
        {leftLinks.map((link, index) => {
          return (
            <li
              key={index}
              className="xl:px-3 h-full flex items-center hover:bg-[#394040] transition-ease duration-200 justify-center border-r-[1px] border-gray-400"
            >
              <Link href={link.path} className="">
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 xl:mt-0 text-base text-center px-4 flex gap-2 xl:max-w-7xl max-w-md">
        © 2022 - Boutique virtuelle {store ? store.title : null}{" "}
        <span className="hidden xl:block">-</span> membre du réseau
        Virtualia Shop 🌎
      </p>
      <ul className="hidden xl:flex h-full">
        {rightLinks.map((link, index) => {
          return (
            <li
              key={index}
              className="px-3 flex items-center justify-center hover:bg-[#394550] transition-ease duration-200 border-l-[1px] h-full border-gray-400"
            >
              <Link href={link.path} className="">
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-wrap justify-center gap-4 mt-4 px-8 xl:hidden">
        <li className="text-base">
          <a href="https://business.virtualia.shop" className="">
            Espace pro
          </a>
        </li>
        {allLinks.map((link, index) => {
          return (
            <li key={index} className="flex items-center text-base">
              <Link href={link.path} className="">
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
