import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";

export default async function CreateEditRecipeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) redirect("/auth/login");

  return <div className="w-full bg-yellow-50 pb-16 pt-32">{children}</div>;
}
