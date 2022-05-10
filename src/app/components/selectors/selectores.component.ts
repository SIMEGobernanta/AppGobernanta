import { Component, Input, OnInit } from '@angular/core';
import { HouseKeeping, RoomInfo } from 'src/app/room-info';
import * as moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';

export const MY_DATE_FORMATS = {
  parse: {dateInput: 'DD/MM/YYYY'},
  display: {dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMMM YYYY', dateA11yLabel: 'LL', monthYearA11yLabel: 'MMMM YYYY'},
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
  myForm!: FormGroup;
  start!: FormControl; end!: FormControl; status!: FormControl; blocked!: FormControl;


  filters: IFilters[] = [
    {prop: 'blocked', usedFilter:false, filterAction:[]},
    {prop: 'houseKeeping', usedFilter:false,filterAction:[]},
    {prop: 'date', usedFilter:false, filterAction:[]},
  ];
  usedAnyFilter: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.minDate = moment().toDate();

    this.initForm();
  }

  initForm(): void {
    this.start = new FormControl('');
    this.end = new FormControl('');
    this.status = new FormControl('');
    this.blocked = new FormControl('');

    this.myForm = new FormGroup({
      start: this.start,
      end: this.end,
      status: this.status,
      blocked: this.blocked
    });
  }

  filterBlocked(checked:boolean): void {
    this.filters[0].usedFilter = !this.filters[0].usedFilter;
    this.applyFilters();
  }

  filterByStatus(selected:string, manual:boolean): void {
    this.filters[1].usedFilter = true;
    this.filters[1].filterAction = new Array(selected);

    if (manual) this.applyFilters();
  }

  filterByDate(start:string, end:string): void {
    this.filters[2].usedFilter = true;
    //Formateo de las fechas
    const startDate = new Date(start.split('/').reverse().join('/'));
    const endDate = new Date(end.split('/').reverse().join('/'));
    endDate.setHours(23); endDate.setMinutes(59); endDate.setSeconds(59);
    this.filters[2].filterAction = [startDate.toString(),endDate.toString()];

    this.applyFilters();
  }

  //Doesn't update visually but console.logs are correct
  //Esta cosa funciona, pero convendría cambiarlo jsjs
  applyFilters(): void {
    const usedFilters = this.filters.filter(filter => filter.usedFilter);
    if (usedFilters.length === 0) {
      this.resetFilters();
    } else {
      this.resetArray();
      this.usedAnyFilter = true;
      for (let i = 0; i < usedFilters.length; i++) {
        switch (usedFilters[i].prop) {
           case 'blocked':
             usedFilters[i].usedFilter ? this.roomInfoAux = this.roomInfoAux.filter(room => room[usedFilters[i].prop as keyof RoomInfo]) : this.roomInfoAux = this.roomInfoAux;
           break;
           case 'houseKeeping':
             this.roomInfoAux = this.roomInfoAux.filter(room => room[usedFilters[i].prop as keyof RoomInfo] === usedFilters[i].filterAction[0]);
           break;
           case 'date':
             this.roomInfoAux =  this.roomInfoAux.filter(room => {return room.startDate >= new Date(usedFilters[i].filterAction[0]) && room.endDate <= new Date(usedFilters[i].filterAction[1])});
            break;
        }
      }
      console.log(this.roomInfoAux);
    }
  }

  resetArray(): void {
    this.roomInfoAux = this.rooms;
  }

  resetFilters(): void {
    const usedFilters = this.filters.filter(filter => filter.usedFilter);
    for (let i = 0; i < usedFilters.length; i++) { usedFilters[i].usedFilter = false };
    this.resetArray();
    console.log(this.roomInfoAux);
    this.myForm.reset();
    this.usedAnyFilter = false;
  }
}
