import type { IStorageRepository } from './storage.repository.interface';

/**
 * Local Storage Repository Implementation
 * Provides type-safe access to browser's localStorage
 */
export class LocalStorageRepository implements IStorageRepository {
  private prefix: string;

  constructor(prefix = 'app_') {
    this.prefix = prefix;
  }

  /**
   * Get prefixed key
   */
  private getPrefixedKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  /**
   * Get an item from localStorage
   * Note: Callers must ensure type safety - stored data should match type T
   */
  getItem<T = string>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getPrefixedKey(key));
      if (item === null) return null;

      // Try to parse JSON, otherwise return as string
      try {
        return JSON.parse(item) as T;
      } catch {
        // If parsing fails, return as string (cast to T)
        return item as T;
      }
    } catch (error) {
      console.error(`Error getting item "${key}":`, error);
      return null;
    }
  }

  /**
   * Set an item in localStorage
   */
  setItem<T = string>(key: string, value: T): void {
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(this.getPrefixedKey(key), serialized);
    } catch (error) {
      console.error(`Error setting item "${key}":`, error);
    }
  }

  /**
   * Remove an item from localStorage
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(this.getPrefixedKey(key));
    } catch (error) {
      console.error(`Error removing item "${key}":`, error);
    }
  }

  /**
   * Clear all items with the prefix
   */
  clear(): void {
    try {
      const keys = this.getAllKeys();
      keys.forEach((key) => this.removeItem(key));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  /**
   * Get all keys (without prefix)
   */
  getAllKeys(): string[] {
    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keys.push(key.substring(this.prefix.length));
        }
      }
      return keys;
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }

  /**
   * Check if a key exists
   */
  hasItem(key: string): boolean {
    try {
      return localStorage.getItem(this.getPrefixedKey(key)) !== null;
    } catch (error) {
      console.error(`Error checking item "${key}":`, error);
      return false;
    }
  }
}
