import Image from "next/image";
import Checkbox from "./filters-checkbox";

export default function Filters() {
  return (
    <aside className="h-min w-1/3 rounded-lg">
      <h1 className="mb-8 text-5xl font-extrabold">Filters</h1>
      <h2 className="mb-4 text-3xl font-semibold">
        <Image
          src="/hero/arrow1.svg"
          alt="->"
          width={48}
          height={48}
          className="inline rotate-90"
        ></Image>{" "}
        Cooking Time
      </h2>
      <ul className="ml-8 flex flex-col gap-2  [&>*]:flex [&>*]:gap-4">
        <Checkbox name="<10">less than 10 mins</Checkbox>
        <Checkbox name="10-20">10 to 20 mins</Checkbox>
        <Checkbox name="20-40">20 to 40 mins</Checkbox>
        <Checkbox name="40-60">40 mins to a hour</Checkbox>
        <Checkbox name="60-120">1 to 2 hours</Checkbox>
        <Checkbox name=">120">more than 2 hours</Checkbox>
      </ul>
      <h2 className="my-4 text-3xl font-semibold">
        <Image
          src="/hero/arrow1.svg"
          alt="->"
          width={48}
          height={48}
          className="inline rotate-90"
        ></Image>{" "}
        Difficulty Level
      </h2>
      <ul className="ml-8 flex flex-col gap-2 [&>*]:flex [&>*]:gap-4">
        <Checkbox name="easy" className="flex">
          Easy
        </Checkbox>
        <Checkbox name="intermediate" className="flex">
          Intermediate
        </Checkbox>
        <Checkbox name="advanced" className="flex">
          Advanced
        </Checkbox>
      </ul>
      <h2 className="my-4 text-3xl font-semibold">
        <Image
          src="/hero/arrow1.svg"
          alt="->"
          width={48}
          height={48}
          className="inline rotate-90"
        ></Image>{" "}
        Rating
      </h2>
      <ul className="ml-8 flex flex-col gap-2 [&>*]:flex [&>*]:gap-4">
        <Checkbox name="1-star" className="flex">
          1 star
        </Checkbox>
        <Checkbox name="2-star" className="flex">
          2 stars
        </Checkbox>
        <Checkbox name="3-star" className="flex">
          3 stars
        </Checkbox>
        <Checkbox name="4-star" className="flex">
          4 stars
        </Checkbox>
        <Checkbox name="5-star" className="flex">
          5 stars
        </Checkbox>
      </ul>
      <h2 className="my-4 text-3xl font-semibold">
        <Image
          src="/hero/arrow1.svg"
          alt="->"
          width={48}
          height={48}
          className="inline rotate-90"
        ></Image>{" "}
        Additional
      </h2>
      <ul className="ml-8 flex flex-col gap-2 [&>*]:flex [&>*]:gap-4">
        <Checkbox name="high-protein">high in protein</Checkbox>
        <Checkbox name="low-calorie">low calorie</Checkbox>
        <Checkbox name="alcohol">with alcohol</Checkbox>
      </ul>
    </aside>
  );
}
