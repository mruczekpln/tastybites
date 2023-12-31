import { createNextRouteHandler } from "uploadthing/next";

import { tastybitesFileRouter } from "./main";

export const { GET, POST } = createNextRouteHandler({
  router: tastybitesFileRouter,
});
