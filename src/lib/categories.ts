import { type RecipeCategoryData } from "~/types";

export const categories: RecipeCategoryData = {
  all: {
    name: "all.",
    titleText: "All Recipes & Cooking Ideas",
    subtitleText: "Explore various recipes and kitchen ideas.",
    href: "/recipes/all",
  },
  breakfast: {
    name: "breakfast.",
    titleText: "Delicious Breakfast Recipes",
    subtitleText:
      "Start your day right with a variety of tasty breakfast ideas.",
    href: "/recipes/breakfast",
  },
  lunch: {
    name: "lunch.",
    titleText: "Lunch Recipes",
    subtitleText: "Discover easy-to-make recipes for a delightful lunchtime.",
    href: "/recipes/lunch",
    imageSize: 150,
  },
  dinner: {
    name: "dinner.",
    titleText: "Inspiring Dinner Creations",
    subtitleText: "Explore a collection of dinner recipes for every occasion.",
    href: "/recipes/dinner",
  },
  appetizers: {
    name: "appetizers.",
    titleText: "Irresistible Appetizer Recipes",
    subtitleText:
      "Kick off your meal with mouthwatering appetizers that will leave your guests wanting more.",
    href: "/recipes/appetizers",
    imageSize: 55,
  },
  desserts: {
    name: "desserts.",
    titleText: "Sweet Treats and Dessert Delights",
    subtitleText:
      "Indulge in delectable desserts that will satisfy your sweet tooth and elevate your dining experience.",
    href: "/recipes/desserts",
  },
  drinks: {
    name: "drinks.",
    titleText: "Refreshing Drink Recipes",
    subtitleText:
      "Quench your thirst with a variety of refreshing and flavorful drink ideas.",
    href: "/recipes/drinks",
  },
};
