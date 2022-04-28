import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subscription } from 'rxjs';
import { HouseKeeping, RoomInfo } from 'src/app/room-info';
import { ArrayFiltroService } from 'src/app/servicios/array-filtro.service';

@Component({
  selector: 'app-selectores',
  templateUrl: './selectores.component.html',
  styleUrls: ['./selectores.component.css']
})
export class SelectoresComponent implements OnInit, OnDestroy {


  @Input() habitaciones!:RoomInfo[];

  aux: RoomInfo[] = [];
  subscription: Subscription[] = [];
  estados = HouseKeeping;
  minDate!: Date;
  auxiliar2: RoomInfo[] = [];

  constructor(private arrayFiltro:ArrayFiltroService) {

  }

  ngOnInit(): void {
    this.minDate = new Date();
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

  filtrarBloqueadas(event:MatCheckboxChange) {
    let aux:RoomInfo[] = [];

    if (event.checked) {
      this.auxiliar2 = JSON.parse(JSON.stringify(this.aux));
      for (let i = 0; i < this.aux.length; i++) {
        if (this.aux[i].blocked) {
          aux.push(this.aux[i]);
        }
      }
    } else {
      if (this.auxiliar2) {
        aux = this.auxiliar2;
      } else {
        aux = this.habitaciones;
      }
    }
    this.arrayFiltro.sendArray.emit(aux);
  }

}
