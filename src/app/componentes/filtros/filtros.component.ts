import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HouseKeeping, RoomInfo } from 'src/app/room-info';
import { ArrayFiltroService } from 'src/app/servicios/array-filtro.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit, OnDestroy {

  @Input() habitaciones!:RoomInfo[];

  estados = HouseKeeping;
  aux: RoomInfo[] = [];
  subscription: Subscription[] = [];

  constructor(private arrayFiltro:ArrayFiltroService) { }

  ngOnInit(): void {
    this.aux = JSON.parse(JSON.stringify(this.habitaciones));
    this.subscription.push(
      this.arrayFiltro.sendArray.subscribe((resp:RoomInfo[]) => {
        this.aux = resp;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach( subscription => subscription.unsubscribe());
  }

  busqueda(value:HTMLInputElement):void {

    let valorInput = value.value;
    let aux: RoomInfo[] = [];

    if (valorInput) {
      for (let habitacion of this.aux) {
        if (habitacion.name.includes(valorInput)) {
          aux.push(habitacion);
        }
      }
    } else {
        aux = this.habitaciones;
    }

    this.arrayFiltro.emitirArray(aux);
  }


}
