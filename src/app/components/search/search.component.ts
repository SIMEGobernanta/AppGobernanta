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

  constructor() { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  search(value: string) {
    /*
    * La función de Carlos para los filtros de ordenación
    * SI FUNCIONA
    this.   rooms = this.rooms.sort((a,b):number => {
      if(a.adults > b.adults) {return 1}
      return -1;
    })*/

    //Este no actualiza el array visualmente y no se por que
    this.rooms = this.rooms.filter(room => (room.name.includes(value)));
    //El console log es correcto
    console.log(this.rooms);
  }

}