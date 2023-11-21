import { Github, Link2 } from "lucide-react";
import Image from "next/image";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";

export default function LogIn() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image
        src="/navbar-logo.svg"
        alt="logo"
        className="absolute top-8 aspect-square"
        width={64}
        height={64}
      ></Image>
      <form className="flex w-full max-w-xs flex-col items-stretch">
        <h1 className="mb-8 self-center font-title text-4xl">Welcome back!</h1>
        <Input className="mb-4 p-4" placeholder="Email adress" border></Input>
        <Input
          className="mb-6 p-4"
          placeholder="Password"
          type="password"
          border
        ></Input>
        <Button className=" bg-yellow-500 py-4 text-xl font-bold ">
          Continue
        </Button>
        <p className="my-4 self-center">
          Don&apos;t have an account!{" "}
          <Link href="/auth/signin">
            <LinkIcon className="mx-2 inline" size={16}></LinkIcon>{" "}
            <b className="text-yellow-600">Sign in</b>
          </Link>
        </p>
        <hr />
        <Button className="mt-4" variant="ghost">
          Sign in with GitHub
          <Github className="ml-4 inline"></Github>
        </Button>
      </form>
    </div>
  );
}
