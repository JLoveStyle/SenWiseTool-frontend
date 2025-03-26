export const isEmptyObject = (object: Object) => {
  return Object.keys(object).length === 0 && object.constructor === Object;
};

export const arrayNumber = (n: number) => {
  const tab: number[] = [];
  for (let i = 1; i <= n; i++) tab.push(i);

  return tab;
};

export const uniqueString = (string?: string): string => {
  const cleanString = string?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // Générer la chaîne unique
  return `${Date.now()}${Math.random()
    .toString(36)
    .substring(2, 15)}${cleanString}`;
};


export const getStorageData = (key: string) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key) || "").toString();
  }
}

// Utility function to sanitize non-serializable values
export function sanitizeObject(obj: any): any {
  return JSON.parse(JSON.stringify(obj, (key, value) => {
    if (value === undefined) {
      return null; // Replace `undefined` with `null`
    }
    if (value instanceof Date) {
      return value.toISOString(); // Convert `Date` to a string
    }
    return value;
  }));
}

export /**
* Retries an asynchronous operation a specified number of times.
* @param operation - The function to retry.
* @param maxRetries - Maximum number of retries.
* @param delayMs - Delay between retries in milliseconds.
* @returns The result of the operation if successful.
* @throws The last error if all retries fail.
*/
  async function retry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await operation();
      return result; // Success, return the result
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed:`, error);

      if (attempt < maxRetries) {
        console.log(`Retrying in ${delayMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  // All retries failed, throw the last error
  throw lastError;
}
