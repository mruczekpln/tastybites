"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "~/components/ui/input";
import getNewParams from "~/lib/utils/get-new-params";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams.entries());

  const [inputValue, setInputValue] = useState<string>(
    searchParamsObject.searchQuery ?? "",
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace(
        getNewParams(pathname, {
          ...Object.fromEntries(searchParams.entries()),
          searchQuery: inputValue,
        }),
        { scroll: false },
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue, pathname, router, searchParams]);

  return (
    <div className="max mb-8 mt-4 flex h-16 w-full items-center rounded-md border-2 border-black bg-yellow-100 px-8 shadow-button">
      <Search size={32}></Search>
      <Input
        defaultValue={inputValue}
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
