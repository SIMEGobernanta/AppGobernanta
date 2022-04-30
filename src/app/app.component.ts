import { Component } from '@angular/core';
import { HouseKeeping, RoomInfo } from './room-info';
import * as moment from 'moment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = true;
  title = 'Gobernanta';
  momentDate = moment(new Date());
  /*today = new Date();
  tomorrow =  new Date();*/
  roomsAux: RoomInfo[];
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
      houseKeeping: HouseKeeping.Dirty,
      blocked: true,
    }, {
      name: '202',
      contactName: 'Manolo',
      adults: 2,
      kids: 2,
      babies: 2,
      startDate: moment(new Date()).toDate(),
      endDate: moment(new Date()).add(3, 'days').toDate(),
      houseKeeping: HouseKeeping.Clean,
      blocked: false,
    }];

    constructor() {
      this.roomsAux = [...this.rooms];
     /* this.tomorrow.setDate(this.today.getDate() + 1);*/
      this.isLoading = false;
    }
}
