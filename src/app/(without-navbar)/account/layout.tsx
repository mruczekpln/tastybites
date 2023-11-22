import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import AccountSidebar from "~/components/account/account-sidebar";
import { getServerAuthSession } from "~/server/auth";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) redirect("/auth/login");

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AccountSidebar></AccountSidebar>
      <div className="no-scrollbar w-full overflow-y-scroll">
        <div className="mx-auto w-full max-w-screen-xl px-2 py-16">
          {children}
        </div>
      </div>
    </div>
  );
}
