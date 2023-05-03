class Product {
  constructor(
    public id: number,
    public price: number,
    public productName: string
  ) {}
}

class Delivery {
  constructor(public data: Date) {}
}

class DeliveryStore extends Delivery {
  constructor(id: number) {
    super(new Date());
  }
}

class DeliveryHome extends Delivery {
  constructor(public data: Date, public address: string) {
    super(data);
  }
}

type DeliveryType = DeliveryStore | DeliveryHome;

export class Cart {
  private products: Product[] = [];
  private delivery: DeliveryType;

  addProduct(product: Product): void {
    this.products.push(product);
  }

  removeProduct(id: number): void {
    const indexOf = this.products.findIndex((product) => product.id === id);

    if (indexOf < 0) {
      return;
    }

    this.products = [
      ...this.products.slice(0, indexOf),
      ...this.products.slice(indexOf + 1),
    ];
  }

  getFullPrice() {
    return this.products.reduce((a, b) => a + b.price, 0);
  }

  checkout(): boolean {
    if (this.products.length || !this.delivery) {
      return true;
    }

    return false;
  }

  setDelivery(deliveryType: DeliveryType) {
    this.delivery = deliveryType;
  }
}

const product1 = new Product(1, 10, "1");
const product2 = new Product(2, 10, "2");
const product3 = new Product(3, 10, "3");
const product4 = new Product(4, 10, "4");
const product5 = new Product(5, 10, "5");

const cart = new Cart();
cart.setDelivery(new DeliveryStore(1));
cart.addProduct(product1);
cart.addProduct(product2);
cart.addProduct(product3);
cart.addProduct(product4);
cart.addProduct(product5);

cart.removeProduct(1);
cart.removeProduct(2);

console.log("checkout", cart.checkout());
