import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL)

interface CacheSetOptions {
  expire?: boolean | number
}

export class Cache {
  constructor(private redis: Redis.Redis) {}

  async set(
    key: string | string[],
    value: any,
    options: CacheSetOptions = {}
  ): Promise<void> {
    if (key instanceof Array) {
      key = key.join(":")
    }
    console.log("cache set", key)

    value = JSON.stringify(value)

    if (options.expire) {
      if (!(typeof options.expire === "number")) {
        options.expire = 300 // 5 minute
      }

      await this.redis.set(key, value, "EX", options.expire)
    } else {
      await this.redis.set(key, value)
    }
  }

  async get(key: string | string[]): Promise<any> {
    if (key instanceof Array) {
      key = key.join(":")
    }
    console.log("cache get", key)

    const value = await this.redis.get(key)
    return JSON.parse(value)
  }

  async getOrCache<T>(
    key: string | string[],
    creator: () => Promise<T>,
    options: CacheSetOptions = {}
  ): Promise<T> {
    const value = await this.get(key)
    if (value) {
      return value
    }

    const newValue = await creator()
    await this.set(key, newValue, options)
    return newValue
  }
}

export const cache = new Cache(redis)
