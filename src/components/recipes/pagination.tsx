"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent } from "react";
import getNewParams from "~/lib/get-new-params";

type PaginationProps = {
  totalRecipes: number;
};
export default function Pagination({ totalRecipes }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = {
    page: 1,
    perPage: 10,
    ...Object.fromEntries(searchParams.entries()),
  };

  function onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    router.replace(
      getNewParams(pathname, {
        ...params,
        page: "1",
        perPage: e.target.value.toString(),
      }),
    );
  }

  // const lastPage = Math.ceil(recipeCount / Number(params.perPage));

  return (
    <div className="flex w-full justify-between">
      <div className="flex h-16 items-center">
        {params.page > 1 && (
          <button
            onClick={() => {
              router.replace(
                getNewParams(pathname, {
                  ...params,
                  perPage: params.perPage.toString(),
                  page: (Number(params.page) - 1).toString(),
                }),
              );
            }}
            className="flex h-full w-16 items-center justify-center hover:bg-gray-100"
          >
            <ChevronLeft className="rounded-lg hover:bg-gray-100"></ChevronLeft>
          </button>
        )}
        <p className="mx-8 text-3xl font-bold">
          {searchParams.get("page") ?? 1}
        </p>
        {totalRecipes === 11 && (
          <button
            onClick={() => {
              router.replace(
                getNewParams(pathname, {
                  ...params,
                  perPage: params.perPage.toString(),
                  page: (Number(params.page) + 1).toString(),
                }),
              );
            }}
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
          onChange={onSelectChange}
          className="rounded-lg  bg-gray-100 px-2 text-xl"
          name="per-page"
          defaultValue={params.perPage ?? "10"}
          id="per-page"
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
