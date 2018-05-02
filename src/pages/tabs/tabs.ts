import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { CryptoListPage } from '../crypto-list/crypto-list';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  cryptoList = CryptoListPage;
  profile = AboutPage;
  settings = SettingsPage;

  constructor() {

  }
}
