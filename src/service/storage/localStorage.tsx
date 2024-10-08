/**
 * Saves a key-value pair in the localStorage after converting the value to a JSON string.
 * @function save
 * @param {string} key - The key under which to store the value.
 * @param {any} value - The value to be stored. Will be converted to a JSON string.
 * @returns {void}
 */
export function save(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Loads the value stored in localStorage under the specified key and parses it from JSON.
 * @function load
 * @param {string} key - The key used to retrieve the stored value.
 * @returns {any | null} The parsed value if available, or null if not found or parsing fails.
 */
export function load(key: string): unknown | null {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch {
    return null;
  }
}

/**
 * Removes the value stored in localStorage under the specified key.
 * @function remove
 * @param {string} key - The key for which to remove the stored value.
 * @returns {void}
 */
export function remove(key: string): void {
  localStorage.removeItem(key);
}
