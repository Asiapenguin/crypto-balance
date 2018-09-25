import { Component } from '@angular/core';

import { CryptoListPage } from '../crypto-list/crypto-list';
import { CryptoProfilePage } from '../crypto-profile/crypto-profile';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  cryptoList = CryptoListPage;
  cryptoProfile = CryptoProfilePage;

  constructor() {

  }
}
