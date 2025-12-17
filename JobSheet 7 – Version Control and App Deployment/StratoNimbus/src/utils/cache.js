import Redis from 'ioredis';

let redisClient = null;
if (process.env.REDIS_URL) {
  try {
    redisClient = new Redis(process.env.REDIS_URL);
  } catch (e) {
    // best-effort: jika gagal inisialisasi Redis, fallback ke local Map
    redisClient = null;
  }
}

const localMap = new Map();

export async function get(key) {
  if (redisClient) {
    try {
      const raw = await redisClient.get(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      // fallback ke localMap jika Redis gagal
    }
  }

  const entry = localMap.get(key);
  if (!entry) return null;
  if (entry.expiresAt && Date.now() > entry.expiresAt) {
    localMap.delete(key);
    return null;
  }
  return entry.value;
}

export async function set(key, value, ttlSeconds = 600) {
  if (redisClient) {
    try {
      await redisClient.set(key, JSON.stringify(value), 'EX', ttlSeconds);
      return;
    } catch (e) {
      // fallback
    }
  }

  try {
    localMap.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
  } catch (e) {
    // best-effort
  }
}

export async function del(key) {
  if (redisClient) {
    try { await redisClient.del(key); return; } catch (e) { /* ignore */ }
  }
  localMap.delete(key);
}
