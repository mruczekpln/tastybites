import { ChevronRight } from "lucide-react";
import Link from "next/link";

function RouteDisplay({ arr }: { arr: string[] }) {
  return (
    <div className="mb-2 flex w-full max-w-screen-2xl items-center gap-2">
      <p className="font-title text-2xl">tastybites</p>
      <ChevronRight></ChevronRight>
      {arr.slice(0, -1).map((item) => (
        <>
          <Link
            href={"/" + item}
            className="text-lg font-light hover:underline"
          >
            {item}
          </Link>
          <ChevronRight></ChevronRight>
        </>
      ))}
      <p className="text-lg font-light">{arr[arr.length - 1]}</p>
    </div>
  );
}

type CategoryParam =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "appetizers"
  | "drinks"
  | "desserts";
type Categories = Record<
  CategoryParam,
  {
    titleText: string;
    subtitleText: string;
    routeArr: string[];
  }
>;

const categories: Categories = {
  breakfast: {
    titleText: "Delicious Breakfast Recipes",
    subtitleText:
      "Start your day right with a variety of tasty breakfast ideas.",
    routeArr: ["recipes", "breakfast"],
  },
  lunch: {
    titleText: "Lunch Recipes",
    subtitleText: "Discover easy-to-make recipes for a delightful lunchtime.",
    routeArr: ["recipes", "lunch"],
  },
  dinner: {
    titleText: "Inspiring Dinner Creations",
    subtitleText: "Explore a collection of dinner recipes for every occasion.",
    routeArr: ["recipes", "dinner"],
  },
  appetizers: {
    titleText: "Irresistible Appetizer Recipes",
    subtitleText:
      "Kick off your meal with mouthwatering appetizers that will leave your guests wanting more.",
    routeArr: ["recipes", "appetizers"],
  },
  drinks: {
    titleText: "Refreshing Drink Recipes",
    subtitleText:
      "Quench your thirst with a variety of refreshing and flavorful drink ideas.",
    routeArr: ["recipes", "drinks"],
  },
  desserts: {
    titleText: "Sweet Treats and Dessert Delights",
    subtitleText:
      "Indulge in delectable desserts that will satisfy your sweet tooth and elevate your dining experience.",
    routeArr: ["recipes", "desserts"],
  },
};

export default function Category({
  params,
}: {
  params: { category: CategoryParam };
}) {
  const currentCategory = categories[params.category];

  return (
    <>
      <RouteDisplay arr={currentCategory.routeArr}></RouteDisplay>
      <div className="my-4">
        <h1 className="text-center font-title text-5xl font-extrabold">
          {currentCategory.titleText}
        </h1>
        <p className="py-4 text-center text-xl">
          {currentCategory.subtitleText}
        </p>
      </div>
    </>
  );
}
