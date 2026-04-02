/**
 * get local storage item and return parsed object or array
 *
 * @param name
 * @returns {T | undefined}
 */
export function getStorage<T = unknown>(name: string): T | undefined {
  try {
    const item = localStorage.getItem(name);
    if (item) {
      return JSON.parse(item) as T;
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * set variable to storage easily without thinking of stringifying it
 *
 * @param {string} name
 * @param data
 */
export function setStorage<T>(name: string, data: T): void {
  try {
    const dataString = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(name, dataString);
  } catch (e) {
    console.error(e);
  }
}

/**
 * remove item from local storage
 *
 * @param {string} name
 */
export function removeStorage(name: string): void {
  localStorage.removeItem(name);
}
