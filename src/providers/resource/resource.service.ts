import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injector } from "@angular/core";

import { DateTime } from "../../../node_modules/ionic-angular/umd";
import { Resource } from "../../models/resource";
import { GetQuery } from "./resource-queries.service";

export interface ResponseStatus {
  timestamp: DateTime;
  error_code: number;
  error_message: string | null;
  elapsed: number;
  credit_count: number;
}

export interface ListResponse<T> {
  data: Array<T>;
  status: ResponseStatus;
}

export class ResourceService {
  url: string;
  http: HttpClient;

  constructor(private injector: Injector, private modelClass: any) {
    this.http = injector.get(HttpClient);
    // this.url = 'https://api.coinmarketcap.com/v2' + modelClass.resourcePath;
    this.url = "https://pro-api.coinmarketcap.com/v1" + modelClass.resourcePath;
  }

  list<T extends Resource>(
    params?: HttpParams,
    headers?: HttpHeaders
  ): Promise<ListResponse<T>> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "/listings/latest", { params, headers }).subscribe(
        (result: ListResponse<T>) => {
          resolve(this.generateCryptoArray(result));
        },
        err => {
          reject(err);
        }
      );
    });
  }

  findAll<T extends Resource>(): GetQuery<T> {
    return new GetQuery<T>(this.list.bind(this));
  }

  get<T extends Resource>(
    id: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "/quotes/latest" + id, { params, headers }).subscribe(
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

  private generateCryptoArray<T extends Resource>(result): ListResponse<T> {
    if (result.data) {
      const items: Array<T> = [];
      const keys = Object.keys(result.data);
      for (let key of keys) {
        const item = new this.modelClass();
        Object.assign(item, result.data[key]);
        items.push(item);
      }
      result.data = items;
    }
    return result;
  }
}