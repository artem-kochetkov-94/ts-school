import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HTTPRequestStatus, IUserResponse } from "../4-dummy-api/types";

class RequestBuilder<T> {
  private requestConfig: AxiosRequestConfig<any> = {};

  public build(): RequestBuilder<T> {
    return this;
  }

  public exec(): Promise<AxiosResponse<T, any>> {
    return axios<T, AxiosResponse<T, any>, any>(this.requestConfig);
  }

  public setUrl(url: AxiosRequestConfig["url"]): RequestBuilder<T> {
    this.requestConfig.url = url;
    return this;
  }

  public setHTTPMethod(
    HTTPMethod: AxiosRequestConfig["method"]
  ): RequestBuilder<T> {
    this.requestConfig.method = HTTPMethod;
    return this;
  }

  public setBody(data: AxiosRequestConfig["data"]): RequestBuilder<T> {
    this.requestConfig.data = data;
    return this;
  }

  public setParams(params: AxiosRequestConfig["params"]): RequestBuilder<T> {
    this.requestConfig.params = params;
    return this;
  }

  public setHeaders(headers: AxiosRequestConfig["headers"]): RequestBuilder<T> {
    this.requestConfig.headers = headers;
    return this;
  }
}

const getUsersRequest = new RequestBuilder<IUserResponse>()
  .setUrl("https://dummyjson.com/users")
  .setHTTPMethod("get")
  .build();

async function getUsers() {
  try {
    const response = await getUsersRequest.exec();

    if (response.status !== HTTPRequestStatus.OK) {
      throw new Error("Failed request");
    }

    console.log(response.data);
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      console.log("Network error: ", error.message);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

getUsers();

export { RequestBuilder };
