import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="z-10 flex h-min cursor-pointer items-center gap-2"
      prefetch={false}
    >
      <Image
        src="/navbar-logo.svg"
        alt="hero/photo"
        width={48}
        height={48}
        className="inline"
      ></Image>
      <p className="font-title text-4xl font-bold leading-none">TastyBites</p>
    </Link>
  );
}
