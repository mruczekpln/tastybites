import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import {
  type CreateEditRecipeFormSchema,
  type ImageActions,
  type TotalImageData,
} from "~/types/recipe-form";
import Button from "../ui/button";
import Input from "../ui/input";
import ImageUpload from "./create/image-upload";
import CookingTimeSlider from "./create/time-slider";

type CreateEditRecipeFormFieldsetProps = {
  register: UseFormRegister<CreateEditRecipeFormSchema>;
  errors: FieldErrors<CreateEditRecipeFormSchema>;
  control: Control<CreateEditRecipeFormSchema>;
  totalImages: TotalImageData[];
  imageActions: ImageActions;
  mode: "create" | "edit";
};

export default function CreateEditRecipeFormFieldset({
  register,
  errors,
  control,
  totalImages,
  imageActions,
  mode,
}: CreateEditRecipeFormFieldsetProps) {
  const ingredientsTitleRef = useRef<HTMLHeadingElement>(null);
  const imagesTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const scrollProperties = {
      block: "center",
    } as ScrollIntoViewOptions;

    if (errors.ingredients)
      ingredientsTitleRef.current?.scrollIntoView(scrollProperties);
    if (errors.images) imagesTitleRef.current?.scrollIntoView(scrollProperties);
  }, [errors]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <div className="grid w-full grid-flow-row auto-rows-min grid-cols-2 gap-x-16 gap-y-8 border-t-2 border-black pt-8">
      <ImageUpload
        totalImages={totalImages}
        imageActions={imageActions}
        formErrors={errors}
        titleRef={imagesTitleRef}
        mode={mode}
      ></ImageUpload>
      <div>
        <label>
          <h2 className="mb-4 text-4xl font-bold">
            Title
            {errors?.name && (
              <span className="ml-4 text-lg text-red-400">
                {errors.name.message}
              </span>
            )}
          </h2>
          <Input<CreateEditRecipeFormSchema>
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
            {errors?.description && (
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
        <h2 className="mb-2 text-4xl font-bold" ref={ingredientsTitleRef}>
          Ingredients
          {errors?.ingredients && (
            <span className="ml-4 text-lg text-red-400">
              {errors.ingredients.root?.message ?? errors.ingredients.message}
            </span>
          )}
        </h2>
        {fields.map((field, index) => (
          <div className="flex h-10 gap-4" key={field.id}>
            <Input<CreateEditRecipeFormSchema>
              kind="rhf"
              register={register}
              label={`ingredients.${index}.name`}
              placeholder="Flour..."
              className="w-full"
            ></Input>
            <Input<CreateEditRecipeFormSchema>
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
          {errors?.instructions && (
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
        {errors?.category && (
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
        {errors?.difficultyLevel && (
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
  );
}
