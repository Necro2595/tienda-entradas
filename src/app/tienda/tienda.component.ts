import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/servicios/carrito/carrito.service';
import { EventoService } from 'src/servicios/evento/evento.service';
import { CarritoComponent } from "../carrito/carrito.component";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Event, EventSessions, ShoppingCartEvent } from 'src/interfaces/event';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CarritoComponent,
    MatIconModule
],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  localShoppingCart: ShoppingCartEvent[] = [];
  event!: Event;
  idEvent: number = 0;

  constructor(
    private readonly router: Router,
    private readonly eventoService: EventoService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly carritoService: CarritoService
  ) {
    if(localStorage.getItem('shoppingCart') == null){
      localStorage.setItem('shoppingCart',JSON.stringify([]));
    } else{
      this.localShoppingCart = JSON.parse(localStorage.getItem('shoppingCart') ?? '[]');
    }
  }

  ngOnInit(): void {
    
    let idRoute: string  = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    if(idRoute && idRoute != ''){
      this.idEvent = +idRoute;
      this.eventoService.getEventInfo(this.idEvent).subscribe(data =>{
        if(data){
          this.event = data;
          this.event.sessions.sort((a: any,b: any) => a.date - b.date);
        }
      })
    }

    this.carritoService.cart.subscribe(cart => {
      if(cart){
        this.localShoppingCart = cart;
      }
    });
  }

  formatDate(timestamp: string){

    const date = new Date(+timestamp);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  addSession(session: EventSessions, event: Event){
    this.carritoService.addSession(session,event);
  }

  removeSession(session: EventSessions,event:Event){
   this.carritoService.removeSession(session,event)
  }

  sessionsAdded(session: string){
    let sessionsAdded: number = 0;

    if(this.localShoppingCart.length != 0){
      this.localShoppingCart.forEach((elementA:any) => {
        if(elementA.id == this.idEvent){
          elementA.sessions.forEach((elementB: any) => {
            if(elementB.date == session){
              sessionsAdded = elementB.availability;
            }
          })
        }
      })
  
      return sessionsAdded;
    } else {
      return sessionsAdded;
    }
  }

  sessionsAvailable(session:string){
    
    this.carritoService.cart.subscribe(cart => {
      if(cart){
        this.localShoppingCart = cart;
      }
    });

    let sessionsAdded: number = 0;
    let sessionsAvailable: number = 0;

    this.event.sessions.forEach((element:any) => {
      if(element.date == session){
        sessionsAvailable = element.availability;
      }
    });
    if(this.localShoppingCart.length != 0){
      this.localShoppingCart.forEach((elementA:any) => {
        if(elementA.id == this.idEvent){
          elementA.sessions.forEach((elementB: any) => {
            if(elementB.date == session){
              sessionsAdded = elementB.availability;
            }
          })
        }
      })
  
      return sessionsAvailable - sessionsAdded;
    } else {
      return sessionsAvailable;
    } 
  }
}
