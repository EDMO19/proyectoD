import { Component, OnInit } from '@angular/core';
import {GlobalPage} from "../global/global.page";
import {SalesPage} from "../sales/sales.page";
import {SubsidiaryPage} from "../subsidiary/subsidiary.page";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private ModCtrl: ModalController) { }

  ngOnInit() {
  }
  async openGlobal() {
    const modal = await this.ModCtrl.create({
      component: GlobalPage,
    });
    await modal.present();
  }
  async openSales() {
    const modal = await this.ModCtrl.create({
      component: SalesPage,
    });
    await modal.present();
  }
  async openSubsidiary() {
    const modal = await this.ModCtrl.create({
      component: SubsidiaryPage,
    });
    await modal.present();
  }

}
