import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArrayFiltroService } from 'src/app/servicios/array-filtro.service';

@Component({
  selector: 'app-flechas',
  templateUrl: './flechas.component.html',
  styleUrls: ['./flechas.component.css']
})
export class FlechasComponent implements OnInit {

  @Output() condition = new EventEmitter<boolean>();

  constructor(private filtroArray:ArrayFiltroService) {

  }

  ngOnInit(): void {
  }

  return(condicion:boolean) {
    this.condition.emit(condicion);
  }

}

