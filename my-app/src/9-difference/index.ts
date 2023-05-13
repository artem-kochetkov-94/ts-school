interface IA {
  a: number;
  b: string;
}

interface IB {
  a: number;
  c: boolean;
}

let a: IA = { a: 5, b: "" };
let b: IB = { a: 10, c: true };

interface IDifferece {
  b: string;
}

function diff<
  T1 extends Record<string, any>,
  T2 extends Record<string, any>,
  K1 extends keyof T1,
  K2 extends keyof T2
>(obj1: T1, obj2: T2): Pick<T1, Exclude<K1, K2>> {
  const resultObject = {} as Pick<T1, Exclude<K1, K2>>;

  for (let key in obj1) {
    if (!obj2[key]) {
      // Help
      // Type 'Extract<keyof T1, string>' cannot be used to index type 'Pick<T1, Exclude<K1, K2>>'
      // @ts-ignore
      resultObject[key] = obj1[key];
    }
  }

  return resultObject;
}

let v0: IDifferece = diff(a, b);

export {};
