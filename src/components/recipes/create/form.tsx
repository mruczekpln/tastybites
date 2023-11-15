"use client";

import Input from "~/components/ui/input";
import ImageUpload from "./image-upload";
import { z } from "zod";
import Button from "~/components/ui/button";
import CookingTimeSlider from "./time-slider";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title is too short!" })
    .max(50, { message: "Title should not be longer than 50 characters." }),
  description: z
    .string()
    .min(10, { message: "Describe your recipe!" })
    .max(100, { message: "Don't write a letter here!" }),
  ingredients: z
    .array(
      z.object({
        // id: z.string(),
        name: z.string().min(1, { message: "Ingredients must have a name!" }),
        amount: z.coerce
          .number()
          .min(1, { message: "You must provide ingredient amount!" }),
        unit: z.union([z.literal("ml"), z.literal("g")]),
      }),
    )
    .min(1, "You can't make a recipe without ingredients!"),
  instructions: z
    .string()
    .min(10, { message: "Description is clearly too short." })
    .max(2000),
  category: z.union([
    z.literal("breakfast"),
    z.literal("lunch"),
    z.literal("dinner"),
    z.literal("appetizers"),
    z.literal("drinks"),
    z.literal("desserts"),
  ]),
  cookingTime: z.coerce.number().min(5).max(205),
  difficultyLevel: z.string().min(3),
  // servings: z.number().min(1),
});

export type FormSchema = z.infer<typeof formSchema>;

export default function CreateRecipeForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => console.log(data);
  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto  flex w-full max-w-screen-2xl flex-col items-center gap-8 rounded-xl border-2 border-black bg-white p-16"
    >
      <h1 className="mb-4 font-title text-6xl">Add your recipe!</h1>
      <div className="grid w-full grid-flow-row auto-rows-min grid-cols-2 gap-x-16 gap-y-8 border-t-2 border-black pt-8">
        <ImageUpload></ImageUpload>
        <div>
          <label>
            <h2 className="mb-4 text-4xl font-bold">Title</h2>
            <Input
              kind="rhf"
              type="text"
              placeholder="Chicken wings..."
              className="h-16 w-full pl-4 text-xl outline-none"
              label="title"
              register={register}
            />
          </label>
          <label>
            <h2 className="mb-4 mt-8 text-4xl font-semibold">
              Short Description
            </h2>
            <textarea
              rows={4}
              placeholder="Coated with bbq glazure..."
              className="w-full resize-none whitespace-break-spaces rounded-lg bg-gray-100 p-4 text-xl outline-none"
              {...register("description")}
            />
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="mb-2 text-4xl font-bold">Ingredients</h2>
          {fields.map((field, index) => (
            <div className="flex h-10 gap-4" key={field.id}>
              <Input
                kind="rhf"
                register={register}
                label={`ingredients.${index}.name`}
                placeholder="Flour..."
                className="w-full"
              ></Input>
              <Input
                kind="rhf"
                register={register}
                label={`ingredients.${index}.amount`}
                placeholder="500"
                className="w-20"
              ></Input>
              <select
                {...register(`ingredients.${index}.unit`)}
                className="border-b-2 border-black pr-4"
              >
                <option value="g">grams</option>
                <option value="ml">mililiters</option>
              </select>
              <Button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-200"
              >
                <X size={20}></X>
              </Button>
            </div>
          ))}
          <Button
            onClick={() => append({ name: "", amount: null, unit: "g" })}
            className="mt-4 w-full bg-yellow-500"
          >
            Add a ingredient!
          </Button>
        </div>
        <label className="col-span-2">
          <h2 className="mb-4 text-4xl font-bold">Instructions</h2>
          <textarea
            placeholder="1. Prepare chicken"
            rows={8}
            className="w-full resize-none whitespace-break-spaces rounded-lg border-2 border-black p-4 text-xl outline-none"
            {...register("instructions")}
          />
        </label>
        <label className="col-span-2 flex gap-8">
          <h2 className="text-4xl font-bold">Category</h2>
          <select
            className="border-b-2 border-black pr-4 text-2xl"
            {...register("category")}
          >
            <option value="breakfast">breakfast.</option>
            <option value="lunch">lunch.</option>
            <option value="dinner">dinner.</option>
            <option value="appetizers">appetizers.</option>
            <option value="drinks">drinks.</option>
            <option value="desserts">desserts.</option>
          </select>
        </label>
        <label className="flex gap-8">
          <h2 className="text-3xl font-bold">Difficulty level</h2>
          <select
            className="border-b-2 border-black pr-4 text-xl"
            {...register("difficultyLevel")}
          >
            <option value="easy">Easy</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <label className="col-span-2 flex items-center gap-8">
          <h2 className="whitespace-nowrap text-3xl font-bold">Cooking Time</h2>
          <CookingTimeSlider
            register={register}
            label="cookingTime"
          ></CookingTimeSlider>
        </label>
      </div>
      <Button
        type="submit"
        className="h-24 w-full bg-yellow-500 text-3xl font-bold duration-300"
      >
        Submit your recipe!
      </Button>
    </form>
  );
}
