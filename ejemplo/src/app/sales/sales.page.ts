import { Component, OnInit } from '@angular/core';
import {GlobalPage} from "../global/global.page";
import {ProfilePage} from "../profile/profile.page";
import {SubsidiaryPage} from "../subsidiary/subsidiary.page";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

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
  async openSubsidiary() {
    const modal = await this.ModCtrl.create({
      component: SubsidiaryPage,
    });
    await modal.present();
  }
}
