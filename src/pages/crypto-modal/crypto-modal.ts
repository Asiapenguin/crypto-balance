import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Crypto } from '../../models/crypto';
import { CryptoService, Period } from '../../providers/crypto/crypto.service';
import { CurrencyService } from '../../providers/currency/currency.service';

@Component({
  selector: 'page-crypto-modal',
  templateUrl: 'crypto-modal.html'
})
export class CryptoModalPage {
  cryptocurrency: Crypto;
  currency: string;
  period = Period;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public currencyService: CurrencyService,
    public cryptoService: CryptoService
  ) {
    this.cryptocurrency = navParams.data;
    this.currency = this.currencyService.getCurrency();
    console.log('crypto modal', this.cryptocurrency);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  getPrice(crypto: Crypto) {
    return this.cryptoService.getPrice(crypto, this.currency);
  }

  getPercentChange(crypto: Crypto, period: Period) {
    return this.cryptoService.getPercentChange(crypto, this.currency, period);
  }

  posChange(crypto: Crypto, period: Period) {
    return this.cryptoService.getPercentChange(crypto, this.currency, period);
  }

  getMarketCap(crypto: Crypto) {
    return this.cryptoService.getMarketCap(crypto, this.currency);
  }

  getVolume(crypto: Crypto) {
    return this.cryptoService.getVolume(crypto, this.currency);
  }
}
