import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from 'src/servicios/evento/evento.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { CarritoService } from 'src/servicios/carrito/carrito.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {

  listaEventos: any[] = [];
  isLargeScreen: boolean = true;
  localShoppingCart: any[] = [];

  constructor(
    private router: Router,
    private eventoService: EventoService,
    private breakPointObserver: BreakpointObserver,
    private domSanitizer: DomSanitizer,
    private carritoService: CarritoService
  ) {
    if(localStorage.getItem('shoppingCart') == null){
      localStorage.setItem('shoppingCart',JSON.stringify([]));
    } else{
      this.localShoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    }
   }

  ngOnInit() {
    this.checkScreenSize();

    this.eventoService.getEvents().subscribe(data =>{
      this.listaEventos = data;
      this.listaEventos.sort((a,b) => a.endDate - b.endDate);
    });

    this.carritoService.cart.subscribe(cart => {
      this.localShoppingCart = cart;
    });
  }

  checkScreenSize(){
    this.breakPointObserver.observe(
      [Breakpoints.XLarge,Breakpoints.Large]).subscribe(result => {
        this.isLargeScreen = result.matches;
      })
  }

  formatDate(timestamp: string){

    const date = new Date(+timestamp);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  goToShop(id: string){
    this.router.navigateByUrl('/tienda/'+id);
  }

  checkText(text: string){
    return this.domSanitizer.bypassSecurityTrustHtml(text);
  }

}
