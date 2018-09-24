import { Injectable, Injector } from '@angular/core';

import { Crypto } from '../../models/crypto';
import { ResourceService } from '../resource/resource.service';

export enum Period {
  'hourly',
  'weekly',
  'daily'
}

@Injectable()
export class CryptoService extends ResourceService {
  constructor(injector: Injector) {
    super(injector, Crypto);
  }

  getPrice(cryptocurrency: Crypto, currency: string) {
    let cryptoObj = cryptocurrency.quote[currency];
    return cryptoObj ? cryptoObj['price'] : null;
  }

  getPercentChange(cryptocurrency: Crypto, currency: string, period: Period) {
    let cryptoObj = cryptocurrency.quote[currency];
    switch (period) {
      case Period.hourly:
        return cryptoObj ? cryptoObj['percent_change_1h'] : null;
      case Period.daily:
        return cryptoObj ? cryptoObj['percent_change_24h'] : null;
      case Period.weekly:
        return cryptoObj ? cryptoObj['percent_change_7d'] : null;
      default:
        return null;
    }
  }

  posChange(cryptocurrency: Crypto, currency: string, period: Period) {
      let change = this.getPercentChange(cryptocurrency, currency, period).toString();
      if (change) {
        return change.indexOf('-') < 0;
      }
      return null;
  }

  getMarketCap(cryptocurrency: Crypto, currency: string) {
    let cryptoObj = cryptocurrency.quote[currency];
    return cryptoObj ? cryptoObj['market_cap'] : null;
  }

  getVolume(cryptocurrency: Crypto, currency: string) {
    let cryptoObj = cryptocurrency.quote[currency];
    return cryptoObj ? cryptoObj['volume_24h'] : null;
  }
}
