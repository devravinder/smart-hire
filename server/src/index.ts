import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { node } from "@elysiajs/node";
import { openapi } from "@elysiajs/openapi";
import authMiddleware from "./auth/authMiddleware.js";

const start = () => {
  const app = new Elysia({ adapter: node() });

  const PORT = process.env.PORT || 3001;

  app
    .use(cors())
    .use(authMiddleware)
    .use(openapi()) // path: /openapi,  json: /openapi/json  Note: path customization is not workin properly
    .use(import("./router.js"))
    .listen(PORT);

  console.log(`🦊 Elysia is running at ${PORT}`);
};

const setup = async () => {
  console.log("pre-start: critical setup ");
};

setup()
  .then(start)
  .catch(() => {
    console.log("error");
    process.exit();
  });
