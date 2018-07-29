import { Injectable } from '@angular/core';

@Injectable()
export class CurrencyService {

  currency: string;
  
  constructor() {
    this.currency = 'CAD';
  }

  setCurrency(currency: string) {
    this.currency = currency;
  }

  getCurrency() {
    return this.currency;
  }
}
