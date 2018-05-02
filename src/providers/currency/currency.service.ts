import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CurrencyService {

  currency: string = 'CAD';
  
  constructor() {
    
  }
}
