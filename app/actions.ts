"use server";

import { Redis } from "@upstash/redis";
import { Result, ResultCode } from "@/utils/types";

const redis = Redis.fromEnv();

export async function getTopStories(): Promise<Result> {
  try {
    const data: [] = await redis.zrange("stories", 0, 9, { rev: true });

    return {
      code: ResultCode.Success,
      data,
    };
  } catch (error) {
    return { code: ResultCode.UnknownError, data: [] };
  }
}
