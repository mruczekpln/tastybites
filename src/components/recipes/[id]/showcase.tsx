import Image from "next/image";

type RecipeShowcaseProps = {
  imageLinkArray: string[];
};
// props: RecipeShowcaseProps
export default function RecipeShowcase() {
  return (
    <div className="flex h-full shrink-0 gap-4">
      <div className="relative h-full w-auto overflow-x-hidden rounded-xl border-2 border-black shadow-button">
        <Image
          src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D"
          alt="recipe image"
          fill
          className="!relative h-full object-contain"
        ></Image>
      </div>
      <div className="grid gap-4">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="relative h-full w-auto overflow-x-hidden rounded-xl border-2 border-black shadow-button"
            >
              <Image
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="recipe image"
                fill
                className="!relative h-full object-contain"
              ></Image>
            </div>
          ))}
      </div>
    </div>
  );
}
