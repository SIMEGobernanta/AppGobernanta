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
    //THIS UPDATES VISUALLY
    /*
    this.rooms = this.rooms.sort((a,b) => {
      if (a.adults > b.adults) { return 1 };
       return -1;
     });
     console.log(this.rooms);
    */
    //THIS DOES NOT UPDATE VISUALLY
    //Reminder that this.aux = [...this.rooms] on ngOnInit() .-.
    /*
     this.rooms = this.aux.sort((a,b) => {
       if (a.adults > b.adults) { return 1 };
        return -1;
     })
    */
    //THIS DOES NOT UPDATE VISUALLY
    //I have to use aux so I don't lose the initial value and even if I use rooms it does not update
    //Console logs seem to be fine ????
    if (value) {
      this.rooms = this.aux.filter(room => room.name.includes(value));
      console.log('This.rooms.length = '+this.rooms.length);
      return;
    }
    this.rooms = this.aux;
    console.log('This.rooms.length = '+this.rooms.length);
    /* THIS DOESN'T WORK EVEN IF ITS THE SAME ARRAY
    if (value) {
      this.rooms = this.rooms.filter(room => room.name.includes(value));
      console.log('This.rooms.length = '+this.rooms.length);
      return;
    }


    pregunta:

    Hay alguna diferencia en la manera que tocan los datos array.sort y array.filter??
    no entiendo por que el sort funciona (solo si lo ordenas con el mismo array no funciona con una copia)
    y el filter no funciona con NINGUN array, a pesar de que todos lo actualizan correctamente en el console.log
    */
  }

  resetArray(): void {
    this.rooms = this.aux;
  }
}
