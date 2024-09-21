import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  localShoppingCart: any[] = [];

  constructor(
    private router: Router
  ) { 
    if(localStorage.getItem('shoppingCart') == null){
      localStorage.setItem('shoppingCart',JSON.stringify([]));
    } else{
      this.localShoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    }

    window.addEventListener('storage', (e) => {
      this.localShoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    })
  }

  ngOnInit(): void {
  }

  deteleElement(event: any,element: any){
    let index = this.localShoppingCart.findIndex((e) => e.id = event.id);

    let sessionsFiltered: any[] = this.localShoppingCart[index].sessions.filter((e: any) => e.date != element.date);
    
    if(sessionsFiltered.length != 0){
      this.localShoppingCart[index].sessions = sessionsFiltered;
      localStorage.setItem('shoppingCart',JSON.stringify(this.localShoppingCart));
    } else{
      this.localShoppingCart = this.localShoppingCart.filter(e => e.id != event.id);
      localStorage.setItem('shoppingCart',JSON.stringify(this.localShoppingCart));
    }
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
    let index = this.localShoppingCart.findIndex((e) => e.id == event.id);
    
    let indexSession = this.localShoppingCart[index].sessions.findIndex((e: any) => e.date = element.date);
  
    return this.localShoppingCart[index].sessions[indexSession].availability;
  }

}
