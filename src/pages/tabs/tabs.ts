import { Component } from '@angular/core';

import { CryptoListPage } from '../crypto-list/crypto-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  cryptoList = CryptoListPage;

  constructor() {

  }
}
