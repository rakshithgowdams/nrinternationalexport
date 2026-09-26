type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const };
  }
  if (current.count >= limit) return { ok: false as const };
  current.count += 1;
  return { ok: true as const };
}

const accepted = new Map<string, number>();

export function alreadyAccepted(key: string) {
  const at = accepted.get(key);
  if (!at) return false;
  if (Date.now() - at > 30 * 60 * 1000) {
    accepted.delete(key);
    return false;
  }
  return true;
}

export function markAccepted(key: string) {
  accepted.set(key, Date.now());
}
