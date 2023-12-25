"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import CreateEditRecipeFormFieldset from "~/components/recipes/create-edit-recipe-form-fieldset";
import Button from "~/components/ui/button";
import useRecipeFormImages from "~/lib/hooks/useRecipeFormImages";
import { api } from "~/trpc/react";
import {
  createEditRecipeFormSchema,
  type CreateEditRecipeFormSchema,
  type CreationState,
} from "~/types/recipe-form";

export default function CreateRecipeForm() {
  const [uploadState, setUploadState] = useState<CreationState>("idle");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isDirty, isSubmitting, isSubmitSuccessful, errors },
  } = useForm<CreateEditRecipeFormSchema>({
    resolver: zodResolver(createEditRecipeFormSchema),
    defaultValues: {
      // @ts-expect-error default rhf select value
      category: "default",
      name: "",
      cookingTime: 50,
      description: "",
      // @ts-expect-error default rhf select value
      difficultyLevel: "default",
      images: [],
      instructions: "",
      ingredients: [],
    },
  });

  const { totalImages, setLocalImages, setFetched, uploadImages } =
    useRecipeFormImages({
      setUploadState,
      setValue,
      mode: "create",
    });

  console.log("images in form: ", getValues().images);

  const addRecipe = api.recipe.add.useMutation();

  const onSubmit: SubmitHandler<CreateEditRecipeFormSchema> = (data) => {
    addRecipe.mutate(data, {
      onSuccess: ({ id }) => {
        void uploadImages(Number(id));
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto  flex w-full max-w-screen-2xl flex-col items-center gap-8 rounded-xl border-2 border-black bg-white p-16"
    >
      <h1 className="mb-4 font-title text-6xl">Add your recipe! </h1>
      <CreateEditRecipeFormFieldset
        register={register}
        errors={errors}
        control={control}
        imageActions={{
          setFetched,
          setLocalImages,
        }}
        totalImages={totalImages}
        mode="create"
      ></CreateEditRecipeFormFieldset>
      <Button
        disabled={isSubmitting || isSubmitSuccessful || !isDirty}
        type="submit"
        className="h-24 w-full bg-yellow-500 text-3xl font-bold duration-300"
      >
        {uploadState === "idle" ? "Submit your recipe!" : uploadState}
      </Button>
    </form>
  );
}
