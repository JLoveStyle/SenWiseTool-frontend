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