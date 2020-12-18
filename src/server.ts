import { createConnection } from "typeorm";

const start = async () => {
  const port = 8000;
  console.log("Connecting to database...")
  await createConnection("default");
  console.log("Connected...");
  const app = await import("./app");
  app.default.listen(port, () => {
    console.log(`Listening port ${port}...`);
  });
};

start();
