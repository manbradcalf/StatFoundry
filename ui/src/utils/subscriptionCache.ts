/**
 * Simple in-memory cache for subscription status to reduce Stripe API calls
 */

interface CacheEntry {
  data: any;
  timestamp: number;
  expiresAt: number;
}

class SubscriptionCache {
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  get(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  set(key: string, data: any): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + this.CACHE_TTL,
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean up expired entries periodically
  cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

// Create a singleton instance
export const subscriptionCache = new SubscriptionCache();

// Set up periodic cleanup every 10 minutes
setInterval(() => {
  subscriptionCache.cleanup();
}, 10 * 60 * 1000);