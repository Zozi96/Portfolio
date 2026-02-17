/**
 * Storage Repository Interface
 * Defines the contract for storage implementations
 */
export interface IStorageRepository {
  /**
   * Get an item from storage
   */
  getItem<T = string>(key: string): T | null;

  /**
   * Set an item in storage
   */
  setItem<T = string>(key: string, value: T): void;

  /**
   * Remove an item from storage
   */
  removeItem(key: string): void;

  /**
   * Clear all items from storage
   */
  clear(): void;

  /**
   * Get all keys in storage
   */
  getAllKeys(): string[];

  /**
   * Check if a key exists in storage
   */
  hasItem(key: string): boolean;
}
