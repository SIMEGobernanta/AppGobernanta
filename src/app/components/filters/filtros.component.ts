import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HouseKeeping, RoomInfo } from 'src/app/room-info';
import {ArrayFiltroService} from '../../services/array-filtro.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit, OnDestroy {

  @Input() rooms!: RoomInfo[];

  houseKeeping = HouseKeeping;
  roomInfosAux: RoomInfo[] = [];
  subscription: Subscription[] = [];

  constructor(private arrayFilter: ArrayFiltroService) { }

  ngOnInit(): void {
    this.roomInfosAux = JSON.parse(JSON.stringify(this.rooms));
    this.subscription.push(
      this.arrayFilter.sendArray.subscribe((resp: RoomInfo[]) => {
        this.roomInfosAux = resp;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  search(value: HTMLInputElement): void {

    const inputValue = value.value;
    let aux: RoomInfo[];

    if (inputValue) {
      aux = this.roomInfosAux.filter(room => room.name.includes(inputValue));
    } else {
      aux = this.rooms;
    }
    this.arrayFilter.sendArray.emit(aux);
  }
}
