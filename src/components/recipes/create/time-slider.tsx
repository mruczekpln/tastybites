"use client";

import { useState } from "react";
import { type Path, type UseFormRegister } from "react-hook-form";
import minutesToHours from "~/lib/utils/minutes-to-hours";
import { type CreateRecipeFormSchema } from "./form";

type CookingTimeSliderProps = {
  label: Path<CreateRecipeFormSchema>;
  register: UseFormRegister<CreateRecipeFormSchema>;
};

export default function CookingTimeSlider({
  label,
  register,
}: CookingTimeSliderProps) {
  const [sliderValue, setSliderValue] = useState<number>(50);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  const cookingTimes = Array.from(
    { length: 13 },
    (_, index) => 10 + index * 10,
  );

  return (
    <>
      <input
        className="range-lg h-4 w-full cursor-pointer rounded-lg border-0 bg-gray-100 accent-yellow-500 outline-none "
        type="range"
        min={10}
        max={125}
        step={5}
        value={sliderValue}
        list="cookingTimes"
        {...register(label, {
          onChange: handleSliderChange,
          valueAsNumber: true,
        })}
      />{" "}
      <span className="w-64 whitespace-nowrap text-2xl">
        {minutesToHours(sliderValue)}
      </span>
      <datalist id="cookingTimes">
        {cookingTimes.map((time) => (
          <option key={time} value={time} label={minutesToHours(time)} />
        ))}
      </datalist>
    </>
  );
}
