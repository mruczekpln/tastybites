"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Button from "~/components/ui/button";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-min items-center gap-4 bg-red-600 px-8 py-4 text-3xl font-bold text-white hover:bg-red-900"
      variant="ghost"
    >
      <LogOut className="inline" size={32}></LogOut>
      Log out
    </Button>
  );
}
