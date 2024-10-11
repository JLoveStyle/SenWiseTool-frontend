export const isEmptyObject = (object: Object) => {
  return Object.keys(object).length === 0 && object.constructor === Object;
};

export const arrayNumber = (n: number) => {
  const tab: number[] = [];
  for (let i = 1; i <= n; i++) tab.push(i);

  return tab;
};
