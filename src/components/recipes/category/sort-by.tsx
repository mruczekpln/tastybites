"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent } from "react";
import getNewParams from "~/lib/utils/get-new-params";

export default function SortBy() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams.entries());

  function onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    router.replace(
      getNewParams(pathname, {
        ...searchParamsObject,
        page: "1",
        sortBy: e.target.value,
      }),
    );
  }

  return (
    <div className="flex w-min items-center gap-4">
      <label htmlFor="sort-by" className="whitespace-nowrap">
        sort by
      </label>
      <select
        name="sort-by"
        id="sort-by"
        defaultValue={searchParamsObject.sortBy ?? "likes"}
        onChange={onSelectChange}
      >
        <option value="likes">most likes</option>
        <option value="rating">rating</option>
        <option value="latest">latest</option>
        <option value="name">name</option>
      </select>
    </div>
  );
}
