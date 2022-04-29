import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-flechas',
  templateUrl: './flechas.component.html',
  styleUrls: ['./flechas.component.css']
})
export class FlechasComponent implements OnInit {
  @Input() isAsc!: boolean;
  /*@Output() condition = new EventEmitter<boolean>();*/

  constructor() {}

  ngOnInit(): void {
  }

  /*return(condicion: boolean): void {
    this.condition.emit(condicion);
  }*/

}

