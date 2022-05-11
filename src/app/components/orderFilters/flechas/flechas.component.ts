import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-flechas',
  templateUrl: './flechas.component.html',
  styleUrls: ['./flechas.component.css']
})
export class FlechasComponent implements OnInit {
  @Input() isAsc!: boolean;

  constructor() {}

  ngOnInit(): void {
  }


}

