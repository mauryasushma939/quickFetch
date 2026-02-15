interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private storage: Map<string, RateLimitEntry>;
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.storage = new Map();
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    
    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  check(identifier: string): { allowed: boolean; remaining: number; reset: number } {
    const now = Date.now();
    const entry = this.storage.get(identifier);

    if (!entry || now > entry.resetTime) {
      // Create new entry
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      this.storage.set(identifier, newEntry);
      
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        reset: newEntry.resetTime,
      };
    }

    if (entry.count >= this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        reset: entry.resetTime,
      };
    }

    entry.count++;
    this.storage.set(identifier, entry);

    return {
      allowed: true,
      remaining: this.maxRequests - entry.count,
      reset: entry.resetTime,
    };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.storage.entries()) {
      if (now > entry.resetTime) {
        this.storage.delete(key);
      }
    }
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter(
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10'),
  parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000')
);

export function getClientIdentifier(request: Request): string {
  // In production, use proper IP extraction with proxy headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  return forwarded?.split(',')[0] || realIp || 'unknown';
}
