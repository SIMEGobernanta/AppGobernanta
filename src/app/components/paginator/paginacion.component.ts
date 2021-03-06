import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomInfo } from 'src/app/room-info';
import { ArrayFiltroService } from 'src/app/services/array-filtro.service';

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

  ngOnInit(): void { }

  //Set paginator page size options (Cards displayed)
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

  //Subscribe to this.arrayfiltroservice.sendAux and emit spliced array
  changePage(event:any): void {
    this.aux = JSON.parse(JSON.stringify(this.rooms));
    const index = event.pageIndex;
    const cards = event.pageSize;

    if (cards < this.rooms.length){
      this.roomAux = this.aux.splice(index*(cards), cards);
    } else {
      this.roomAux = this.rooms;
    }
    console.log(this.roomAux);
  }

}
