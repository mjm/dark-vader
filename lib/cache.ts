import Redis from "ioredis"

console.log("creating redis client")
const redis = new Redis(process.env.REDIS_URL)

type KeyType = string | string[]

interface CacheSetOptions {
  expire?: boolean | number
  extraKeys?: KeyType[]
}

type CacheGetOrCacheOptions<T> = Omit<CacheSetOptions, "extraKeys"> & {
  extraKeys?: (value: T) => KeyType[]
}

export class Cache {
  constructor(private redis: Redis.Redis) {}

  async set(
    key: KeyType,
    value: any,
    options: CacheSetOptions = {}
  ): Promise<void> {
    key = normalizeKey(key)
    console.log("cache set", key)

    value = JSON.stringify(value)

    options.extraKeys = options.extraKeys || []
    if (options.expire) {
      if (!(typeof options.expire === "number")) {
        options.expire = 900 // 15 minute
      }

      await this.redis.set(key, value, "EX", options.expire)
      for (const extraKey of options.extraKeys) {
        await this.redis.set(
          normalizeKey(extraKey),
          value,
          "EX",
          options.expire
        )
      }
    } else {
      await this.redis.set(key, value)
      for (const extraKey of options.extraKeys) {
        await this.redis.set(normalizeKey(extraKey), value)
      }
    }
  }

  async get(key: KeyType): Promise<any> {
    key = normalizeKey(key)
    console.log("cache get", key)

    const value = await this.redis.get(key)
    return JSON.parse(value)
  }

  async refresh(key: KeyType, options: CacheSetOptions = {}): Promise<void> {
    if (!options.expire) {
      return
    }

    key = normalizeKey(key)
    console.log("cache refresh", key)

    if (!(typeof options.expire === "number")) {
      options.expire = 900 // 15 minute
    }

    await this.redis.expire(key, options.expire)
    for (const extraKey of options.extraKeys) {
      await this.redis.expire(normalizeKey(extraKey), options.expire)
    }
  }

  async getOrCache<T>(
    key: KeyType,
    creator: () => Promise<T>,
    options: CacheGetOrCacheOptions<T> = {}
  ): Promise<T> {
    const value = await this.get(key)
    if (value) {
      const extraKeys = options.extraKeys ? options.extraKeys(value) : []
      await this.refresh(key, { ...options, extraKeys })
      return value
    }

    const newValue = await creator()
    const extraKeys = options.extraKeys ? options.extraKeys(newValue) : []
    await this.set(key, newValue, { ...options, extraKeys })
    return newValue
  }
}

export const cache = new Cache(redis)

function normalizeKey(key: KeyType): string {
  if (key instanceof Array) {
    return key.join(":")
  }

  return key
}
