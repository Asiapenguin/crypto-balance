import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NavController, NavParams, PopoverController } from "ionic-angular";

@Component({
  selector: "page-header",
  templateUrl: "header.html"
})
export class HeaderPage {
  @Input() name: string;
  @Output() refresh = new EventEmitter();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController
  ) {}

  clickRefresh() {
    this.refresh.emit();
  }
}
