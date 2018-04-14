import { Injector, Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Resource } from "../../models/resource";
import { Currency } from "../../models/currency";

export interface ListResponse<T> {
  data?: Array<T>;
}

export class ResourceService {
  url: string;
  http: HttpClient;

  constructor(private injector: Injector, private modelClass: any) {
    this.http = injector.get(HttpClient);
    this.url = "https://api.coinmarketcap.com/v1" + modelClass.resourcePath;
  }

  list<T extends Resource>(
    params?: HttpParams,
    headers?: HttpHeaders
  ): Promise<ListResponse<T>> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url, { params }).subscribe(
        (cryptoArray: ListResponse<T>) => {
          this.generateListResponse(cryptoArray);
          resolve();
        },
        err => {
          reject(err);
        }
      );
    });
  }

  findAll<T extends Resource>(): GetQuery<T> {
    return new GetQuery(this.list.bind(this));
  }

  get<T extends Resource>(
    id: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "/" + id, { params }).subscribe(
        (data: T) => {
          const item = new this.modelClass();
          Object.assign(item, data);
          resolve(item);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  findById<T extends Resource>(id: string): GetQuery<T> {
    return new GetQuery<T>(this.get.bind(this)).id(id);
  }

  private generateListResponse(result) {
    console.log("result", result);
  }
}

class GetQuery<T extends Resource> {
  getHandler: Function;
  resourceId: string;
  limitResult: number;
  supported = [
    "AUD",
    "BRL",
    "CAD",
    "CHF",
    "CLP",
    "CNY",
    "CZK",
    "DKK",
    "EUR",
    "GBP",
    "HKD",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "JPY",
    "KRW",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PHP",
    "PKR",
    "PLN",
    "RUB",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "TWD",
    "ZAR"
  ];
  currency: string;
  headers: { [key: string]: string | string[] } = {};

  constructor(getHandler: Function) {
    this.getHandler = getHandler;
  }

  id(id: string): GetQuery<T> {
    this.resourceId = id;
    return this;
  }

  limit(limitResult: number): GetQuery<T> {
    this.limitResult = limitResult;
    return this;
  }

  convert(currency: string): GetQuery<T> {
    if (this.supported.indexOf(currency) > -1) {
      this.currency = currency;
    }
    return this;
  }

  header(key: string, value: string | string[]): GetQuery<T> {
    this.headers[key] = value;
    return this;
  }

  getHttpParams(): HttpParams {
    let params = new HttpParams();

    if (this.limitResult) {
      params = params.set("limit", this.limitResult.toString());
    }

    if (this.currency) {
      params = params.set("convert", this.currency.currency);
    }

    return params;
  }

  getHttpHeaders(): HttpHeaders {
    const headers = this.headers;
    const keys = Object.keys(headers);
    if (keys.length) {
      let httpHeaders = new HttpHeaders();
      for (const key of keys) {
        httpHeaders = httpHeaders.set(key, headers[key].toString());
      }
      return httpHeaders;
    }
    return null;
  }

  get(): Promise<T | ListResponse<T>> {
    const params = this.getHttpParams();
    if (this.resourceId) {
      return this.getHandler(this.resourceId, params);
    }
    return this.getHandler(params);
  }
}
