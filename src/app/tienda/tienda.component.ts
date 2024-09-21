import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from 'src/servicios/evento/evento.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  localShoppingCart: any[] = [];
  event!: any;

  constructor(
    private router: Router,
    private eventoService: EventoService,
    private activatedRoute: ActivatedRoute
  ) {
    if(localStorage.getItem('shoppingCart') == null){
      localStorage.setItem('shoppingCart',JSON.stringify([]));
    } else{
      this.localShoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      const id: any = params['id'] || null;
      if(id != null){
        this.eventoService.getEventInfo(id).subscribe(data =>{
          this.event = data;
        })
      }
    })
  }

}
