import { Component, OnDestroy, OnInit } from '@angular/core';
import { HouseKeeping, RoomInfo } from './room-info';
import * as moment from 'moment';
import { ArrayFiltroService } from './services/array-filtro.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  title = 'Gobernanta';
  momentDate = moment(new Date());
  roomsAux!: RoomInfo[];
  rooms: RoomInfo[] = [
    {
      name: '100',
      contactName: 'Pepe, Gema',
      adults: 4,
      kids: 1,
      babies: 0,
      startDate: this.momentDate.toDate(),
      endDate: this.momentDate.add(2, 'days').toDate(),
      houseKeeping: HouseKeeping.Dirty,
      blocked: false,
    }, {
      name: '101',
      contactName: 'Juan',
      adults: 3,
      kids: 2,
      babies: 2,
      startDate: this.momentDate.add(4, 'days').toDate(),
      endDate: this.momentDate.add(6, 'days').toDate(),
      houseKeeping: HouseKeeping.Clean,
      blocked: true,
    }, {
      name: '102',
      contactName: '',
      adults: 2,
      kids: 1,
      babies: 0,
      startDate: this.momentDate.add(1, 'days').toDate(),
      endDate: this.momentDate.add(3, 'days').toDate(),
      houseKeeping: HouseKeeping.pendingReview,
      blocked: false,
    }, {
      name: '103',
      contactName: 'Manuel',
      adults: 2,
      kids: 0,
      babies: 0,
      startDate: this.momentDate.add(6, 'days').toDate(),
      endDate: this.momentDate.add(8, 'days').toDate(),
      houseKeeping: HouseKeeping.Clean,
      blocked: false,
    }, {
      name: '104',
      contactName: '',
      adults: 1,
      kids: 0,
      babies: 1,
      startDate: this.momentDate.add(2, 'days').toDate(),
      endDate: this.momentDate.add(3, 'days').toDate(),
      houseKeeping: HouseKeeping.Dirty,
      blocked: false,
    }, {
      name: '105',
      contactName: 'Sergio',
      adults: 1,
      kids: 2,
      babies: 1,
      startDate: this.momentDate.add(2, 'days').toDate(),
      endDate: this.momentDate.add(3, 'days').toDate(),
      houseKeeping: HouseKeeping.Dirty,
      blocked: true,
    }, {
      name: '106',
      contactName: 'Pablo',
      adults: 5,
      kids: 2,
      babies: 2,
      startDate: this.momentDate.add(0, 'days').toDate(),
      endDate: this.momentDate.add(15, 'days').toDate(),
      houseKeeping: HouseKeeping.pendingReview,
      blocked: false,
    }, {
      name: '107',
      contactName: 'Ana',
      adults: 2,
      kids: 1,
      babies: 0,
      startDate: this.momentDate.add(10, 'days').toDate(),
      endDate: this.momentDate.add(13, 'days').toDate(),
      houseKeeping: HouseKeeping.Clean,
      blocked: false,
    }, {
      name: '108',
      contactName: '',
      adults: 1,
      kids: 0,
      babies: 2,
      startDate: this.momentDate.add(2, 'days').toDate(),
      endDate: this.momentDate.add(3, 'days').toDate(),
      houseKeeping: HouseKeeping.Dirty,
      blocked: false,
    }, {
      name: '109',
      contactName: 'Manuela',
      adults: 1,
      kids: 2,
      babies: 1,
      startDate: this.momentDate.add(3, 'days').toDate(),
      endDate: this.momentDate.add(5, 'days').toDate(),
      houseKeeping: HouseKeeping.Clean,
      blocked: true,
    }, {
      name: '200',
      contactName: 'Mario',
      adults: 2,
      kids: 1,
      babies: 0,
      startDate: this.momentDate.add(2, 'days').toDate(),
      endDate: this.momentDate.add(3, 'days').toDate(),
      houseKeeping: HouseKeeping.pendingReview,
      blocked: false,
    }, {
      name: '201',
      contactName: '',
      adults: 1,
      kids: 0,
      babies: 0,
      startDate: this.momentDate.add(2, 'days').toDate(),
      endDate: this.momentDate.add(3, 'days').toDate(),
      houseKeeping: HouseKeeping.Clean,
      blocked: false,
    }, {
      name: '202',
      contactName: 'Manolo',
      adults: 2,
      kids: 2,
      babies: 2,
      startDate: moment(new Date()).toDate(),
      endDate: moment(new Date()).add(3, 'days').toDate(),
      houseKeeping: HouseKeeping.Dirty,
      blocked: false,
    }, {
      name: '203',
      contactName: '',
      adults: 2,
      kids: 0,
      babies: 0,
      startDate: moment(new Date()).toDate(),
      endDate: moment(new Date()).add(7, 'days').toDate(),
      houseKeeping: HouseKeeping.Dirty,
      blocked: true,
    }, {
      name: '204',
      contactName: 'Maria Dolores',
      adults: 1,
      kids: 0,
      babies: 3,
      startDate: moment(new Date()).toDate(),
      endDate: moment(new Date()).add(2, 'days').toDate(),
      houseKeeping: HouseKeeping.pendingReview,
      blocked: false,
    }, {
      name: '205',
      contactName: '',
      adults: 1,
      kids: 4,
      babies: 0,
      startDate: moment(new Date()).add(1, 'days').toDate(),
      endDate: moment(new Date()).add(3, 'days').toDate(),
      houseKeeping: HouseKeeping.Clean,
      blocked: false,
    }, {
      name: '206',
      contactName: 'Andrea',
      adults: 2,
      kids: 0,
      babies: 0,
      startDate: moment(new Date()).toDate(),
      endDate: moment(new Date()).add(6, 'days').toDate(),
      houseKeeping: HouseKeeping.Dirty,
      blocked: false,
    }, {
      name: '207',
      contactName: '',
      adults: 1,
      kids: 4,
      babies: 0,
      startDate: moment(new Date()).add(5, 'days').toDate(),
      endDate: moment(new Date()).add(13, 'days').toDate(),
      houseKeeping: HouseKeeping.Clean,
      blocked: true,
    }, {
      name: '208',
      contactName: 'Elisa',
      adults: 1,
      kids: 1,
      babies: 0,
      startDate: moment(new Date()).add(12, 'days').toDate(),
      endDate: moment(new Date()).add(17, 'days').toDate(),
      houseKeeping: HouseKeeping.pendingReview,
      blocked: false,
    }, {
      name: '209',
      contactName: 'Jessica',
      adults: 1,
      kids: 0,
      babies: 0,
      startDate: moment(new Date()).add(9, 'days').toDate(),
      endDate: moment(new Date()).add(13, 'days').toDate(),
      houseKeeping: HouseKeeping.Clean,
      blocked: false,
    }
  ];

  subscriptions: Subscription[] = [];

    constructor(private arrayFiltro: ArrayFiltroService) { }

    ngOnInit(): void {
      this.roomsAux = [...this.rooms];
      this.isLoading = false;
      this.subscriptions.push(this.arrayFiltro.sendAux.subscribe((resp:RoomInfo[]) => {
        this.roomsAux = resp;
        })
      );
    }

    ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
