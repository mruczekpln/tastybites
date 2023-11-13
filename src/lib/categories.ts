import { type RecipeCategoryData } from "~/types";

export const categories: RecipeCategoryData = {
  all: {
    name: "all.",
    titleText: "All Recipes & Cooking Ideas",
    subtitleText: "Explore various recipes and kitchen ideas.",
    href: "/recipes/category/all",
  },
  breakfast: {
    name: "breakfast.",
    titleText: "Delicious Breakfast Recipes",
    subtitleText:
      "Start your day right with a variety of tasty breakfast ideas.",
    href: "/recipes/category/breakfast",
    imagePath: "/recipes/breakfast.png",
  },
  lunch: {
    name: "lunch.",
    titleText: "Lunch Recipes",
    subtitleText: "Discover easy-to-make recipes for a delightful lunchtime.",
    href: "/recipes/category/lunch",
    imageSize: 150,
    imagePath: "/recipes/lunch.png",
  },
  dinner: {
    name: "dinner.",
    titleText: "Inspiring Dinner Creations",
    subtitleText: "Explore a collection of dinner recipes for every occasion.",
    href: "/recipes/category/dinner",
    imagePath: "/recipes/dinner.png",
  },
  appetizers: {
    name: "appetizers.",
    titleText: "Irresistible Appetizer Recipes",
    subtitleText:
      "Kick off your meal with mouthwatering appetizers that will leave your guests wanting more.",
    href: "/recipes/category/appetizers",
    imageSize: 55,
    imagePath: "/recipes/appetizers.png",
  },
  desserts: {
    name: "desserts.",
    titleText: "Sweet Treats and Dessert Delights",
    subtitleText:
      "Indulge in delectable desserts that will satisfy your sweet tooth and elevate your dining experience.",
    href: "/recipes/category/desserts",
    imagePath: "/recipes/desserts.png",
  },
  drinks: {
    name: "drinks.",
    titleText: "Refreshing Drink Recipes",
    subtitleText:
      "Quench your thirst with a variety of refreshing and flavorful drink ideas.",
    href: "/recipes/category/drinks",
  },
};
