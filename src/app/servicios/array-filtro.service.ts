import { EventEmitter, Injectable, Output } from '@angular/core';
import { RoomInfo } from '../room-info';

@Injectable({
  providedIn: 'root'
})
export class ArrayFiltroService {

  @Output() sendArray = new EventEmitter<RoomInfo[]>();

  emitirArray(aux:RoomInfo[]) {
    this.sendArray.emit(aux);
  }

  constructor() { }
}
