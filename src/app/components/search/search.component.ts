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

  constructor() { }

  ngOnInit(): void {
    this.isLoading = false;
    this.aux = [...this.rooms];
  }

  search(value: string) {
    //Este no actualiza el array visualmente y no se por que
    this.rooms = this.aux.filter(function(room) {
      return room.name.includes(value);
    });
    //El console log es correcto
    console.log(this.rooms);
  }
}
