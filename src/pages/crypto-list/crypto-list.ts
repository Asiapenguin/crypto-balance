import { Component, OnInit, Input } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CryptoService } from "../../providers/crypto/crypto.service";
import { Crypto } from "../../models/crypto";

@Component({
  selector: "page-crypto-list",
  templateUrl: "crypto-list.html"
})
export class CryptoListPage implements OnInit {
  cryptocurrencies: Array<Crypto> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cryptoService: CryptoService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad CryptoListPage");
  }

  ngOnInit() {
    this.getCryptocurrencies();
  }

  getCryptocurrencies() {
    this.cryptoService
      .findAll()
      .convert("CAD")
      .limit(10)
      .get()
      .then((result: Array<Crypto>) => {
        this.cryptocurrencies = result;
        console.log(this.cryptocurrencies);
      });
  }

  refresh() {
    this.getCryptocurrencies();
    setTimeout(() => {
      
    }, 10000);
  }
}
