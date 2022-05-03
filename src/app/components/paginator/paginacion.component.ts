import { Component, OnInit, Input } from '@angular/core';
import { RoomInfo } from 'src/app/room-info';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {
  @Input() rooms!: RoomInfo[];

  constructor() { }

  ngOnInit(): void {
  }

}
