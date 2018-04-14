import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CryptoService } from '../../providers/crypto/crypto.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(private cryptoService: CryptoService) {
  }

  ngOnInit() {
    this.cryptoService.findById('bitcoin').convert('CAD').get().then(result => console.log(result))
  }
}
