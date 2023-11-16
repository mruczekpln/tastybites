"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export default function ReviewRating() {
  const [stars, setStars] = useState<
    ("hovered" | "selected" | "unselected" | "selected-hovered")[]
  >(new Array(5).fill("unselected"));

  function onEnter(enteredIndex: number) {
    setStars((prev) =>
      prev.map((starState, index) => {
        if (index <= enteredIndex) {
          if (starState === "selected") return starState;
          else if (starState === "unselected") return "hovered";
        } else {
          if (starState === "selected") return "selected-hovered";
        }

        return starState;
      }),
    );
  }

  function onLeave() {
    setStars((prev) =>
      prev.map((starState) => {
        if (starState in ["selected", "unselected"]) return starState;
        else if (starState === "hovered") return "unselected";
        else if (starState === "selected-hovered") return "selected";
        return starState;
      }),
    );
  }

  function onClick(enteredIndex: number) {
    setStars((prev) =>
      prev.map((_, index) =>
        index <= enteredIndex ? "selected" : "unselected",
      ),
    );
  }

  return (
    <div className="flex">
      {stars.map((starState, index) => (
        <Star
          key={index}
          className={`stroke-none ${
            starState === "unselected" || starState === "selected-hovered"
              ? "fill-gray-300"
              : starState === "selected"
                ? "fill-yellow-600"
                : "fill-yellow-500"
          }`}
          onMouseEnter={() => onEnter(index)}
          onMouseLeave={() => onLeave()}
          onClick={() => onClick(index)}
          size={40}
        ></Star>
      ))}
      {/* <Star className="fill-yellow-600 stroke-none" size={48}></Star>
      <Star className="fill-yellow-600 stroke-none" size={48}></Star>
      <Star className="fill-yellow-600 stroke-none" size={48}></Star>
      <Star className="fill-gray-300 stroke-none" size={48}></Star>
      <Star className="fill-gray-300 stroke-none" size={48}></Star> */}
    </div>
  );
}
