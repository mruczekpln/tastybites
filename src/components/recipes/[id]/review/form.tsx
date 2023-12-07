"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CornerDownRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Button from "~/components/ui/button";
import { api } from "~/trpc/react";
import RecipeReviewFormRating from "./rating";

const formSchema = z.object({
  rating: z
    .number({ required_error: "Every review has a rating!" })
    .min(1)
    .max(5),
  content: z
    .string()
    .min(16, { message: "Review can't be that short! " })
    .max(250, { message: "Now it's too long! 250 characters max" }),
});

export type RecipeReviewFormSchema = z.infer<typeof formSchema>;

type RecipeReviewFormProps = {
  recipeId: number;
};
export default function RecipeReviewForm({ recipeId }: RecipeReviewFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful, errors, isValid },
  } = useForm<RecipeReviewFormSchema>({ resolver: zodResolver(formSchema) });

  const addReview = api.recipe.addReview.useMutation();

  const onSubmit: SubmitHandler<RecipeReviewFormSchema> = (data) => {
    addReview.mutate({
      ...data,
      recipeId,
    });

    setTimeout(() => router.refresh(), 5000);
  };

  return isSubmitSuccessful ? (
    <div className="mt-4 w-fit rounded-lg border-2 border-black p-4">
      <p className="text-2xl font-bold">Thanks for your review!</p>
      <p className="text-xl">wait a second for changes to apply...</p>
      <p className="text-sm">couldn&apos;t get it working with revalidateTag</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4 flex items-center gap-4">
        <h3 className="text-3xl">Rating</h3>
        <RecipeReviewFormRating
          setValue={setValue}
          isSubmitted={isSubmitSuccessful && isValid}
        />
        {errors && (
          <span className="ml-4 text-lg text-red-400">
            {errors.rating?.message ?? errors.content?.message}
          </span>
        )}
      </div>
      <div className="flex w-full gap-4">
        <textarea
          disabled={isSubmitSuccessful && isValid}
          placeholder="I really liked the recipe cuz..."
          className="w-4/5 resize-none rounded-xl bg-gray-200 p-4 disabled:opacity-50"
          rows={4}
          {...register("content")}
        ></textarea>
        <Button className="flex grow items-center justify-center rounded-xl bg-yellow-500">
          <CornerDownRight size={48}></CornerDownRight>
        </Button>
      </div>
    </form>
  );
}
