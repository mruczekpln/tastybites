"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type SyntheticEvent } from "react";
import Button from "../ui/button";
import Input from "../ui/input";

export default function RedirectForm() {
  const router = useRouter();

  function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const recipeNameTarget = e.currentTarget.elements[0]! as Element & {
      value: string;
    };

    router.push(`/recipes/category/all?searchQuery=${recipeNameTarget.value}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex h-16 w-full gap-8">
      <Input
        placeholder="Whatever you like!"
        name="recipe-name"
        className="w-full pl-4"
      ></Input>
      <Button
        name="submit"
        type="submit"
        className="aspect-square min-w-[64px] bg-yellow-600 p-2"
      >
        <Image src="/navbar-logo.svg" alt="logo" width={48} height={48}></Image>
      </Button>
    </form>
  );
}
