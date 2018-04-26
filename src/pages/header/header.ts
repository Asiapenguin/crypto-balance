import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HeaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-header',
  templateUrl: 'header.html',
})
export class HeaderPage {

  @Input() name: string;
  @Output() refreshEvent = new EventEmitter();

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeaderPage');
  }

  clickRefresh() {
    this.refreshEvent.emit();
  }

}
