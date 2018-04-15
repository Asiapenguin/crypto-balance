import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CryptoService } from "../../providers/crypto/crypto.service";
import { Crypto } from "../../models/crypto";

@IonicPage()
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
    this.cryptoService
      .findAll()
      .convert("CAD")
      .limit(10)
      .get()
      .then((result) => {
        this.cryptocurrencies = result;
        console.log(this.cryptocurrencies)
      });
  }
}
