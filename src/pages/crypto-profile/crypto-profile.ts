import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-crypto-profile',
  templateUrl: 'crypto-profile.html',
})
export class CryptoProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CryptoProfilePage');
  }

}
