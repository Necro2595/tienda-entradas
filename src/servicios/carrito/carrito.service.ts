import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private localShoppingCart : any[] = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
  private cartSubject = new BehaviorSubject<any[]>(this.localShoppingCart);

  cart = this.cartSubject.asObservable();

  constructor() { }

  getCart(){
    return this.localShoppingCart;
  }

  addSession(session: any, event: any){
    if(this.localShoppingCart.length != 0){
      let index = this.localShoppingCart.findIndex((e) => e.id == event.event.id);
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
          id: event.event.id,
          title: event.event.title,
          subtitle: event.event.subtitle,
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
      localStorage.setItem('shoppingCart',JSON.stringify(this.localShoppingCart));
    }
  }

  removeSession(session: any, event: any){
    if(this.localShoppingCart.length != 0){
      let index = this.localShoppingCart.findIndex((e) => e.id == event.event.id);
      if(index != -1){
        let indexSession = this.localShoppingCart[index].sessions.findIndex((e: any) => e.date == session.date);
        if(indexSession != -1){
          let n = this.localShoppingCart[index].sessions[indexSession].availability - 1;
          this.localShoppingCart[index].sessions[indexSession].availability = n;
          localStorage.setItem('shoppingCart',JSON.stringify(this.localShoppingCart));
        }
      } 
    } 
  }

  updateCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.localShoppingCart));
    this.cartSubject.next(this.localShoppingCart);
  }
}
