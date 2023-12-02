"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
import { api } from "~/trpc/react";
import ImageUpload from "./image-upload";
import CookingTimeSlider from "./time-slider";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Title is too short!" })
    .max(50, { message: "Title should not be longer than 50 characters." }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Describe your recipe!" })
    .max(100, { message: "Don't write a letter here!" }),
  ingredients: z
    .array(
      z.object({
        // id: z.string(),
        name: z
          .string()
          .trim()
          .min(1, { message: "Ingredients must have a name!" }),
        amount: z.coerce
          .number()
          .min(1, { message: "You must provide ingredient amount!" }),
        unit: z.union([z.literal("ml"), z.literal("g"), z.literal("pcs")]),
      }),
    )
    .min(1, "You can't make a recipe without ingredients!"),
  instructions: z
    .string()
    .trim()
    .min(10, {
      message: "Don't leave your instructions empty! (at least 10 characters)",
    })
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
  difficultyLevel: z.union([
    z.literal("easy"),
    z.literal("intermediate"),
    z.literal("advanced"),
  ]),
});

export type CreateRecipeFormSchema = z.infer<typeof formSchema>;

export default function CreateRecipeForm() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRecipeFormSchema>({ resolver: zodResolver(formSchema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const addRecipe = api.recipe.add.useMutation();

  const onSubmit: SubmitHandler<CreateRecipeFormSchema> = (data) => {
    addRecipe.mutate(
      {
        ...data,
        images: ["imagelink1", "imagelink2", "imagelink3"],
      },
      {
        onSuccess: ({ id }) => {
          router.push(`/recipes/${id}`);
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto  flex w-full max-w-screen-2xl flex-col items-center gap-8 rounded-xl border-2 border-black bg-white p-16"
    >
      <h1 className="mb-4 font-title text-6xl">Add your recipe! </h1>
      <div className="grid w-full grid-flow-row auto-rows-min grid-cols-2 gap-x-16 gap-y-8 border-t-2 border-black pt-8">
        <ImageUpload></ImageUpload>
        <div>
          <label>
            <h2 className="mb-4 text-4xl font-bold">
              Title
              {errors && errors.name && (
                <span className="ml-4 text-lg text-red-400">
                  {errors.name.message}
                </span>
              )}
            </h2>
            <Input<CreateRecipeFormSchema>
              kind="rhf"
              type="text"
              placeholder="Chicken wings..."
              className="h-16 w-full pl-4 text-xl outline-none"
              label="name"
              register={register}
            />
          </label>
          <label>
            <h2 className="mb-4 mt-8 text-4xl font-semibold">
              Short Description
              {errors && errors.description && (
                <span className="ml-4 text-lg text-red-400">
                  {errors.description.message}
                </span>
              )}
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
          <h2 className="mb-2 text-4xl font-bold">
            Ingredients
            {errors && errors.ingredients && (
              <span className="ml-4 text-lg text-red-400">
                {errors.ingredients.root?.message ?? errors.ingredients.message}
              </span>
            )}
          </h2>
          {fields.map((field, index) => (
            <div className="flex h-10 gap-4" key={field.id}>
              <Input<CreateRecipeFormSchema>
                kind="rhf"
                register={register}
                label={`ingredients.${index}.name`}
                placeholder="Flour..."
                className="w-full"
              ></Input>
              <Input<CreateRecipeFormSchema>
                kind="rhf"
                register={register}
                label={`ingredients.${index}.amount`}
                placeholder="500"
                className="w-20 !pl-3"
              ></Input>
              <select
                {...register(`ingredients.${index}.unit`)}
                className="border-b-2 border-black pr-4"
              >
                <option value="g">grams</option>
                <option value="ml">mililiters</option>
                <option value="pcs">pieces</option>
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
            type="button"
            // @ts-expect-error Not-Assignable
            onClick={() => append({ name: "", amount: null, unit: "g" })}
            className="mt-4 w-full bg-yellow-500"
          >
            Add a ingredient!
          </Button>
        </div>
        <label className="col-span-2">
          <h2 className="mb-4 text-4xl font-bold">
            Instructions
            {errors && errors.instructions && (
              <span className="ml-4 text-lg text-red-400">
                {errors.instructions.message}
              </span>
            )}
          </h2>
          <textarea
            placeholder="1. Prepare chicken"
            rows={8}
            className="w-full resize-none whitespace-break-spaces rounded-lg border-2 border-black p-4 text-xl outline-none"
            {...register("instructions")}
          />
        </label>
        <label className="col-span-2 flex items-center gap-8">
          <h2 className="text-4xl font-bold">Category</h2>
          <select
            className="border-b-2 border-black pr-4 text-2xl"
            defaultValue="default"
            {...register("category")}
          >
            <option disabled value="default">
              select category
            </option>
            <option value="breakfast">breakfast.</option>
            <option value="lunch">lunch.</option>
            <option value="dinner">dinner.</option>
            <option value="appetizers">appetizers.</option>
            <option value="drinks">drinks.</option>
            <option value="desserts">desserts.</option>
          </select>
          {errors && errors.category && (
            <span className="text-lg font-bold text-red-400">
              Select a category!
            </span>
          )}
        </label>
        <label className="col-span-2 flex items-center gap-8">
          <h2 className="text-3xl font-bold">Difficulty level</h2>
          <select
            className="border-b-2 border-black pr-4 text-xl"
            {...register("difficultyLevel")}
            defaultValue="default"
          >
            <option disabled value="default">
              select difficulty level
            </option>
            <option value="easy">Easy</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors && errors.difficultyLevel && (
            <span className="text-lg font-bold text-red-400">
              Select a difficulty level!
            </span>
          )}
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
