import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {AlertController, ModalController} from "@ionic/angular";
import {GlobalPage} from "../global/global.page";
import {ProfilePage} from "../profile/profile.page";
import {SalesPage} from "../sales/sales.page";
import {SubsidiaryPage} from "../subsidiary/subsidiary.page";

@Component({
  selector: 'app-bajas',
  templateUrl: './bajas.page.html',
  styleUrls: ['./bajas.page.scss'],
})
export class BajasPage implements OnInit {
  comida: any[];
  ropa: any[];
  electric: any[];
  pape: any[];

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private AlertCtrl: AlertController,
              private ModCtrl: ModalController) { }

  ngOnInit() {
    this.showComida();
    this.showElectric();
    this.showPape();
    this.showRopa();
  }
  showComida() {
    this.db.collection('Comida').snapshotChanges().subscribe(data => {
      this.comida = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });
      console.log(this.comida);
      for (const producto of this.comida) {
        console.log(producto.productos.Url);
        this.storage.ref(producto.productos.Url).getDownloadURL().toPromise().then((url) => {
          producto.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }
  showRopa() {
    this.db.collection('Ropa').snapshotChanges().subscribe(data => {
      this.ropa = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });
      console.log(this.ropa);
      for (const producto of this.ropa) {
        console.log(producto.productos.Url);
        this.storage.ref(producto.productos.Url).getDownloadURL().toPromise().then((url) => {
          producto.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }
  showElectric() {
    this.db.collection('Electronicos').snapshotChanges().subscribe(data => {
      this.electric = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });
      console.log(this.electric);
      for (const producto of this.electric) {
        console.log(producto.productos.Url);
        this.storage.ref(producto.productos.Url).getDownloadURL().toPromise().then((url) => {
          producto.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }
  showPape() {
    this.db.collection('Papeleria').snapshotChanges().subscribe(data => {
      this.pape = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });
      console.log(this.pape);
      for (const pape of this.pape) {
        console.log(pape.productos.Url);
        this.storage.ref(pape.productos.Url).getDownloadURL().toPromise().then((url) => {
          pape.productos.Url2 = url;
        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
    });
  }
  async delelecliente1(id, url) {
    const alert = await this.AlertCtrl.create({
      message: '¿Esta seguro de eliminar el producto?',
      buttons: [
        {text: 'Cancelar',
          role: 'Cancel',
          handler: blah => {
            console.log('confirm cancel: blah');
          }},
        {text: 'Confirmar',
          handler: () => {
            console.log(url);
            this.db.collection('Comida').doc(id).delete();
            this.storage.ref(url).delete();
          }}
      ],
    });
    return alert.present();
  }
  async delelecliente2(id, url) {
    const alert = await this.AlertCtrl.create({
      message: '¿Esta seguro de eliminar el producto?',
      buttons: [
        {text: 'Cancelar',
          role: 'Cancel',
          handler: blah => {
            console.log('confirm cancel: blah');
          }},
        {text: 'Confirmar',
          handler: () => {
            console.log(url);
            this.db.collection('Ropa').doc(id).delete();
            this.storage.ref(url).delete();
          }}
      ],
    });
    return alert.present();
  }
  async delelecliente3(id, url) {
    const alert = await this.AlertCtrl.create({
      message: '¿Esta seguro de eliminar el producto?',
      buttons: [
        {text: 'Cancelar',
          role: 'Cancel',
          handler: blah => {
            console.log('confirm cancel: blah');
          }},
        {text: 'Confirmar',
          handler: () => {
            console.log(url);
            this.db.collection('Papeleria').doc(id).delete();
            this.storage.ref(url).delete();
          }}
      ],
    });
    return alert.present();
  }
  async delelecliente4(id, url) {
    const alert = await this.AlertCtrl.create({
      message: '¿Esta seguro de eliminar el producto?',
      buttons: [
        {text: 'Cancelar',
          role: 'Cancel',
          handler: blah => {
            console.log('confirm cancel: blah');
          }},
        {text: 'Confirmar',
          handler: () => {
            console.log(url);
            this.db.collection('Electronicos').doc(id).delete();
            this.storage.ref(url).delete();
          }}
      ],
    });
    return alert.present();
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
  async openSubsidiary() {
    const modal = await this.ModCtrl.create({
      component: SubsidiaryPage,
    });
    await modal.present();
  }

}
