interface IUser {
  name: string;
  age: number;
  skills: string[];
}

const user: IUser = {
  name: "Vasiliy",
  age: 8,
  skills: ["typescript", "javascripts"],
};

function pickObjectKeys<T, K extends keyof T>(
  obj: T,
  keys: K[]
): { [P in K]: T[P] } {
  const resultObj = {} as { [P in K]: T[P] };

  keys.forEach((key) => {
    resultObj[key] = obj[key];
  });

  return resultObj;
}

const res = pickObjectKeys(user, ["age", "skills"]);

export {}
