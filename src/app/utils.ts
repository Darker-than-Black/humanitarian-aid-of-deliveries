// 2022-03-17 => 17.03.2022
export const formatDate = (dateStr: string): string => dateStr.split('-').reverse().join('.');

export const lastElOfArray = <T>(array: T[]): T => {
  const DELTA = 1;
  return array[array.length - DELTA];
};

// if id <= 10 000 => 10 000
// if id >= 10 000 => id + 1
export const createNumIdOfListItem = (idStr: string) => {
  const MAX_ITEM_DEFAULT_ID = 10000;
  let id = Number(idStr);
  return id < MAX_ITEM_DEFAULT_ID ? MAX_ITEM_DEFAULT_ID : ++id;
};
