import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { TiendaComponent } from './tienda/tienda.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BannerComponent } from './banner/banner.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({ declarations: [
        AppComponent,
        PaginaInicialComponent,
        TiendaComponent,
        CarritoComponent,
        BannerComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CommonModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatBadgeModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
