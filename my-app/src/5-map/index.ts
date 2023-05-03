// TODO:
// Написать на TypeScript реализацию Map в виде класса. То есть:
// - Класс Map с методами: set, delete, get, clear;
// - Хранить данные в buckets, hash которых расчитывать по какой логике;
// - Если hash одинаков, элементы backet связываются друг с другом;

const CRC32 = require("crc-32");

type Backet = {
  data: string[];
  next?: Backet;
};

export abstract class HashTable {
  abstract set(key: string, value: string): void;
  abstract get(key: string): string | void;
  abstract delete(key: string): void;
  abstract clear(): void;
}

export class MyMap extends HashTable {
  private internal: Array<Backet | undefined> = [];

  public set(this: MyMap, key: string, value: string): void {
    const hash = CRC32.str(key);
    const index = Math.abs(hash) % 10;

    if (!this.internal[index]) {
      this.internal[index] = {
        data: [key, value],
      };

      return;
    }

    // при повторном индексе добавляем элементы в список
    this.setInList(this.internal[index]!, key, value);
  }

  private setInList(
    this: MyMap,
    list: Backet,
    key: string,
    value: string
  ): void {
    // в случае если ключи совпадают - переписываем значение
    if (list.data[0] === key) {
      list.data[1] = value;
      return;
    }

    if (!list.next) {
      list.next = {
        data: [key, value],
      };
      return;
    }

    //@ts-ignore
    this.setInList(list.next, key, value);
  }

  public get(this: MyMap, key: string): string | void {
    const hash = CRC32.str(key);
    const index = Math.abs(hash) % 10;

    if (!this.internal[index]) {
      return;
    }

    return this.findItem(this.internal[index], key);
  }

  private findItem(
    this: MyMap,
    backet: Backet | undefined,
    key: string
  ): string | void {
    if (!backet) {
      return;
    }

    if (backet.data[0] === key) {
      return backet.data[1];
    }

    return this.findItem(backet.next, key);
  }

  public clear(this: MyMap): void {
    this.internal = [];
  }

  public delete(this: MyMap, key: string): void {
    const hash = CRC32.str(key);
    const index = Math.abs(hash) % 10;

    if (!this.internal[index]) {
      return;
    }

    if (this.internal[index]?.data[0] === key && !this.internal[index]?.next) {
      this.internal[index] = undefined;
      return;
    }

    if (this.internal[index]?.data[0] === key && this.internal[index]?.next) {
      this.internal[index] = this.internal[index]?.next;
      return;
    }

    this.deleteItem(this.internal[index]!, this.internal[index]?.next, key);
  }

  private deleteItem(
    this: MyMap,
    parent: Backet,
    backet: Backet | undefined,
    key: string
  ): void {
    if (!backet) {
      return;
    }

    if (backet.data[0] === key && backet.next) {
      parent.next = backet.next;
      return;
    }

    if (backet.data[0] === key && !backet.next) {
      delete parent["next"];
      return;
    }

    return this.deleteItem(backet, backet.next, key);
  }
}

const myMap = new MyMap();
myMap.set("London", "20");
