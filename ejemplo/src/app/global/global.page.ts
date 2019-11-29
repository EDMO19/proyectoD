import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, Platform} from '@ionic/angular';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-global',
  templateUrl: './global.page.html',
  styleUrls: ['./global.page.scss'],
})
export class GlobalPage implements OnInit {

  pdfObj = null;
  data: any[];
  ID = '';
  producto = '';
  departamento = '';
  Unidades = '';
  precio = '';

  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener,
              private database: AngularFirestore, private storage: AngularFireStorage, private ModCtrl: ModalController) {
  }

  ngOnInit() {
    this.showdata();
  }

  showdata() {
    this.database.collection('Comida').snapshotChanges().subscribe(data => {
      this.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          comida: e.payload.doc.data()
        };
      });
      for (const comida of this.data) {
        console.log(comida.comida.Url);
        this.storage.ref(comida.comida.Url).getDownloadURL().toPromise().then((url) => {
          comida.comida.Url2 = url;


        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
      for (const cont of this.data) {
        if (cont.comida.Stock < 5) {
          this.ID = this.ID + cont.id + '\n';
          this.producto = this.producto + cont.comida.Nombre;
          this.departamento = this.departamento + 'Comida' + '\n';
          this.Unidades = this.Unidades + cont.comida.Stock + ' -- !!!!PRODUCTO APUNTO DE AGOTARSE!!!!' + '\n';
          this.precio = this.precio + cont.comida.Precio + '\n';
        } else {
          this.ID = this.ID + cont.id + '\n';
          this.producto = this.producto + cont.comida.Nombre + '\n';
          this.departamento = this.departamento + 'Comida' + '\n';
          this.Unidades = this.Unidades + cont.comida.Stock + '\n';
          this.precio = this.precio + cont.comida.Precio + '\n';
        }
      }
    });

    this.database.collection('Electronicos').snapshotChanges().subscribe(data => {
      this.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          electronico: e.payload.doc.data()
        };
      });
      for (const electronico of this.data) {
        console.log(electronico.electronico.Url);
        this.storage.ref(electronico.electronico.Url).getDownloadURL().toPromise().then((url) => {
          electronico.electronico.Url2 = url;


        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
      for (const cont2 of this.data) {
        if (cont2.electronico.Stock < 5) {
          this.ID = this.ID + cont2.id + '\n';
          this.producto = this.producto + cont2.electronico.Nombre + '\n';
          this.departamento = this.departamento + 'Electronicos' + '\n';
          this.Unidades = this.Unidades + cont2.electronico.Stock + ' -- !!!!PRODUCTO APUNTO DE AGOTARSE!!!!' + '\n';
          this.precio = this.precio + 'Precio: ' + cont2.electronico.Precio + '\n';
        } else {
          this.ID = this.ID + cont2.id + '\n';
          this.producto = this.producto + cont2.electronico.Nombre + '\n';
          this.departamento = this.departamento + 'Electronicos' + '\n';
          this.Unidades = this.Unidades + cont2.electronico.Stock + '\n';
          this.precio = this.precio + cont2.electronico.Precio + '\n';
          }
      }
    });

    this.database.collection('Papeleria').snapshotChanges().subscribe(data => {
      this.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          papeleria: e.payload.doc.data()
        };
      });
      for (const papeleria of this.data) {
        console.log(papeleria.papeleria.Url);
        this.storage.ref(papeleria.papeleria.Url).getDownloadURL().toPromise().then((url) => {
          papeleria.papeleria.Url2 = url;


        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
      for (const cont3 of this.data) {
        if (cont3.papeleria.Stock < 5) {
          this.ID = this.ID + cont3.id + '\n';
          this.producto = this.producto + cont3.papeleria.Nombre + '\n';
          this.departamento = this.departamento + 'Papeleria' + '\n';
          this.Unidades = this.Unidades + cont3.papeleria.Stock + ' -- !!!!PRODUCTO APUNTO DE AGOTARSE!!!!' + '\n';
          this.precio = this.precio + 'Precio: ' + cont3.papeleria.Precio + '\n';
        } else {
          this.ID = this.ID + cont3.id + '\n';
          this.producto = this.producto + cont3.papeleria.Nombre + '\n';
          this.departamento = this.departamento + 'Papeleria' + '\n';
          this.Unidades = this.Unidades + cont3.papeleria.Stock + '\n';
          this.precio = this.precio + cont3.papeleria.Precio + '\n';
        }
      }
    });

    this.database.collection('Ropa').snapshotChanges().subscribe(data => {
      this.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          ropa: e.payload.doc.data()
        };
      });
      for (const ropa of this.data) {
        console.log(ropa.ropa.Url);
        this.storage.ref(ropa.ropa.Url).getDownloadURL().toPromise().then((url) => {
          ropa.ropa.Url2 = url;


        }).catch((error) => {
          console.log('khaaaa!!!', error);
        });
      }
      for (const cont4 of this.data) {
        if (cont4.ropa.Stock < 5) {
          this.ID = this.ID + cont4.id + '\n';
          this.producto = this.producto + cont4.ropa.Nombre + '\n';
          this.departamento = this.departamento + 'Ropa' + '\n';
          this.Unidades = this.Unidades + cont4.ropa.Stock + ' -- !!!!PRODUCTO APUNTO DE AGOTARSE!!!!' + '\n';
          this.precio = this.precio + 'Precio: ' + cont4.ropa.Precio + '\n';
        } else {
          this.ID = this.ID + cont4.id + '\n';
          this.producto = this.producto + cont4.ropa.Nombre + '\n';
          this.departamento = this.departamento + 'Ropa' + '\n';
          this.Unidades = this.Unidades + cont4.ropa.Stock + '\n';
          this.precio = this.precio + cont4.ropa.Precio + '\n';
        }
      }
    });

  }

  createPDF() {

    const date = new Date();
    const docDefinition = {
      content: [
        {text: 'Global Report', style: 'header'},
        {text: date.getDate() + '/' + (new Date().getMonth() + 1) + '/' + date.getFullYear(), alignment: 'right'},

        // Aqui van los datos que tenemos que traernos de la BD
        {
          table: {
                body: [
                  ['ID', 'Producto', 'Departamento', 'Unidades en Stock', 'Precio'],
                  [this.ID, this.producto, this.departamento, this.Unidades, this.precio]
                ]
              }
    },
      ],
      styles: {
        header: {
          fontsize: 18,
          bold: true,
        }
      }
    };


    this.pdfObj = pdfMake.createPdf(docDefinition);

    if (this.plt.is('cordova')) {

    } else {
      this.pdfObj.download('Reporte Global_Date: ' + date.getDate() + '-' + (new Date().getMonth() + 1) + '-' + date.getFullYear());
    }
  }
}

