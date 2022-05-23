import { EventEmitter, Injectable } from '@angular/core';
import { RoomInfo } from '../room-info';

@Injectable({
  providedIn: 'root'
})
export class ArrayFiltroService {

  public sendArray = new EventEmitter<RoomInfo[]> ();
  public sendAux = new EventEmitter<RoomInfo[]>();
  public inputValue = new EventEmitter<any>();

  constructor() { }

  resetInput():void {
    this.inputValue.emit()
  }
}
