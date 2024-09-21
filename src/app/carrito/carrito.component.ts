import { Component, OnInit } from '@angular/core';
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

  deteleElement(element: any){

  }

  goToHome(){
    this.router.navigateByUrl('');
  }

}
