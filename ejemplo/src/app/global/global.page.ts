import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, Platform} from '@ionic/angular';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {ProfilePage} from "../profile/profile.page";
import {SalesPage} from "../sales/sales.page";
import {SubsidiaryPage} from "../subsidiary/subsidiary.page";
import {Tab1Page} from "../tab1/tab1.page";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-global',
  templateUrl: './global.page.html',
  styleUrls: ['./global.page.scss'],
})
export class GlobalPage implements OnInit {

  pdfObj = null;
  data: any[];
  contenido = '';

  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener,
              private database: AngularFirestore, private storage: AngularFireStorage, private ModCtrl: ModalController) { }

  ngOnInit() {
    this.showdata();
  }

  showdata(){
    this.database.collection('Productos').snapshotChanges().subscribe(data =>{
      this.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          productos: e.payload.doc.data()
        };
      });
      console.log(this.data);
      for(const producto of this.data){
        console.log(producto.productos.Url);
        this.storage.ref(producto.productos.Url).getDownloadURL().toPromise().then((url) =>{
          producto.productos.Url2 = url;



        }).catch((error)=>{
          console.log('khaaaa!!!', error);
        });
      }
      for(let cont of this.data){
        if(cont.productos.Stock<5){
          this.contenido = this.contenido + 'Producto: ' + cont.productos.Nombre + '  Unidades en Stock: ' + cont.productos.Stock + '       !!!1PRODUCTO APUNTO DE AGOTARSE!!!!' +'\n';
        }else {
          this.contenido = this.contenido +  'Producto: ' + cont.productos.Nombre + '  Unidades en Stock: ' + cont.productos.Stock + '\n';
        }
      }
    });
  }

  createPDF(){

    var date = new Date();
    var docDefinition = {
      content: [
        {text: 'Global Report', style: 'header'},
        {text: date.getDate() + "/" + (new Date().getMonth()+1) + "/" + date.getFullYear(), alignment: 'right'},

        //Aqui van los datos que tenemos que traernos de la BD
        {text: this.contenido}

      ],
      styles: {
        header: {
          fontsize: 18,
          bold: true,
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
  downloadPDF(){
    if(this.plt.is('cordova')){

    }else{
      this.pdfObj.download();
    }
  }



}
