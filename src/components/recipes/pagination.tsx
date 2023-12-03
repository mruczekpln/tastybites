"use client";

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  recipeCount: number;
};
export default function Pagination({ recipeCount }: PaginationProps) {
  // const router = useRouter();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = {
    page: 1,
    perPage: 10,
    ...Object.fromEntries(searchParams.entries()),
  };

  const lastPage = Math.ceil(recipeCount / params.perPage);

  return (
    <div className="flex w-full justify-between">
      <div className="flex h-16 items-center">
        {params.page > 1 && (
          <>
            {params.page > 2 && (
              <Link
                href={{
                  pathname,
                  query: { ...params, page: "1" },
                }}
                className="flex h-full w-16 items-center justify-center hover:bg-gray-100"
              >
                <ChevronFirst className="rounded-lg hover:bg-gray-100"></ChevronFirst>
              </Link>
            )}
            <Link
              href={{
                pathname,
                query: { ...params, page: Number(params.page) - 1 },
              }}
              className="flex h-full w-16 items-center justify-center hover:bg-gray-100"
            >
              <ChevronLeft className="rounded-lg hover:bg-gray-100"></ChevronLeft>
            </Link>
          </>
        )}
        <p className="mx-8 text-3xl font-bold">
          {searchParams.get("page") ?? 1}
        </p>
        {params.page < lastPage && (
          <>
            <Link
              href={{
                pathname,
                query: { ...params, page: Number(params.page) + 1 },
              }}
              className="flex h-full w-16 items-center justify-center hover:bg-gray-100"
            >
              <ChevronRight className="rounded-lg hover:bg-gray-100"></ChevronRight>
            </Link>
            {params.page < lastPage - 1 && (
              <Link
                href={{
                  pathname,
                  query: {
                    ...params,
                    page: lastPage,
                  },
                }}
                className="flex h-full w-16 items-center justify-center hover:bg-gray-100"
              >
                <ChevronLast className="rounded-lg hover:bg-gray-100"></ChevronLast>
              </Link>
            )}
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="per-page" className="text-2xl">
          Showing
        </label>
        <select
          onChange={(e) => {
            router.replace(
              pathname + `?page=${params.page}&perPage=${e.target.value}`,
            );
          }}
          className="rounded-lg  bg-gray-100 px-2 text-xl"
          name="per-page"
          defaultValue={10}
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
