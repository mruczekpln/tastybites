import { getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogInForm from "~/components/auth/login-form";
import { getServerAuthSession } from "~/server/auth";

export default async function LogIn() {
  const providers = await getProviders();
  const session = await getServerAuthSession();
  if (session) redirect("/");

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Link href="/" className="absolute top-8 aspect-square hover:scale-105">
        <Image src="/navbar-logo.svg" alt="logo" width={64} height={64}></Image>
      </Link>
      {providers?.github && (
        <LogInForm githubProvider={providers?.github}></LogInForm>
      )}
    </div>
  );
}
