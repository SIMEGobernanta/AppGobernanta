import { EventEmitter, Injectable, Output } from '@angular/core';
import { RoomInfo } from '../room-info';

@Injectable({
  providedIn: 'root'
})
export class ArrayFiltroService {

  public sendArray: EventEmitter<RoomInfo[]> = new EventEmitter;

  constructor() { }
}
