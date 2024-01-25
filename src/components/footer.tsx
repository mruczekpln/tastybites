import Image from "next/image";
import Link from "next/link";
import NavLink from "./link";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="h-64 w-full border-t-2 border-black bg-white">
      <div className="mx-auto flex w-full max-w-screen-2xl justify-between pt-8">
        <div className="flex flex-col gap-4 font-light">
          <Logo></Logo>
          <NavLink href="/">home.</NavLink>
          <NavLink href="/recipes">recipes.</NavLink>
          <NavLink href="/recipes/create" className="font-bold">
            add your recipe
          </NavLink>
        </div>
        <div className="flex flex-col items-end justify-between">
          <h2 className="text-xl">
            made by:{" "}
            <Link
              href="https://mruczek-pln.vercel.app/"
              target="_blank"
              className="ml-4 cursor-pointer text-5xl font-bold duration-75 hover:tracking-wide"
            >
              mruczekpln
            </Link>
          </h2>
          <div>
            <Image
              src="/featured/symbol2.svg"
              alt="symbol2"
              width={64}
              height={64}
              className="inline"
            ></Image>
            <Image
              src="/navbar-logo.svg"
              alt="logo"
              width={64}
              height={64}
              className="inline"
            ></Image>
            <Image
              src="/featured/symbol2.svg"
              alt="symbol2"
              width={64}
              height={64}
              className="inline"
            ></Image>
            <Image
              src="/navbar-logo.svg"
              alt="logo"
              width={64}
              height={64}
              className="inline"
            ></Image>
            <Image
              src="/featured/symbol2.svg"
              alt="symbol2"
              width={64}
              height={64}
              className="inline"
            ></Image>
            <Image
              src="/navbar-logo.svg"
              alt="logo"
              width={64}
              height={64}
              className="inline"
            ></Image>
          </div>
        </div>
      </div>
    </footer>
  );
}
