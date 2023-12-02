"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { useEffect, useState } from "react";
import Input from "~/components/ui/input";

type SearchBarProps = {
  category: string;
};
export default function SearchBar({ category }: SearchBarProps) {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>("");

  const onTimeout = () =>
    router.replace(`/recipes/category/${category}?searchQuery=${inputValue}`);

  useEffect(() => {
    const timeout = setTimeout(onTimeout, 500);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <div className="max mb-8 mt-4 flex h-16 w-full items-center rounded-md border-2 border-black bg-yellow-100 px-8 shadow-button">
      <Search size={32}></Search>
      <Input
        // className="flex h-16 w-full items-center bg-yellow-100 pl-8 text-xl duration-300 placeholder:justify-self-center focus:bg-yellow-500 focus:placeholder:font-normal focus:placeholder:text-black"
        border={false}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className="h-full w-full border-none bg-yellow-100 pl-8 outline-none placeholder:font-bold placeholder:text-black/50"
        placeholder="what are you searching for?"
      ></Input>
    </div>
  );
}
