import { Component, OnInit } from '@angular/core';
import {CarritoService} from "../carrito.service";
import {Producto} from "../producto/producto.js";

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
private carrito: Array<Producto> = [];
private total: number;
  constructor(private carser: CarritoService) { }

  ngOnInit() {
    this.carser.getCar().subscribe(data => {
      console.log(data);
      this.carrito = data;
      this.total = this.carser.getTotal();
    }, error => alert(error));
  }

}
