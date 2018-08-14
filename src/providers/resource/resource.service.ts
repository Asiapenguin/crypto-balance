import { HttpClient, HttpParams } from '@angular/common/http';
import { Injector } from '@angular/core';

import { DateTime } from '../../../node_modules/ionic-angular/umd';
import { Resource } from '../../models/resource';

export interface ResponseMeta {
  timestamp: DateTime;
  num_cryptocurrencies: number;
  error?: string;
}

export interface ListResponse<T> {
  data?: Array<T>;
  metadata?: ResponseMeta;
}

export class ResourceService {
  url: string;
  http: HttpClient;

  constructor(private injector: Injector, private modelClass: any) {
    this.http = injector.get(HttpClient);
    this.url = 'https://api.coinmarketcap.com/v2' + modelClass.resourcePath;
  }

  list<T extends Resource>(params?: HttpParams): Promise<ListResponse<T>> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/', { params }).subscribe(
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
    return new GetQuery(this.list.bind(this));
  }

  get<T extends Resource>(id: string, params?: HttpParams): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/' + id + '/', { params }).subscribe(
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

class GetQuery<T extends Resource> {
  getHandler: Function;
  resourceId: string;
  limitResult: number;
  sortParam: string;
  supported = [
    'BTC',
    'AUD',
    'BRL',
    'CAD',
    'CHF',
    'CLP',
    'CNY',
    'CZK',
    'DKK',
    'EUR',
    'GBP',
    'HKD',
    'HUF',
    'IDR',
    'ILS',
    'INR',
    'JPY',
    'KRW',
    'MXN',
    'MYR',
    'NOK',
    'NZD',
    'PHP',
    'PKR',
    'PLN',
    'RUB',
    'SEK',
    'SGD',
    'THB',
    'TRY',
    'TWD',
    'ZAR'
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

  getHttpParams(): HttpParams {
    let params = new HttpParams();

    if (this.limitResult) {
      params = params.set('limit', this.limitResult.toString());
    }

    if (this.currency) {
      params = params.set('convert', this.currency);
    }

    if (this.sortParam) {
      params = params.set('sort', this.sortParam);
    }

    return params;
  }

  get(): Promise<T | ListResponse<T>> {
    const params = this.getHttpParams();
    if (this.resourceId) {
      return this.getHandler(this.resourceId, params);
    }
    return this.getHandler(params);
  }
}
