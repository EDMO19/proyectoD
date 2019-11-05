import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  file: any;
  data: any[];

  constructor(private database: AngularFirestore, private storage: AngularFireStorage) {
  }
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
    });
  }
}