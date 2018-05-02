import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CurrencyService } from '../../providers/currency/currency.service';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  currency: string = 'cad';
  constructor(public navCtrl: NavController, public navParams: NavParams, private currencyService: CurrencyService) {
  }

  setCurrency(currency: string) {
    console.log('settings currency', currency);
    this.currencyService.currency = currency;
  }
}
