"use client";

import imageCompression from "browser-image-compression";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type ChangeEvent } from "react";
import type { TastybitesFileRouter } from "~/app/api/uploadthing/main";
import Button from "~/components/ui/button";
import { UploadDropzone } from "~/lib/uploadthing/ui";
import { FileData } from "./form";

type ImageUploadProps = {
  onImageSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  onImageDelete: (index: string) => void;
  files: FileData[];
};

export default function ImageUpload({
  onImageSelect,
  onImageDelete,
  files,
}: ImageUploadProps) {
  return (
    <>
      <div>
        <h2 className="col-span-2 mb-1 text-4xl font-bold">
          Images <span className="text-2xl font-light">(max 5)</span>
        </h2>
        <p>First - title image</p>
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
                  src={image.url}
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
