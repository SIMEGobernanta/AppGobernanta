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

interface IFilters {
  prop: string;
  usedFilter: boolean;
  filterAction: Array<string>;
}

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
  filters: IFilters[] = [
    {prop: 'blocked', usedFilter:false, filterAction:[]},
    {prop: 'houseKeeping', usedFilter:false,filterAction:[]},
    {prop: 'date', usedFilter:false, filterAction:[]},
  ];


  constructor() {

  }

  ngOnInit(): void {
    this.minDate = moment().toDate();
  }



  filterBlocked(checked:boolean) {
    this.filters[0].usedFilter = !this.filters[0].usedFilter;
    this.applyFilters();
  }

  filterByStatus(selected:string, manual:boolean) {
    this.filters[1].usedFilter = true;
    this.filters[1].filterAction = new Array(selected);

    if (manual) {
      this.applyFilters();
    }
  }


  filterByDate(start:string, end:string) {
    this.filters[2].usedFilter = true;
    const startDate = new Date(start.split('/').reverse().join('/'));
    const endDate = new Date(end.split('/').reverse().join('/')); endDate.setHours(23); endDate.setMinutes(59); endDate.setSeconds(59);
    this.filters[2].filterAction = [startDate.toString(),endDate.toString()];

    this.applyFilters();
  }

  applyFilters() {
    //Esta cosa funciona, pero convendría cambiarlo jsjs
    const usedFilters = this.filters.filter(filter => filter.usedFilter);
    if (usedFilters.length === 0) {
      this.resetFilters();
    } else {
      for (let i = 0; i < usedFilters.length; i++) {
        //El primer filtro hay que igualarlo al array completo (rooms);
        if (i === 0) {
          if(usedFilters[i].filterAction.length > 1) {
            this.roomInfoAux = this.rooms.filter(room => {
              return room.startDate >= new Date(usedFilters[i].filterAction[0]) && room.endDate <= new Date(usedFilters[i].filterAction[1]);
            });
          } else {
            const valueToCheck = usedFilters[i].prop;
            if(valueToCheck === 'blocked') {
              usedFilters[i].usedFilter ? this.roomInfoAux = this.rooms.filter(room => room[valueToCheck as keyof RoomInfo]) : this.roomInfoAux = this.rooms;
            } else {
              this.roomInfoAux = this.rooms.filter(room => room[valueToCheck as keyof RoomInfo] === usedFilters[i].filterAction[0]);
            }
          }
          //Los que no sean el primero tienen que igualarse al array filtrado
        } else {
          if(usedFilters[i].filterAction.length > 1) {
            this.roomInfoAux = this.roomInfoAux.filter(room => {
              return room.startDate >= new Date(usedFilters[i].filterAction[0]) && room.endDate <= new Date(usedFilters[i].filterAction[1]);
            });
          } else {
            const valueToCheck = usedFilters[i].prop;
            if(valueToCheck === 'blocked') {
              usedFilters[i].usedFilter ? this.roomInfoAux = this.roomInfoAux.filter(room => room[valueToCheck as keyof RoomInfo]) : this.roomInfoAux = this.roomInfoAux;
            } else {
              this.roomInfoAux = this.roomInfoAux.filter(room => room[valueToCheck as keyof RoomInfo] === usedFilters[i].filterAction[0]);
            }
          }
        }
      }
    }

    console.log(this.roomInfoAux);
  }

  resetFilters() {
    //I still don't know how to do
    this.roomInfoAux = this.rooms;
  }
}
