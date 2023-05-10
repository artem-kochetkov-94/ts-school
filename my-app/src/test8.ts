interface IData {
  group: number;
  name: string;
}

const obj: IData[] = [
  { group: 1, name: "a" },
  { group: 1, name: "b" },
  { group: 2, name: "c" },
];

interface IGroup<T> {
  [key: string]: T[];
}

type key = string | number | symbol;

function groupByName<T extends Record<key, any>>(
  arr: T[],
  key: keyof T
): IGroup<T> {
  const result: IGroup<T> = {};

  arr.forEach((item: T) => {
    const _key = item[key];

    if (Array.isArray(result[_key])) {
      result[_key].push(item);
    } else {
      result[_key] = [item];
    }
  });

  return result;
}

groupByName(obj, "group");
groupByName(obj, "name");

export {}
