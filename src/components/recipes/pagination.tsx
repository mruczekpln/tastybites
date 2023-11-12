import {
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
} from "lucide-react";

export default function Pagination() {
  return (
    <div className="flex w-full justify-between">
      <div className="flex h-16 items-center">
        <div className="flex h-full w-16 items-center justify-center hover:bg-gray-100">
          <ChevronFirst className="rounded-lg hover:bg-gray-100"></ChevronFirst>
        </div>
        <div className="flex h-full w-16 items-center justify-center hover:bg-gray-100">
          <ChevronLeft className="rounded-lg hover:bg-gray-100"></ChevronLeft>
        </div>
        <p className="mx-8 text-3xl font-bold">1</p>
        <div className="flex h-full w-16 items-center justify-center hover:bg-gray-100">
          <ChevronRight className="rounded-lg hover:bg-gray-100"></ChevronRight>
        </div>
        <div className="flex h-full w-16 items-center justify-center hover:bg-gray-100">
          <ChevronLast className="rounded-lg hover:bg-gray-100"></ChevronLast>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="per-page" className="text-2xl">
          Showing
        </label>
        <select
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
