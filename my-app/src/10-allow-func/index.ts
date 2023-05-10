class User {
  @AllowFunc((a: number) => a > 0)
  age: number = 30;
}

function AllowFunc<T extends (...args: any[]) => any>(fn: T) {
  return (target: Object, propertyKey: string | symbol) => {
    let value: unknown;

    const setter = function (newValue: unknown) {
      if (fn(newValue)) {
        value = newValue;
      }
    };

    const getter = function () {
      return value;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}

const person = new User();
console.log(person.age);
person.age = 0;
console.log(person.age);
person.age = 20;
console.log(person.age);

export {};
