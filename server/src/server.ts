import app from "./index.js";

const start = () => {
  const PORT = process.env.PORT || 3001;

  app.listen(PORT);

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
