import { Search } from "lucide-react";
import Input from "~/components/ui/input";

export default function SearchBar() {
  return (
    <div className="max mb-8 mt-4 flex h-16 w-full items-center rounded-md border-2 border-black bg-yellow-100 px-8 shadow-button">
      <Search size={32}></Search>
      <Input
        // className="flex h-16 w-full items-center bg-yellow-100 pl-8 text-xl duration-300 placeholder:justify-self-center focus:bg-yellow-500 focus:placeholder:font-normal focus:placeholder:text-black"
        border={false}
        className="h-full w-full border-none bg-yellow-100 pl-8 outline-none placeholder:font-bold placeholder:text-black/50"
        placeholder="what are you searching for?"
      ></Input>
    </div>
  );
}
