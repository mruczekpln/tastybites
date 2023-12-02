"use client";

import { randomUUID } from "crypto";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type ChangeEvent } from "react";
import Button from "~/components/ui/button";

type FileData = {
  index: string;
  file: File;
  url: string;
};

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [files, setFiles] = useState<FileData[]>([] as FileData[]);

  useEffect(() => {
    if (!selectedFile) return;

    const imageUrl = URL.createObjectURL(selectedFile);
    setFiles((prev) => [
      ...prev,
      { index: randomUUID(), file: selectedFile, url: imageUrl },
    ]);

    return () => files.forEach(({ url }) => URL.revokeObjectURL(url));
  }, [selectedFile]);

  function onImageSelect(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    setSelectedFile(e.target.files[0]);
  }

  function onImageDelete(index: string) {
    URL.revokeObjectURL(files.find((file) => file.index === index)?.url ?? "");
    setFiles((prev) => prev.filter((file) => index !== file.index));
  }

  return (
    <>
      <h2 className="col-span-2 text-4xl font-bold">
        Images <span className="text-2xl font-light">(max 10)</span>
      </h2>
      <div className="relative col-span-2 flex h-80 w-full gap-4 overflow-x-scroll rounded-xl border-2 border-black p-4">
        {files
          ? files.map((image) => (
              <div
                key={image.index}
                className="group relative h-full shrink-0 overflow-hidden"
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
        {files.length < 10 && (
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
