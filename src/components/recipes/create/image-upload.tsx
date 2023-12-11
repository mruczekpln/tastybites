"use client";

import imageCompression from "browser-image-compression";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import {
  type ChangeEvent,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import { type FieldErrors } from "react-hook-form";
import Button from "~/components/ui/button";
import { type CreateRecipeFormSchema, type FileData } from "./form";

type ImageUploadProps = {
  filesState: [FileData[], Dispatch<SetStateAction<FileData[]>>];
  formErrors: FieldErrors<CreateRecipeFormSchema>;
  titleRef: RefObject<HTMLHeadingElement>;
};

export default function ImageUpload({
  filesState: [files, setFiles],
  formErrors,
  titleRef,
}: ImageUploadProps) {
  async function onImageSelect(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0]!;
    if (files.find(({ index }) => index === file.name)) return;

    console.log("originalFile instanceof Blob", file instanceof Blob);
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: files.length === 0 ? 4 : 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob,
      );

      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`,
      );

      const localUrl = URL.createObjectURL(compressedFile);
      setFiles((prev) => [
        ...prev,
        { index: file.name, file: compressedFile, localUrl },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  function onImageDelete(index: string) {
    URL.revokeObjectURL(
      files.find((file) => file.index === index)?.localUrl ?? "",
    );
    setFiles((prev) => prev.filter((file) => index !== file.index));
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
        {files
          ? files.map((image) => (
              <div
                key={image.index}
                className="group relative h-full shrink-0 overflow-hidden rounded-xl border-black first-of-type:border-2"
              >
                <Button
                  onClick={() => onImageDelete(image.index)}
                  className="absolute right-4 top-4 z-10 hidden bg-gray-200 group-hover:block"
                >
                  <X></X>
                </Button>
                <Image
                  src={image.localUrl}
                  className="!relative block h-full !w-min overflow-hidden rounded-lg object-contain"
                  alt="image"
                  fill
                ></Image>
              </div>
            ))
          : ""}
        {files.length < 5 && (
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
      </div>
    </>
  );
}
