import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { CryptoListPage } from '../pages/crypto-list/crypto-list';
import { CryptoModalPage } from '../pages/crypto-modal/crypto-modal';
import { HeaderPage } from '../pages/header/header';
import { TabsPage } from '../pages/tabs/tabs';
import { CryptoService } from '../providers/crypto/crypto.service';
import { CurrencyService } from '../providers/currency/currency.service';
import { MyApp } from './app.component';
import { ApiKeyInterceptor } from '../interceptors/api-key.interceptor';
import { CryptoProfilePage } from '../pages/crypto-profile/crypto-profile';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    CryptoListPage,
    HeaderPage,
    CryptoModalPage,
    CryptoProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  entryComponents: [
    MyApp,
    TabsPage,
    CryptoListPage,
    HeaderPage,
    CryptoModalPage,
    CryptoProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CryptoService,
    CurrencyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    }
  ],
  bootstrap: [IonicApp]
})
export class AppModule {}
