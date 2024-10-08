import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ShoppingCartEvent } from 'src/interfaces/event';
import { CarritoService } from 'src/servicios/carrito/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  localShoppingCart: ShoppingCartEvent[] = [];

  constructor(
    private readonly router: Router,
    private readonly carritoService: CarritoService
  ) { 
    if(localStorage.getItem('shoppingCart') == null){
      localStorage.setItem('shoppingCart',JSON.stringify([]));
    } else{
      this.localShoppingCart = JSON.parse(localStorage.getItem('shoppingCart') ?? '[]');
    }
  }

  ngOnInit(): void {
    this.carritoService.cart.subscribe(cart => {
      if(cart){
        this.localShoppingCart = cart;
      }
    });
  }

  deteleElement(event: any,element: any){
   this.carritoService.deteleElement(event,element);
  }

  goToHome(){
    this.router.navigateByUrl('');
  }

  formatDate(timestamp: string){

    const date = new Date(+timestamp);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  checkAvailability(element: any, event: any){
    this.carritoService.cart.subscribe(cart => {
      if(cart){
        this.localShoppingCart = cart;
      }
    });
    
    let index = this.localShoppingCart.findIndex((e) => e.id == event.id);
    
    let indexSession = this.localShoppingCart[index].sessions.findIndex((e: any) => e.date == element.date);
  
    return this.localShoppingCart[index].sessions[indexSession].availability;
  }

}
