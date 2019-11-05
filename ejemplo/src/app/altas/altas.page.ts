import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable, pipe} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-altas',
  templateUrl: './altas.page.html',
  styleUrls: ['./altas.page.scss'],
})
export class AltasPage {
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  producto;
  file: any;
  data : any[];

  constructor(private database: AngularFirestore, private storage: AngularFireStorage) { }

  altaProducto() {
    const randomId = Math.random().toString(36).substring(2, 9);
    const filepath = `images/${randomId}`;
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, this.file);
    this.uploadProgress = task.percentageChanges();
    task.snapshotChanges().pipe(
        finalize(() => this.uploadURL = fileRef.getDownloadURL())
    ).subscribe();
    const name = (document.getElementById('nombre') as HTMLIonInputElement).value;
    const price = parseInt((document.getElementById('precio') as HTMLIonInputElement).value);
    const stock = parseInt((document.getElementById('stock') as HTMLIonInputElement).value);
    this.producto ={Nombre: name,Precio: price,Url: filepath, Stock: stock};
    this.database.collection('Productos').add(this.producto);
  }
    showimg(event){

    this.file = event.target.files[0];

    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
      const dataURL = reader.result;
      const img = (document.getElementById('output') as HTMLImageElement);
      if(typeof dataURL === 'string'){
        img.src = dataURL;
      }
    };
    reader.readAsDataURL(input.files[0]);
  }

}
