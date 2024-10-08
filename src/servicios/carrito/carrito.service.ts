import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event, EventData, EventSessions, ShoppingCartEvent } from 'src/interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private localShoppingCart : ShoppingCartEvent[] = JSON.parse(localStorage.getItem('shoppingCart') ?? '[]');
  private readonly cartSubject = new BehaviorSubject<any[]>(this.localShoppingCart);

  cart = this.cartSubject.asObservable();

  constructor() {
    localStorage.removeItem('shoppingCart');
    this.localShoppingCart = [];
    this.cartSubject.next(this.localShoppingCart);
   }

  getCart(){
    return this.localShoppingCart;
  }

  addSession(session: EventSessions, event: Event){
    if(this.localShoppingCart.length != 0){
      let index = this.localShoppingCart.findIndex((e) => e.id == event.event.id);
      if(index != -1){
        let indexSession = this.localShoppingCart[index].sessions.findIndex((e: EventSessions) => e.date == session.date);
        if(indexSession != -1){
          let n = this.localShoppingCart[index].sessions[indexSession].availability + 1;
          this.localShoppingCart[index].sessions[indexSession].availability = n;
          this.updateCart();
        } else {
          let sessionToAdd: EventSessions = {
            date: session.date,
            availability: 1
          }
          this.localShoppingCart[index].sessions.push(sessionToAdd);
          this.updateCart();
        }
      } else {
        let eventToAdd: ShoppingCartEvent = {
          id: event.event.id,
          title: event.event.title,
          subtitle: event.event.subtitle,
          sessions: [{
            date: session.date,
            availability: 1
          }]
        }
        
        this.localShoppingCart.push(eventToAdd);
        this.updateCart();
      }
    } else {
      let eventToAdd: any = {
        id: event.event.id,
        title: event.event.title,
        subtitle: event.event.subtitle,
        sessions: [
          {
            date: session.date,
            availability: 1
          }
        ]
      }
      
      this.localShoppingCart.push(eventToAdd);
      this.updateCart();
    }
  }

  removeSession(session: EventSessions, event: Event){
    if(this.localShoppingCart.length != 0){
      let index = this.localShoppingCart.findIndex((e) => e.id == event.event.id);
      if(index != -1){
        let indexSession = this.localShoppingCart[index].sessions.findIndex((e: EventSessions) => e.date == session.date);
        if(indexSession != -1){
          let n = this.localShoppingCart[index].sessions[indexSession].availability - 1;
          if(n != 0 ){
            this.localShoppingCart[index].sessions[indexSession].availability = n;
            this.updateCart();
          } else {
            let newList = this.localShoppingCart[index].sessions.filter((e: any,indexB: any) => indexB != indexSession);
            if(newList.length == 0){
              let newFilteredList = this.localShoppingCart.filter((e:any,indexA:any) => index !== indexA);
              this.localShoppingCart = newFilteredList;
              this.updateCart();
            } else {
              this.localShoppingCart[index].sessions = newList;
              this.updateCart();
            }
          }
          
        }
      } 
    } 
  }

  deteleElement(event: EventData,element: any){
      if(this.localShoppingCart.length != 0){
        let index = this.localShoppingCart.findIndex((e) => e.id == event.id);
        if(index != -1){
          let indexSession = this.localShoppingCart[index].sessions.findIndex((e: any) => e.date == element.date);
          if(indexSession != -1){
            let n = this.localShoppingCart[index].sessions[indexSession].availability - 1;
            if(n != 0 ){
              this.localShoppingCart[index].sessions[indexSession].availability = n;
              this.updateCart();
            } else {
              let newList = this.localShoppingCart[index].sessions.filter((e: any,indexB: any) => indexB != indexSession);
              if(newList.length == 0){
                let newFilteredList = this.localShoppingCart.filter((e:any,indexA:any) => index !== indexA);
                this.localShoppingCart = newFilteredList;
                this.updateCart();
              } else {
                this.localShoppingCart[index].sessions = newList;
                this.updateCart();
              }
            }
            
          }
        } 
      } 
  }

  updateCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.localShoppingCart));
    this.cartSubject.next(this.localShoppingCart);
  }
}
