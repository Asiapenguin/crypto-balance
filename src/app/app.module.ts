import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AboutPage } from '../pages/about/about';
import { CryptoListPage } from '../pages/crypto-list/crypto-list';
import { HeaderPage } from '../pages/header/header';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CryptoService } from '../providers/crypto/crypto.service';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    CryptoListPage,
    HeaderPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    CryptoListPage,
    HeaderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CryptoService
  ],
  bootstrap: [IonicApp]
})
export class AppModule {}
