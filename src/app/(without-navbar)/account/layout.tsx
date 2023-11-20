import Link from "next/link";
import { type ReactNode } from "react";
import AccountSidebar from "~/components/account/account-sidebar";

export default function AccountLayout({ children }: { children: ReactNode }) {
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
