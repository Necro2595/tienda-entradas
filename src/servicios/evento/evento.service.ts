import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  eventoCartelera: string = 'assets/data/events.json';
  eventoInfo68: string = 'assets/data/event-info-68.json';
  eventoInfo184: string = 'assets/data/event-info-184.json';

  constructor(
    private http: HttpClient
  ) { }

  getEvents(): Observable<any>{
    return this.http.get(this.eventoCartelera);
  }

  getEventInfo(id: number): Observable<any>{
    if(id == 68){
      return this.http.get(this.eventoInfo68);
    } else {
      return this.http.get(this.eventoInfo184);
    }
    
  }
}
