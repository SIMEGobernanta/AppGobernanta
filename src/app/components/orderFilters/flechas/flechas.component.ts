import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flechas',
  templateUrl: './flechas.component.html',
  styleUrls: ['./flechas.component.css']
})
export class FlechasComponent implements OnInit {

  @Output() condition = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
  }

  return(condicion: boolean): void {
    this.condition.emit(condicion);
  }

}

