import { generateComponents } from "@uploadthing/react";

import type { TastybitesFileRouter } from "~/app/api/uploadthing/main";

export const { UploadDropzone } = generateComponents<TastybitesFileRouter>();
