import Link from "next/link";

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

  return (
    <footer
      className="relative flex py-4 xl:py-0 flex-col xl:flex-row justify-center xl:justify-between w-full xl:h-12 items-center bg-[#373737] text-gray-300">
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
      <p className="text-center px-4">
        © 2022 - Virtualia Shop - un concept de{" "}
        <a
          href="https://virtualia.ai/"
          rel="noreferrer"
          target="_blank"
          className="cursor-pointer hover:text-gray-400 text-center max-w-md xl:max-w-7xl transition-ease duration-200 font-medium text-base"
        >
          Virtualia Interactive Technologies
        </a>
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
