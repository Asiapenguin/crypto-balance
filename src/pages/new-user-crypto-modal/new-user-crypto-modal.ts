import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { CryptoService } from '../../providers/crypto/crypto.service';
import { ListResponse } from '../../providers/resource/resource.service';
import { UserCrypto } from '../../models/userCrypto';

@Component({
  selector: 'page-new-user-crypto-modal',
  templateUrl: 'new-user-crypto-modal.html',
})
export class NewUserCryptoModalPage implements OnInit {

  cryptocurrencies: Array<Crypto> = [];
  chosenCryptocurrency: Crypto;
  chosenCurrency: string;
  chosenPrice: number;
  chosenQuantity: number;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, private cryptoService: CryptoService) {
  }

  ngOnInit() {
    this.getCryptocurrencies();
  }

  getCryptocurrencies() {
    this.cryptoService
      .findAll()
      .get()
      .then(
        (result: ListResponse<Crypto>) => {
          this.cryptocurrencies = result.data;
        }
      );
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  allFieldsFilled() {
    return this.chosenCryptocurrency && this.chosenCurrency && this.chosenPrice && this.chosenQuantity;
  }

  addNewUserCrypto() {
    let userCrypto = new UserCrypto();
    userCrypto.buyCurrency = this.chosenCurrency;
    userCrypto.buyPrice = this.chosenPrice;
    userCrypto.buyQuantity = this.chosenQuantity;
    userCrypto.cryptocurrency = this.chosenCryptocurrency;
    
    this.viewCtrl.dismiss(userCrypto);
  }
}
