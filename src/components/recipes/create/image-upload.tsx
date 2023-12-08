"use client";

import imageCompression from "browser-image-compression";
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
  // const [selectedFile, setSelectedFile] = useState<File>();
  const [files, setFiles] = useState<FileData[]>([] as FileData[]);

  useEffect(() => {
    return () => files.forEach(({ url }) => URL.revokeObjectURL(url));
  }, [files]);

  // useEffect()

  async function onImageSelect(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    // setSelectedFile(e.target.files[0]);
    const file = e.target.files[0]!;
    if (files.find(({ index }) => index === file.name)) return;

    console.log("originalFile instanceof Blob", file instanceof Blob); // true
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1.5,
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

      const imageUrl = URL.createObjectURL(compressedFile);
      setFiles((prev) => [
        ...prev,
        { index: file.name, file: compressedFile, url: imageUrl },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  function onImageDelete(index: string) {
    URL.revokeObjectURL(files.find((file) => file.index === index)?.url ?? "");
    setFiles((prev) => prev.filter((file) => index !== file.index));
  }

  return (
    <>
      <div>
        <h2 className="col-span-2 mb-1 text-4xl font-bold">
          Images <span className="text-2xl font-light">(max 5)</span>
        </h2>
        <p>First - title image</p>
      </div>
      <div className="relative col-span-2 flex h-80 w-full gap-4 overflow-x-scroll rounded-xl border-2 border-black p-4">
        {files
          ? files.map((image, index) => (
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
