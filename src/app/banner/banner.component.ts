import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ShoppingCartEvent } from 'src/interfaces/event';
import { CarritoService } from 'src/servicios/carrito/carrito.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  localShoppingCart: ShoppingCartEvent[] = [];

  constructor(
    private readonly router: Router,
    private readonly carritoService: CarritoService
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