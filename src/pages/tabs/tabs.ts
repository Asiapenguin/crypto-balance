import { Component } from '@angular/core';
import { CryptoListPage } from '../crypto-list/crypto-list';
import { SettingsPage } from '../settings/settings';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  cryptoList = CryptoListPage;
  profile = ProfilePage;
  settings = SettingsPage;

  constructor() {

  }
}
