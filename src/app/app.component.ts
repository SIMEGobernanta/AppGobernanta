import { Component } from '@angular/core';
import { HouseKeeping, RoomInfo } from './room-info';
import { ArrayFiltroService } from './servicios/array-filtro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Gobernanta';

  today = new Date();
  tomorrow =  new Date();
  habitaciones: RoomInfo[] = [
    {
      name: '100',
      contactName: 'Pepe, Gema',
      adults: 2,
      kids: 1,
      babies: 0,
      startDate: this.today,
      endDate: this.tomorrow,
      houseKeeping: HouseKeeping.Dirty,
      blocked: false
    }, {
      name: '101',
      contactName: 'Juan',
      adults: 1,
      kids: 2,
      babies: 2,
      startDate: this.today,
      endDate: this.tomorrow,
      houseKeeping: HouseKeeping.Clean,
      blocked: true
    }, {
      name: '102',
      contactName: '',
      adults: 2,
      kids: 1,
      babies: 0,
      startDate: this.today,
      endDate: this.tomorrow,
      houseKeeping: HouseKeeping.pendingReview,
      blocked: false
    }, {
      name: '103',
      contactName: 'Manuel',
      adults: 2,
      kids: 0,
      babies: 0,
      startDate: this.today,
      endDate: this.tomorrow,
      houseKeeping: HouseKeeping.Clean,
      blocked: false
    }, {
      name: '104',
      contactName: '',
      adults: 1,
      kids: 0,
      babies: 1,
      startDate: this.today,
      endDate: this.tomorrow,
      houseKeeping: HouseKeeping.Dirty,
      blocked: false
    }, {
      name: '105',
      contactName: 'Sergio',
      adults: 1,
      kids: 2,
      babies: 1,
      startDate: this.today,
      endDate: this.tomorrow,
      houseKeeping: HouseKeeping.Dirty,
      blocked: true
    }, {
      name: '200',
      contactName: 'Mario',
      adults: 2,
      kids: 1,
      babies: 0,
      startDate: this.today,
      endDate: this.tomorrow,
      houseKeeping: HouseKeeping.pendingReview,
      blocked: false
    }, {
      name: '201',
      contactName: '',
      adults: 1,
      kids: 0,
      babies: 0,
      startDate: this.today,
      endDate: this.tomorrow,
      houseKeeping: HouseKeeping.Dirty,
      blocked: true
    }, {
      name: '202',
      contactName: 'Manolo',
      adults: 2,
      kids: 2,
      babies: 2,
      startDate: this.today,
      endDate: this.tomorrow,
      houseKeeping: HouseKeeping.Clean,
      blocked: false
    }];

    constructor(private arrayFiltro:ArrayFiltroService) {
      this.tomorrow.setDate(this.today.getDate() + 1);
    }
}
