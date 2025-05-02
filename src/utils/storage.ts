export const setItemFromLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getItemFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
