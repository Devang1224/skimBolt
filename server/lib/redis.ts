import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType | null = null;
let isConnecting = false;


export async function getRedisClient(): Promise<RedisClientType | null> {
  // return existing client if already connected
  if (redisClient?.isOpen) {
    return redisClient;
  }

  // if connection is in progress, wait for it
  if (isConnecting) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return getRedisClient();
  }

  // create new connection
  try {
    isConnecting = true;
    
    const client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });

    client.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    client.on("connect", () => {
      console.log("Redis Client Connecting...");
    });

    client.on("ready", () => {
      console.log("Redis Client Ready");
    });

    client.on("reconnecting", () => {
      console.log("Redis Client Reconnecting...");
    });

    await client.connect();
    
    redisClient = client as RedisClientType;
    isConnecting = false;
    
    return redisClient;
  } catch (err) {
    isConnecting = false;
    console.error("Redis Connection Error:", err);
    return null;
  }
}


export async function closeRedisClient(): Promise<void> {
  if (redisClient?.isOpen) {
    await redisClient.quit();
    redisClient = null;
  }
}


export default getRedisClient;
 