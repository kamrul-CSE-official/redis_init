const redis = require("redis");

(async () => {
  const subscriber = redis.createClient({
    url: "redis://localhost:6379",
  });

  subscriber.on("error", (error) => console.log("Redis error!", error));
  subscriber.on("connect", () => console.log("Redis connected."));

  await subscriber.connect();

  subscriber.subscribe("message", (data) => {
    console.log(data);
  });
})();
