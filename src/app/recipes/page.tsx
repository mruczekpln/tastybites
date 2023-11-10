export default function Recipes() {
  return (
    <div className="h-screen w-full pt-20">
      <div className="flex h-16 w-full border-b-2 border-black">
        <input
          type="text"
          className="flex w-3/4 items-center border-r-2 border-black pl-8 text-2xl outline-none duration-300 focus:bg-yellow-500 focus:placeholder:font-normal focus:placeholder:text-black"
          placeholder="what are you searching for?"
        />
        <div className="flex w-full items-center justify-between gap-8 bg-yellow-200 px-20 text-xl">
          <div className="flex gap-8 [&>*]:cursor-pointer [&>*]:underline-offset-4 [&>*]:duration-300">
            <p className="hover:underline">breakfast.</p>
            <p className="hover:underline">lunch.</p>
            <p className="hover:underline">dinner.</p>
            <p className="hover:underline">apetizers.</p>
            <p className="tracking-wider hover:underline">desserts.</p>
          </div>
          <p className="cursor-pointer">sort by</p>
        </div>
      </div>
    </div>
  );
}
