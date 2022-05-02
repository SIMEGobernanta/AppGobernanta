import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HouseKeeping, RoomInfo } from 'src/app/room-info';
import { ArrayFiltroService } from '../../services/array-filtro.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit, OnDestroy {
  @Input() rooms!: RoomInfo[];

  roomInfoAux: RoomInfo[] = [];
  subscriptions: Subscription[] = [];
  houseKeeping = HouseKeeping;
  isLoading = true;

  constructor(private arrayFilter: ArrayFiltroService) { }

  ngOnInit(): void {
    this.isLoading = false;

    this.roomInfoAux = [...this.rooms];
    this.subscriptions.push(
      this.arrayFilter.sendArray.subscribe((resp:RoomInfo[]) => {
        this.roomInfoAux = resp;
      })
    );
  }

  ngOnDestroy() : void {
    this.subscriptions.forEach(subcription => subcription.unsubscribe);
  }

  search(value: string): void {
    this.rooms = this.roomInfoAux.filter(room => room.name.includes(value));
  }
}
