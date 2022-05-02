import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HouseKeeping, RoomInfo } from 'src/app/room-info';
import { ArrayFiltroService } from '../../services/array-filtro.service';


@Component({
  selector: 'app-selectores',
  templateUrl: './selectores.component.html',
  styleUrls: ['./selectores.component.css']
})
export class SelectoresComponent implements OnInit, OnDestroy {

  @Input() rooms!: RoomInfo[];

  subscriptions: Subscription[] = [];
  houseKeeping = HouseKeeping;
  minDate!: Date;

  constructor(private arrayFilter: ArrayFiltroService) {

  }

  ngOnInit(): void {
    this.minDate = new Date();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  filterBlocked(checked:boolean) {
    let aux:RoomInfo[] = [];
    if (checked) aux = this.rooms.filter(habitacion => habitacion.blocked);
    else aux = this.rooms;
    this.arrayFilter.sendArray.emit(aux);
    console.log(aux);
  }



}
