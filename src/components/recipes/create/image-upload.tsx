"use client";

import imageCompression from "browser-image-compression";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, type RefObject } from "react";
import { type FieldErrors } from "react-hook-form";
import Button from "~/components/ui/button";
import {
  type CreateEditRecipeFormSchema,
  type ImageActions,
  type LocalImageData,
  type TotalImageData,
} from "~/types/recipe-form";

type ImageUploadProps = {
  totalImages: TotalImageData[];
  imageActions: ImageActions;
  formErrors: FieldErrors<CreateEditRecipeFormSchema>;
  titleRef: RefObject<HTMLHeadingElement>;
  mode: "create" | "edit";
};

export default function ImageUpload({
  totalImages,
  imageActions: { setLocalImages, setFetched },
  formErrors,
  titleRef,
}: ImageUploadProps) {
  async function onImageSelect(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0]!;
    if (totalImages.find(({ key: index }) => index === file.name)) return;

    console.log("originalFile instanceof Blob", file instanceof Blob);
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: totalImages.length === 0 ? 4 : 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const localUrl = URL.createObjectURL(compressedFile);
      setLocalImages((prev) => [
        ...prev,
        {
          key: file.name,
          file: compressedFile,
          url: localUrl,
          origin: "added",
        } as LocalImageData,
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  function onImageDelete(key: string) {
    const imageToDelete = totalImages.find((image) => image.key === key);

    if (imageToDelete?.origin === "fetched") {
      setFetched((prev) => ({
        images: prev.images.filter((file) => key !== file.key),
        toDelete: [...prev.toDelete, key],
      }));
    } else {
      setLocalImages((prev) => prev.filter((file) => key !== file.key));
      URL.revokeObjectURL(
        totalImages.find((file) => file.key === key)?.url ?? "",
      );
    }
  }

  return (
    <>
      <div className="flex items-baseline">
        <div>
          <h2 ref={titleRef} className="col-span-2 mb-1 text-4xl font-bold">
            Images
          </h2>
          <p className="text-sm">First - title image</p>
        </div>

        {formErrors && formErrors.images && (
          <span className="ml-4 text-lg font-bold text-red-400">
            {formErrors.images.root?.message ?? formErrors.images.message}
          </span>
        )}
      </div>
      <div className="relative col-span-2 flex h-96 w-full gap-4 overflow-x-scroll rounded-xl border-2 border-black p-4">
        {totalImages.length < 5 && (
          <label className="flex h-full w-32 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-black bg-yellow-500 shadow-button">
            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              onChange={onImageSelect}
            />
            <Plus size={64}></Plus>
          </label>
        )}
        {totalImages
          ? totalImages.map((image, index) => (
              <div
                key={image.key}
                className="group relative h-full shrink-0 overflow-hidden rounded-xl border-black first-of-type:border-2"
              >
                <div
                  className={`absolute left-0 top-0 z-10 rounded-br-md border-b-2 border-r-2 border-black bg-gray-200 p-4 ${
                    index === 0 ? "block" : "hidden"
                  }`}
                >
                  Title Image
                </div>
                <div className="absolute bottom-0 left-0 z-10 rounded-br-md border-b-2 border-r-2 border-black bg-gray-200 p-4">
                  {image.origin === "added" ? "Added" : "Fetched"} <br />
                  {image.order}
                </div>
                <Button
                  type="button"
                  onClick={() => onImageDelete(image.key)}
                  className="absolute right-4 top-4 z-10 hidden bg-gray-200 group-hover:block"
                >
                  <X></X>
                </Button>
                <Image
                  src={image.url}
                  className="!relative block h-full !w-min overflow-hidden rounded-lg object-contain"
                  alt="image"
                  fill
                ></Image>
              </div>
            ))
          : ""}
      </div>
    </>
  );
}
