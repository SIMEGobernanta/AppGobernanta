import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomInfo } from 'src/app/room-info';
import { ArrayFiltroService } from 'src/app/services/array-filtro.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() rooms!: RoomInfo[];
  @ViewChild('input') input!: ElementRef;
  isLoading = true;
  subscriptions: Subscription[] = [];
  aux!: RoomInfo[];


  constructor(private arrayFiltro: ArrayFiltroService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.aux = JSON.parse(JSON.stringify(this.rooms));
    this.subscriptions.push(this.arrayFiltro.sendArray.subscribe((resp:RoomInfo[]) => {
        this.aux = resp;
      })
    );
    this.subscriptions.push(
      this.arrayFiltro.inputValue.subscribe((resp:any) => {
        this.resetArray();
      })
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  //Simple search filter
  search(value: string): void {
    if (value) {
      this.rooms = this.aux.filter(room => room.name.includes(value));
      this.arrayFiltro.sendAux.emit(this.rooms);
      return;
    }
    this.resetArray();
  }

  //Emit full array in case value = '';
  resetArray(): void {
    this.input.nativeElement.value = '';
    this.rooms = this.aux;
    this.arrayFiltro.sendAux.emit(this.aux);
  }
}
