"use client";

import { ChevronFirst, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent } from "react";
import getNewParams from "~/lib/utils/get-new-params";

type PaginationProps = {
  totalRecipes: number;
};

export default function Pagination({ totalRecipes }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const searchParamsObject = {
    page: 1,
    perPage: 10,
    ...Object.fromEntries(searchParams.entries()),
  };

  function onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    router.replace(
      getNewParams(pathname, {
        ...searchParamsObject,
        page: "1",
        perPage: e.target.value.toString(),
      }),
    );
  }

  function switchPage(page: number) {
    router.replace(
      getNewParams(pathname, {
        ...searchParamsObject,
        perPage: searchParamsObject.perPage.toString(),
        page: page.toString(),
      }),
    );
  }

  return (
    <div className="flex w-full justify-between">
      <div className="flex h-16 items-center">
        {searchParamsObject.page > 2 && (
          <button
            onClick={() => switchPage(1)}
            className="flex h-full w-16 items-center justify-center hover:bg-gray-100"
          >
            <ChevronFirst className="rounded-lg hover:bg-gray-100"></ChevronFirst>
          </button>
        )}
        {searchParamsObject.page > 1 && (
          <button
            onClick={() => switchPage(Number(searchParamsObject.page) - 1)}
            className="flex h-full w-16 items-center justify-center hover:bg-gray-100"
          >
            <ChevronLeft className="rounded-lg hover:bg-gray-100"></ChevronLeft>
          </button>
        )}
        <p className="mx-8 text-3xl font-bold">{searchParamsObject.page}</p>
        {totalRecipes === 11 && (
          <button
            onClick={() => switchPage(Number(searchParamsObject.page) + 1)}
            className="flex h-full w-16 items-center justify-center hover:bg-gray-100"
          >
            <ChevronRight className="rounded-lg hover:bg-gray-100"></ChevronRight>
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="per-page" className="text-2xl">
          Showing
        </label>
        <select
          className="rounded-lg  bg-gray-100 px-2 text-xl"
          name="per-page"
          id="per-page"
          defaultValue={searchParamsObject.perPage ?? "10"}
          onChange={onSelectChange}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <p className="text-2xl">per page</p>
      </div>
    </div>
  );
}
