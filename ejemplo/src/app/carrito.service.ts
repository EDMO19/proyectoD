import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Producto} from "./producto/producto.js";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
private subject: BehaviorSubject<Producto[]> = new BehaviorSubject([]);
private itemsCarrito: Producto[] = [];
  constructor() {
    this.subject.subscribe(data => this.itemsCarrito = data);
  }
  addCar(producto: Producto) {
    this.subject.next([...this.itemsCarrito, producto]);
  }
  getCar(): Observable<Producto[]> {
    return this.subject;
  }
  getTotal() {
    return this.itemsCarrito.reduce((total, producto: Producto) => {
      return total + producto.precio;
    }, 0);
  }


}
