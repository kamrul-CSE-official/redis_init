const express = require("express");
const redis = require("redis");

const app = express();

const publisher = redis.createClient({
  url: "redis://localhost:6379",
});

publisher.on("error", (error) => console.log("Redis error!", error));

publisher.on("connect", () => console.log("Redis connected."));

app.get("/", (req, res) => {
  res.send({
    message: "Publisher port 3001",
  });
});

app.get("/publisher", async (req, res) => {
  const id = Math.floor(Math.random() * 10);
  const data = {
    id: id,
    message: `This response come form Publisher: ${id}`,
  };
console.log("Publish data: ", data);
  await publisher.publish("message", JSON.stringify(data));

  res.send({
    message: "publisher send!",
  });
});

const connect = async () => {
  try {
    await publisher.connect();
  } catch (error) {
    console.log("Failed to connect to Redis:", error);
  }
};

connect();

app.listen(3001, () =>
  console.log(`This publisher server is running at http://localhost:3001`)
);
