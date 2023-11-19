import { type ReactNode } from "react";
import RouteDisplay from "~/components/recipes/path-display";
import AccountSidebar from "~/components/account/account-sidebar";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-screen-2xl pb-16 pt-32">
      <RouteDisplay
        arr={[{ displayedName: "account", href: "/account" }]}
      ></RouteDisplay>
      <div className="mt-8 flex w-full gap-16">
        <AccountSidebar></AccountSidebar>
        {children}
      </div>
    </div>
  );
}
