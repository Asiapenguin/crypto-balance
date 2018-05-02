import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  ModalController
} from "ionic-angular";
import { CryptoService } from "../../providers/crypto/crypto.service";
import { Crypto } from "../../models/crypto";
import { CryptoModalPage } from "../crypto-modal/crypto-modal";
import { SettingsPage } from "../settings/settings";
import { CurrencyService } from "../../providers/currency/currency.service";

@Component({
  selector: "page-crypto-list",
  templateUrl: "crypto-list.html"
})
export class CryptoListPage {
  cryptocurrencies: Array<Crypto> = [];
  currency: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cryptoService: CryptoService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private currencyService: CurrencyService
  ) {}

  ionViewWillEnter() {
    this.getCryptocurrencies();
  }

  getCryptocurrencies() {
    this.currency = this.currencyService.currency;
    console.log('currency', this.currency);
    this.cryptoService
      .findAll()
      .convert(this.currency)
      .limit(10)
      .get()
      .then((result: Array<Crypto>) => {
        this.cryptocurrencies = result;
      });
  }

  refresh() {
    let loading = this.loadingCtrl.create({
      content: "Refreshing..."
    });
    loading.present();
    setTimeout(() => {
      this.getCryptocurrencies();
      loading.dismiss();
    }, 500);
  }

  showCrypto(crypto: Crypto) {
    let modal = this.modalCtrl.create(CryptoModalPage, crypto);
    modal.present();
  }

  openSettings() {
    this.navCtrl.push(SettingsPage);
  }
}
