import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { node } from "@elysiajs/node";
import { openapi } from "@elysiajs/openapi";
import router from './router.js'
import { errors, globalErrorHandler } from "./errors.js";

const start = () => {
  const app = new Elysia({ adapter: node() });

  const PORT = process.env.PORT || 3001;

  app
    .use(cors())  
    .use(openapi())
    .error(errors)
    .onError(globalErrorHandler)
    .use(router)
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
