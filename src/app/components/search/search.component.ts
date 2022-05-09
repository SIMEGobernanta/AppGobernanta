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

  search(value: string) {
    let auxiliar: RoomInfo[];
    if (value) {
      auxiliar = this.aux.filter(room => room.name.includes(value));
      this.rooms = [...auxiliar];
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
