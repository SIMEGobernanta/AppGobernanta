import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SelectoresComponent } from './componentes/selectores/selectores.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { FiltrosordenComponent } from './componentes/filtrosorden/filtrosorden.component';
import { PaginacionComponent } from './componentes/paginacion/paginacion.component';
import { FiltrosComponent } from './componentes/filtros/filtros.component';
import { CloseDialogComponent } from './componentes/principal/close-dialog/close-dialog.component';
import { LeyendaComponent } from './componentes/leyenda/leyenda.component';
import { FlechasComponent } from './componentes/filtrosorden/flechas/flechas.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    SelectoresComponent,
    FiltrosComponent,
    PrincipalComponent,
    FiltrosordenComponent,
    PaginacionComponent,
    LeyendaComponent,
    CloseDialogComponent,
    FlechasComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
