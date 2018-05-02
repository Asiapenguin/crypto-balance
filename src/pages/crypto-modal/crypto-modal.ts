import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-crypto-modal',
  templateUrl: 'crypto-modal.html',
})
export class CryptoModalPage {
  crypto: Crypto;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.crypto = navParams.data;
    console.log('crypto modal', this.crypto);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
