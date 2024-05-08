"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CreateEditRecipeFormFieldset from "~/components/recipes/create-edit-recipe-form-fieldset";
import Button from "~/components/ui/button";
import useRecipeFormImages from "~/lib/hooks/useRecipeFormImages";
import { api } from "~/trpc/react";
import {
  createEditRecipeFormSchema,
  type CreateEditRecipeFormSchema,
  type CreationState,
  type EditRecipeFormDefaultValues,
} from "~/types/recipe-form";

type EditRecipeFormProps = {
  defaultValues: EditRecipeFormDefaultValues;
  recipeId: string;
};
export default function EditRecipeForm({
  defaultValues,
  recipeId,
}: EditRecipeFormProps) {
  const [uploadState, setUploadState] = useState<CreationState>("idle");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful, errors, isDirty },
  } = useForm<CreateEditRecipeFormSchema>({
    resolver: zodResolver(createEditRecipeFormSchema),
    defaultValues: {
      ...defaultValues,
      images: [],
    },
  });

  const { totalImages, fetched, setFetched, setLocalImages, uploadImages } =
    useRecipeFormImages({
      setUploadState,
      setValue,
      defaultFetchedImages: defaultValues.images.map((fetchedImage, index) => ({
        ...fetchedImage,
        origin: "fetched",
        order: index,
      })),
    });

  const editMutation = api.recipe.edit.useMutation();

  const onSubmit = async (data: CreateEditRecipeFormSchema) => {
    const { images, ...recipeData } = data;

    await editMutation.mutateAsync({
      recipeId: Number(recipeId),
      data: recipeData,
      images: {
        toDelete: fetched.toDelete,
        toEdit: totalImages
          .filter((image) => image.origin === "fetched")
          .map(({ key, order, url }) => ({
            key,
            order,
            url,
            isTitle: order === 0,
          })),
      },
    });

    await uploadImages(Number(recipeId));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 rounded-xl border-2 border-black bg-white p-16"
    >
      <div className="flex items-center justify-between">
        <h1 className="mb-4 font-title text-4xl">Edit: {defaultValues.name}</h1>
        <div className="flex gap-8">
          <Link href={`/recipes/${recipeId}`}>
            <Button
              disabled={isSubmitting || isSubmitSuccessful}
              type="submit"
              className="h-24 w-full bg-gray-200 px-8 text-3xl font-bold duration-300"
            >
              Cancel
            </Button>
          </Link>
          <Button
            disabled={isSubmitting || isSubmitSuccessful || !isDirty}
            type="submit"
            className="h-24 w-full bg-yellow-500 px-8 text-3xl font-bold duration-300"
          >
            {uploadState === "idle" ? "Save edited version!" : uploadState}
          </Button>
        </div>
      </div>
      <CreateEditRecipeFormFieldset
        register={register}
        errors={errors}
        control={control}
        imageActions={{
          setLocalImages,
          setFetched,
          // setImageKeysToDelete,
        }}
        totalImages={totalImages}
        mode="edit"
      ></CreateEditRecipeFormFieldset>
    </form>
  );
}
