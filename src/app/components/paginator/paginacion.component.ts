import { Component, OnInit, Input } from '@angular/core';
import { RoomInfo } from 'src/app/room-info';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {
  @Input() rooms!: RoomInfo[];
  @Input() roomAux!: RoomInfo[];
  aux:RoomInfo[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  setPageSizeOptions(): number[] {
    const multiplier = 4; //Set whatever you want here
    let x = 4; //Set whatever you want here (initial value for the page size options)
    let aux = [];
    aux.push(x);
    while (x < this.rooms.length/multiplier) {
      x *= multiplier;
      aux.push(x);
    }
    aux.push(this.rooms.length);
    return aux;
  }

  changePage(event:any) {
    this.aux = [...this.rooms];
    const index = event.pageIndex;
    const cards = event.pageSize;

    if (cards < this.rooms.length){
      this.roomAux = this.aux.splice(index*(cards), cards);
    } else {
      this.roomAux = this.aux.splice(index, this.rooms.length);
    }

    console.log(this.roomAux);
  }

}
