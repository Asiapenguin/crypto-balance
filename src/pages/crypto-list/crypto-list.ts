import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';

import { Crypto } from '../../models/crypto';
import { CryptoService } from '../../providers/crypto/crypto.service';
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
    public navCtrl: NavController,
    public navParams: NavParams,
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
    let cryptoObj = crypto.quotes[this.currency]
    return cryptoObj ? cryptoObj["price"] : null;
  }

  getPercentChange(crypto: Crypto) {
    let cryptoObj = crypto.quotes[this.currency]
    return cryptoObj ? cryptoObj["percent_change_24h"] : null;
  }

  posChange(crypto: Crypto) {
    let cryptoObj = crypto.quotes[this.currency];
    let twentyFourHourChange;
    if (cryptoObj)
    {
      twentyFourHourChange = crypto.quotes[this.currency]["percent_change_24h"].toString();
      return twentyFourHourChange.indexOf('-') < 0;
    }
    return null;
  }
}
