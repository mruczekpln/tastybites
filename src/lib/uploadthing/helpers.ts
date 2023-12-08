import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { TastybitesFileRouter } from "~/app/api/uploadthing/main";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<TastybitesFileRouter>();
