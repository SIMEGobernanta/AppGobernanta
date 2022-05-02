import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subscription } from 'rxjs';
import { HouseKeeping, RoomInfo } from 'src/app/room-info';
import {ArrayFiltroService} from '../../services/array-filtro.service';

@Component({
  selector: 'app-selectores',
  templateUrl: './selectores.component.html',
  styleUrls: ['./selectores.component.css']
})
export class SelectoresComponent implements OnInit, OnDestroy {


  @Input() rooms!: RoomInfo[];

  roomInfosAux: RoomInfo[] = [];
  subscriptions: Subscription[] = [];
  houseKeeping = HouseKeeping;
  minDate!: Date;

  constructor(private arrayFilter: ArrayFiltroService) {

  }

  ngOnInit(): void {
    this.minDate = new Date();
    this.roomInfosAux = JSON.parse(JSON.stringify(this.rooms));
    this.subscriptions.push(
      this.arrayFilter.sendArray.subscribe((resp:RoomInfo[]) => {
        this.roomInfosAux = resp;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  filtrarBloqueadas(event:MatCheckboxChange) {
    let aux:RoomInfo[] = [];

    if (event.checked) {
      aux = this.roomInfosAux.filter(habitacion => habitacion.blocked);
    } else {
      aux = this.rooms;
    }
    this.arrayFilter.sendArray.emit(aux);
  }

}
