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
  idEvent: number = 0;

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
    
    let idRoute: string  = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if(idRoute && idRoute != ''){
      this.idEvent = +idRoute;
      this.eventoService.getEventInfo(this.idEvent).subscribe(data =>{
        this.event = data;
        this.event.sessions.sort((a: any,b: any) => a.date - b.date);
      })
    }
  }

  formatDate(timestamp: string){

    const date = new Date(+timestamp);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  addSession(session: any){

  }

  removeSession(session: any){

  }

  sessionsAdded(session: any){

  }

  sessionsAvailable(sessions: string){

  }

}
