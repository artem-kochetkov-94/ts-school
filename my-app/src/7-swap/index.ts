const obj: Record<string, number> = {
  a: 1,
  b: 2,
};

function swapKeysAndValues<T extends string, H extends number>(obj: Record<T, H>): Record<H, T> {
  const reverseObject = {} as { [k in H]: T };

  for (let key in obj) {
    reverseObject[obj[key]] = key;
  }

  return reverseObject;
}

const res = swapKeysAndValues(obj);
console.log(res);

export {};
