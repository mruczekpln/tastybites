"use client";

import { signIn, type ClientSafeProvider } from "next-auth/react";

import { Github } from "lucide-react";
import Button from "../ui/button";

type Props = {
  githubProvider: ClientSafeProvider;
} & React.ComponentProps<"button">;

export default function AuthWithGithub({ githubProvider }: Props) {
  return (
    <Button
      onClick={() =>
        signIn(githubProvider.id, { redirect: false, callbackUrl: "/" })
      }
      className="mt-4"
      type="button"
      variant="ghost"
    >
      Sign in with GitHub
      <Github className="ml-4 inline"></Github>
    </Button>
  );
}
