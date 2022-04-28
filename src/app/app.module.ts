import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltrosComponent } from './components/filters/filtros.component';
import { LeyendaComponent } from './components/legend/leyenda.component';
import { CloseDialogComponent } from './components/main/close-dialog/close-dialog.component';
import { PrincipalComponent } from './components/main/principal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FiltrosordenComponent } from './components/orderFilters/filtrosorden.component';
import { FlechasComponent } from './components/orderFilters/flechas/flechas.component';
import { PaginacionComponent } from './components/paginator/paginacion.component';
import { SelectoresComponent } from './components/selectors/selectores.component';

// Material
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
import { AppComponent } from './app.component';

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
