import { Resource } from "../../models/resource";
import { HttpParams, HttpHeaders } from "@angular/common/http";
import { ListResponse } from "./resource.service";

export class GetQuery<T extends Resource> {
  getHandler: Function;
  resourceId: string;
  limitResult: number;
  sortParam: string;
  supported = [
    "BTC",
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

  sort(param: string): GetQuery<T> {
    this.sortParam = param;
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
      params = params.set("convert", this.currency);
    }

    if (this.sortParam) {
      params = params.set("sort", this.sortParam);
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
    const headers = this.getHttpHeaders();
    if (this.resourceId) {
      return this.getHandler(this.resourceId, params, headers);
    }
    return this.getHandler(params, headers);
  }
}
