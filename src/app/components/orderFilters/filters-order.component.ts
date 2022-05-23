import { Component, Input, OnInit } from '@angular/core';
import { RoomInfo } from '../../room-info';

interface ISortFilter {
  prop: string;
  label: string;
  asc: boolean;
}

@Component({
  selector: 'app-filtrosorden',
  templateUrl: './filters-order.component.html',
  styleUrls: ['./filters-order.component.css']
})

export class FiltersOrderComponent implements OnInit {
  @Input() rooms!: RoomInfo[];
  isLoading = true;
  filters: ISortFilter[] = [
    { prop: 'adults', label: 'Adultos', asc: false }, { prop: 'kids', label: 'Niños', asc: false },
    { prop: 'babies' , label: 'Cunas', asc: false }, { prop: 'name', label: 'Habitación', asc: false },
    { prop: 'startDate', label: 'Entrada', asc: false }, { prop: 'endDate', label: 'Salida', asc: false }
  ];
  filterHandler: ISortFilter[] = [];

  constructor() { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  setFilterHandler(filter: ISortFilter): void {
    const index = this.filterHandler.indexOf(filter);
    if (index === -1) {
      this.resetFilter();
      this.filterHandler = [];
      filter.asc = !filter.asc;
      this.filterHandler.push(filter);
      this.applyFilter();
      return;
    }
    this.filterHandler[index].asc = !this.filterHandler[index].asc;
    this.applyFilter();
  }

  resetFilter(): void {
    if (this.filterHandler.length) {
      this.filterHandler[0].asc = false;
    }
  }

  applyFilter(): void {
    const filter = this.filterHandler[0];
    if (filter.asc) {
      this.rooms = this.rooms.sort((a, b) => {
        if (a[filter.prop as keyof RoomInfo] > b[filter.prop as keyof RoomInfo]) { return 1; }
        return -1;
      });
      return;
    }
    this.rooms = this.rooms.sort((a, b) => {
      if (a[filter.prop as keyof RoomInfo] > b[filter.prop as keyof RoomInfo]) { return -1; }
      return 1;
    });
  }

  resetFilters(): void {
    this.rooms = this.rooms.sort((a: any, b: any) => a.name - b.name);
    this.filters.forEach(filter => filter.asc = false);
    this.filterHandler = [];
  }
}
