import { Component, Input, OnInit } from '@angular/core';
import { HouseKeeping, RoomInfo } from 'src/app/room-info';
import * as moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-selectores',
  templateUrl: './selectores.component.html',
  styleUrls: ['./selectores.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ],
})
export class SelectoresComponent implements OnInit {
  @Input() rooms!: RoomInfo[];
  @Input() roomInfoAux!: RoomInfo[];
  houseKeeping = HouseKeeping;
  minDate!: Date;

  constructor() {

  }

  ngOnInit(): void {
    this.minDate = moment().toDate();
  }



  //La función cumple con lo deseado pero no actualiza visualmente el array
  filterBlocked(checked:boolean) {
    checked ? this.roomInfoAux = this.rooms.filter(room => room.blocked) : this.roomInfoAux = this.rooms;
    /*
    if (checked) {
      //Si la checkbox esta checked, sacame SOLO las habitaciones bloqueadas
      this.roomInfoAux = this.rooms.filter(room => room.blocked)
    } else {
      //Si no, devuelveme todas
      this.roomInfoAux = this.rooms
    }
    */

    console.log(this.roomInfoAux);
  }

  filterByStatus(selected:string, manual:boolean) {
    //MatOptionSelectionChange fires twice instead of once
    //we only need the data we click, not the last one we clicked before clicking again
    if (manual) {
      this.roomInfoAux = this.rooms.filter(room => room.houseKeeping === selected);
      console.log(this.roomInfoAux);
    }
  }


  filterByDate(start:string, end:string) {
    let startDate = new Date(start.split('/').reverse().join('/'));
    let endDate = new Date(end.split('/').reverse().join('/'));
    //Send this two dates to the big function ?
    /*
    this.roomInfoAux = this.rooms.filter(function(room) {
      return room.startDate >= startDate && room.endDate <= endDate;
    });

    console.log(this.roomInfoAux);
    */
  }
}
