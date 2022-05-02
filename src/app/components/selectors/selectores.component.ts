import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { HouseKeeping, RoomInfo } from 'src/app/room-info';
import { ArrayFiltroService } from '../../services/array-filtro.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-selectores',
  templateUrl: './selectores.component.html',
  styleUrls: ['./selectores.component.css'],
  //Formatear la fecha del daterangepicker
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class SelectoresComponent implements OnInit, OnDestroy {
  @Input() rooms!: RoomInfo[];
  subscriptions: Subscription[] = [];
  houseKeeping = HouseKeeping;
  minDate!: Date;

  constructor(private arrayFilter: ArrayFiltroService) {

  }

  ngOnInit(): void {
    this.minDate = moment().toDate();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  filterBlocked(checked:boolean) {
    let aux:RoomInfo[] = [];
    if (checked) aux = this.rooms.filter(habitacion => habitacion.blocked);
    else aux = this.rooms;
    this.arrayFilter.sendArray.emit(aux);
    console.log(aux);
  }



}
