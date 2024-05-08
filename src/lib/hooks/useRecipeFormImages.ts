import { useRouter } from "next/navigation";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { type UseFormSetValue } from "react-hook-form";
import {
  type CreateEditRecipeFormSchema,
  type CreationState,
  type Fetched,
  type FetchedImageData,
  type LocalImageData,
} from "~/types/recipe-form";
import { uploadFiles } from "../uploadthing/helpers";

type useRecipeFormImagesProps = {
  setValue: UseFormSetValue<CreateEditRecipeFormSchema>;
  setUploadState: Dispatch<SetStateAction<CreationState>>;
  defaultLocalImages?: LocalImageData[];
  defaultFetchedImages?: FetchedImageData[];
};
export default function useRecipeFormImages({
  setValue,
  setUploadState,
  defaultLocalImages = [],
  defaultFetchedImages = [],
}: useRecipeFormImagesProps) {
  const router = useRouter();

  const [localImages, setLocalImages] =
    useState<LocalImageData[]>(defaultLocalImages);
  const [fetched, setFetched] = useState<Fetched>({
    images: defaultFetchedImages,
    toDelete: [],
  });

  const totalImages = [...fetched.images, ...localImages].map(
    (imageData, index) => {
      return {
        ...imageData,
        order: index,
      };
    },
  );

  useEffect(() => {
    const localTotalImages = [...fetched.images, ...localImages];

    setValue(
      "images",
      localTotalImages.map(({ key }) => ({ key })),
    );

    return () => localImages.forEach(({ url }) => URL.revokeObjectURL(url));
  }, [localImages, fetched.images, setValue]);

  async function uploadImages(recipeId: number) {
    setUploadState("uploading");

    for (const image of totalImages) {
      if (image.origin === "added") {
        console.log("uploading image: ", image);
        await uploadFiles("recipeImage", {
          input: { recipeId, order: image.order, isTitle: image.order === 0 },
          files: [image.file],
        });
      }
    }

    setUploadState("redirecting");

    setTimeout(() => {
      router.push(`/recipes/${recipeId}`);
    }, 500);
  }

  return {
    totalImages,
    localImages,
    fetched,
    setFetched,
    setLocalImages,
    // setImageKeysToDelete,
    uploadImages,
  };
}
