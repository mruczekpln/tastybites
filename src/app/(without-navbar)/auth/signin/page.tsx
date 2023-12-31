import Link from "next/link";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import SignInForm from "~/components/auth/signin-form";
import { getServerAuthSession } from "~/server/auth";

export default async function SignIn() {
  const providers = await getProviders();
  const session = await getServerAuthSession();
  if (session) redirect("/");

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Link href="/" className="absolute top-8 aspect-square hover:scale-105">
        <Image src="/navbar-logo.svg" alt="logo" width={64} height={64}></Image>
      </Link>
      {providers?.github && (
        <SignInForm githubProvider={providers?.github}></SignInForm>
      )}
    </div>
  );
}
