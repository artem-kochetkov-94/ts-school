import { HashTable, MyMap } from "./index";

// const generateValue = (hashTable: HashTable) => {
//   hashTable.set("щупальце", "lalala");
//   hashTable.set("двор", "lalala");
//   hashTable.set("кариатида", "lalala");
//   hashTable.set("репейник", "lalala");
//   hashTable.set("орхидея", "lalala");

//   hashTable.set("свеча", "lalala");
//   hashTable.set("ковш", "lalala");
//   hashTable.set("блоха", "lalala");
//   hashTable.set("датчик", "lalala");
//   hashTable.set("букашка", "lalala");

//   hashTable.set("закон", "lalala");
//   hashTable.set("погреб", "lalala");
//   hashTable.set("след от укуса", "lalala");
//   hashTable.set("колесница", "lalala");
//   hashTable.set("буковка", "lalala");

//   hashTable.set("канцлер", "lalala");
//   hashTable.set("кадр", "lalala");
//   hashTable.set("акция", "lalala");
//   hashTable.set("гладиолус", "lalala");
//   hashTable.set("знахарь", "lalala");

//   hashTable.set("латы", "lalala");
//   hashTable.set("капкан", "lalala");
//   hashTable.set("комар", "lalala");
//   hashTable.set("бабочка", "lalala");
//   hashTable.set("джин", "lalala");

//   hashTable.set("гирлянда", "lalala");
//   hashTable.set("Калькутта", "lalala");
//   hashTable.set("эскадрон", "lalala");
// };

test("корректно добавляет, изымает данные", () => {
  const hashTable = new MyMap();

  hashTable.set("key", "value");

  expect(hashTable.get("key")).toEqual("value");
});

test("при добавление повторяющего ключа, перезаписывает значение", () => {
  const hashTable = new MyMap();

  hashTable.set("key", "value");
  hashTable.set("key", "value_new");

  hashTable.set("aaaaa0.0585754039730588", "value");
  hashTable.set("aaaaa0.0585754039730588", "value_new");

  expect(hashTable.get("key")).toEqual("value_new");
  expect(hashTable.get("aaaaa0.0585754039730588")).toEqual("value_new");
});

test("удаление", () => {
  // const hashTable = new MyMap();
  // generateValue(hashTable);
});

export {};
