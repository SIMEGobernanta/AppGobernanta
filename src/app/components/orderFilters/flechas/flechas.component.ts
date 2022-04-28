import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ArrayFiltroService} from '../../../services/array-filtro.service';

@Component({
  selector: 'app-flechas',
  templateUrl: './flechas.component.html',
  styleUrls: ['./flechas.component.css']
})
export class FlechasComponent implements OnInit {

  @Output() condition = new EventEmitter<boolean>();

  constructor(private filterArray: ArrayFiltroService) {

  }

  ngOnInit(): void {
  }

  return(condicion: boolean) {
    this.condition.emit(condicion);
  }

}

