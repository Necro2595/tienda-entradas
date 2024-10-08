import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/servicios/carrito/carrito.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  localShoppingCart: any[] = [];

  constructor(
    private router: Router,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.carritoService.cart.subscribe(cart => {
      this.localShoppingCart = cart;
    });
  }

  goToCart(){
    this.router.navigateByUrl('/carrito');
  }

  goToHome(){
    this.router.navigateByUrl('');
  }

  checkCart(){
    let count = 0;
    if(this.localShoppingCart.length != 0){
      this.localShoppingCart.forEach((e) => {
        count = count + e.sessions.length;
      })
      return count;
    } else{
      return count;
    }
  }
}