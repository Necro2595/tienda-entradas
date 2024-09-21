import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/servicios/carrito/carrito.service';
import { EventoService } from 'src/servicios/evento/evento.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  localShoppingCart: any[] = [];
  event!: any;
  idEvent: number = 0;

  constructor(
    private router: Router,
    private eventoService: EventoService,
    private activatedRoute: ActivatedRoute,
    private carritoService: CarritoService
  ) {
    if(localStorage.getItem('shoppingCart') == null){
      localStorage.setItem('shoppingCart',JSON.stringify([]));
    } else{
      this.localShoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    }
  }

  ngOnInit(): void {
    
    let idRoute: string  = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if(idRoute && idRoute != ''){
      this.idEvent = +idRoute;
      this.eventoService.getEventInfo(this.idEvent).subscribe(data =>{
        this.event = data;
        this.event.sessions.sort((a: any,b: any) => a.date - b.date);
      })
    }

    this.carritoService.cart.subscribe(cart => {
      this.localShoppingCart = cart;
    });
  }

  formatDate(timestamp: string){

    const date = new Date(+timestamp);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  addSession(session: any, event: any){
    /*if(this.localShoppingCart.length != 0){
      let index = this.localShoppingCart.findIndex((e) => e.id == this.idEvent);
      if(index != -1){
        let indexSession = this.localShoppingCart[index].sessions.findIndex((e: any) => e.date == session.date);
        if(indexSession != -1){
          let n = this.localShoppingCart[index].sessions[indexSession].availability + 1;
          this.localShoppingCart[index].sessions[indexSession].availability = n;
          localStorage.setItem('shoppingCart',JSON.stringify(this.localShoppingCart));
        } else {
          let sessionToAdd: any = {
            date: session.date,
            availability: 1
          }
          this.localShoppingCart[index].sessions.push(sessionToAdd);
          localStorage.setItem('shoppingCart',JSON.stringify(this.localShoppingCart));
        }
      } else {
        let eventToAdd: any = {
          id: this.idEvent,
          title: this.event.event.title,
          subtitle: this.event.event.subtitle,
          sessions: [{
            date: session.date,
            availability: 1
          }]
        }
        
        this.localShoppingCart.push(eventToAdd);
        localStorage.setItem('shoppingCart',JSON.stringify(this.localShoppingCart));
      }
    } else {
      let eventToAdd: any = {
        id: this.idEvent,
        title: this.event.event.title,
        subtitle: this.event.event.subtitle,
        sessions: [
          {
            date: session.date,
            availability: 1
          }
        ]
      }
      
      this.localShoppingCart.push(eventToAdd);
      localStorage.setItem('shoppingCart',JSON.stringify(this.localShoppingCart));
    }*/
    this.carritoService.addSession(session,event);
  }

  removeSession(session: any,event:any){
    /*if(this.localShoppingCart.length != 0){
      let index = this.localShoppingCart.findIndex((e) => e.id == this.idEvent);
      if(index != -1){
        let indexSession = this.localShoppingCart[index].sessions.findIndex((e: any) => e.date == session.date);
        if(indexSession != -1){
          let n = this.localShoppingCart[index].sessions[indexSession].availability - 1;
          this.localShoppingCart[index].sessions[indexSession].availability = n;
          localStorage.setItem('shoppingCart',JSON.stringify(this.localShoppingCart));
        }
      } 
    } */
   this.carritoService.removeSession(session,event)
  }

  sessionsAdded(session: any){
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

  sessionsAvailable(session:any){
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
