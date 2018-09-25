import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NewUserCryptoModalPage } from '../new-user-crypto-modal/new-user-crypto-modal';
import { UserCrypto } from '../../models/userCrypto';

@Component({
  selector: 'page-crypto-profile',
  templateUrl: 'crypto-profile.html',
})
export class CryptoProfilePage {

  userCryptocurrencies: Array<UserCrypto> = [];

  constructor(public modalCtrl: ModalController) {
  }

  openNewUserCryptoModal() {
    let modal = this.modalCtrl.create(NewUserCryptoModalPage);
    modal.onDidDismiss((data: UserCrypto) => {
      this.userCryptocurrencies.push(data);
    })
    modal.present();
  }
}
