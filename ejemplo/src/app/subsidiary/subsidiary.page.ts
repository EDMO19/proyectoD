import { Component, OnInit } from '@angular/core';
import {GlobalPage} from "../global/global.page";
import {ProfilePage} from "../profile/profile.page";
import {SalesPage} from "../sales/sales.page";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-subsidiary',
  templateUrl: './subsidiary.page.html',
  styleUrls: ['./subsidiary.page.scss'],
})
export class SubsidiaryPage implements OnInit {

  constructor(private ModCtrl: ModalController) { }

  ngOnInit() {
  }
  async openGlobal() {
    const modal = await this.ModCtrl.create({
      component: GlobalPage,
    });
    await modal.present();
  }
  async openProfile() {
    const modal = await this.ModCtrl.create({
      component: ProfilePage,
    });
    await modal.present();
  }
  async openSales() {
    const modal = await this.ModCtrl.create({
      component: SalesPage,
    });
    await modal.present();
  }
}
