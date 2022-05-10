import { Component, Input, OnInit } from '@angular/core';
import { RoomInfo } from 'src/app/room-info';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() rooms!: RoomInfo[];
  isLoading = true;
  aux!: RoomInfo[];
  value = '';

  constructor() { }

  ngOnInit(): void {
    this.isLoading = false;
    this.aux = [...this.rooms];
  }

  search(value: string): void {
    if (value) {
      //Array.prototype.filter() crea un nuevo array, y al igualar this.rooms al nuevo array perdemos la referencia
      //Por eso no se actualiza visualmente aunque el console.log sea correcto
      this.rooms = this.aux.filter(room => room.name.includes(value));
      console.log('This.rooms = '+this.rooms);
      return;
    }
    this.rooms = this.aux;
    console.log('This.rooms = '+this.rooms);
  }

  resetArray(): void {
    this.rooms = this.aux;
  }
}
