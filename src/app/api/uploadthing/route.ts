import { createRouteHandler } from "uploadthing/next";

import { tastybitesFileRouter } from "./main";

export const { GET, POST } = createRouteHandler({
  router: tastybitesFileRouter,
});
