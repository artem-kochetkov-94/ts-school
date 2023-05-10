import { RequestBuilder } from "../12-builder";

interface IRroductAPI {
  getProduct(id: number): void;
}

interface IProductDetail {
  id: number;
}

class ProductAPI implements IRroductAPI {
  getProduct(id: number): void {
    const getProductRequest = new RequestBuilder<IProductDetail>()
      .setUrl("https://dummyjson.com/products")
      .setHTTPMethod("get")
      .setParams({
        id,
      })
      .build();

    getProductRequest.excec();
  }
}

class ProductAccessProxy implements IRroductAPI {
  constructor(private api: IRroductAPI, private limit: number) {}

  getProduct(id: number) {
    if (id > this.limit) {
      throw new Error("Error");
    }

    this.api.getProduct(id);
  }
}

const proxy = new ProductAccessProxy(new ProductAPI(), 10);
proxy.getProduct(10);
