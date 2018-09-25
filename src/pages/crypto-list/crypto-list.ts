import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from 'ionic-angular';

import { Crypto } from '../../models/crypto';
import { CryptoService, Period } from '../../providers/crypto/crypto.service';
import { CurrencyService } from '../../providers/currency/currency.service';
import { ListResponse } from '../../providers/resource/resource.service';
import { CryptoModalPage } from '../crypto-modal/crypto-modal';

@Component({
  selector: 'page-crypto-list',
  templateUrl: 'crypto-list.html'
})
export class CryptoListPage implements OnInit {
  cryptocurrencies: Array<Crypto> = [];
  currency: string;
  title: string;

  constructor(
    private cryptoService: CryptoService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.getCryptocurrencies();
    this.title = 'Cryptocurrencies';
  }

  getCryptocurrencies() {
    this.currency = this.currencyService.getCurrency();
    this.cryptoService
      .findAll()
      .convert(this.currency)
      .get()
      .then(
        (result: ListResponse<Crypto>) => {
          this.cryptocurrencies = result.data;
        }
      );
  }

  refresh() {
    let loading = this.loadingCtrl.create({
      content: 'Refreshing...'
    });
    loading.present();
    this.getCryptocurrencies();
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  showCrypto(crypto: Crypto) {
    let modal = this.modalCtrl.create(CryptoModalPage, crypto);
    modal.present();
  }

  getPrice(crypto: Crypto) {
    return this.cryptoService.getPrice(crypto, this.currency);
  }

  getPercentChange(crypto: Crypto) {
    return this.cryptoService.getPercentChange(crypto, this.currency, Period.daily);
  }

  posChange(crypto: Crypto) {
    return this.cryptoService.posChange(crypto, this.currency, Period.daily);
  }
}
