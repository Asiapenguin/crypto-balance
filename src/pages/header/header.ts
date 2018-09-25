import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

import { CurrencyService } from '../../providers/currency/currency.service';

@Component({
  selector: "page-header",
  templateUrl: "header.html"
})
export class HeaderPage implements OnInit {
  @Input() name: string;
  @Output() refresh = new EventEmitter();
  @Output() newUserCrypto = new EventEmitter();

  currency: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.currency = this.currencyService.getCurrency();
  }

  emitRefreshPage() {
    this.refresh.emit();
  }

  emitNewUserCrypto() {
    this.newUserCrypto.emit();
  }

  changeCurrency(currency: string) {
    this.currencyService.setCurrency(currency);
    this.refresh.emit();
  }
}
