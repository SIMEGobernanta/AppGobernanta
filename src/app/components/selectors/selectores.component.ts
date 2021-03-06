import { Component, Input, OnInit } from '@angular/core';
import { HouseKeeping, RoomInfo } from 'src/app/room-info';
import * as moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArrayFiltroService } from 'src/app/services/array-filtro.service';
import { Subscription } from 'rxjs';
import { isNull } from '@angular/compiler/src/output/output_ast';

//Date format for the daterangepicker
export const MY_DATE_FORMATS = {
  parse: {dateInput: 'DD/MM/YYYY'},
  display: {dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMMM YYYY', dateA11yLabel: 'LL', monthYearA11yLabel: 'MMMM YYYY'},
};

export interface IFilters {
  prop: string;
  usedFilter: boolean;
  filterAction: Array<any>;
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

  usedAnyFilter: boolean = false;

  filters: IFilters[] = [
    {prop: 'blocked', usedFilter:false, filterAction:[]},
    {prop: 'houseKeeping', usedFilter:false, filterAction:[]},
    {prop: 'date', usedFilter:false, filterAction:[]},
  ];

  houseKeeping = HouseKeeping;
  minDate!: Date;
  myForm!: FormGroup;
  start!: FormControl; end!: FormControl; status!: FormControl; blocked!: FormControl;


  constructor(private arrayFiltro: ArrayFiltroService) { }

  ngOnInit(): void {
    this.minDate = moment().toDate();
    this.initForm();
  }

  //Set the FormControls, allows form reset
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

  filterBlocked(): void {
    this.filters[0].usedFilter = !this.filters[0].usedFilter;
    this.applyFilters();
  }

  filterByStatus(selected:string, manual:boolean): void {
    if (manual) {
      this.filters[1].usedFilter = true;
      this.filters[1].filterAction = [selected];
      this.applyFilters();
    }
  }

  filterByDate(start:string, end:string): void {
    if (start.length > 0 && end.length > 0) {
      this.filters[2].usedFilter = true;

      //Formateo de las fechas
      const startDate = new Date(start.split('/').reverse().join('/'));
      const endDate = new Date(end.split('/').reverse().join('/'));
      startDate.setHours(0); startDate.setMinutes(0); startDate.setSeconds(0); startDate.setMilliseconds(0);
      //Pasar la fecha limite a las 23:59:59'999 para asegurarse de que se incluye en el filtro
      endDate.setHours(23); endDate.setMinutes(59); endDate.setSeconds(59); endDate.setMilliseconds(999);
      this.filters[2].filterAction = [startDate,endDate];

      this.applyFilters();
      return;
    }
    this.filters[2].usedFilter = false;
  }

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
             let roomAux: RoomInfo[] = [];
             this.roomInfoAux.forEach(room => {
              //Si los intervalos tienen overlap... -->  (b1 <= a2) && (b2 >= a1)
               if ((usedFilters[i].filterAction[0] <= room.endDate) && (usedFilters[i].filterAction[1] >= room.startDate)) {
                 roomAux.push(room);
               }
              });
              this.roomInfoAux = roomAux;
           break;
        }
      }
      this.arrayFiltro.sendArray.emit(this.roomInfoAux);
      this.arrayFiltro.sendAux.emit(this.roomInfoAux);
    }
  }

  resetArray(): void {
    this.roomInfoAux = this.rooms;
    this.arrayFiltro.sendArray.emit(this.roomInfoAux);
    this.arrayFiltro.sendAux.emit(this.roomInfoAux);
  }

  resetFilters(): void {
    for (let i = 0; i < this.filters.length; i++) { this.filters[i].usedFilter = false };
    this.usedAnyFilter = false;
    this.resetArray();
    this.myForm.reset();

    this.arrayFiltro.resetInput();
  }
}
