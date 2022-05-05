import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HouseKeeping, RoomInfo } from '../../room-info';
import { MatDialog } from '@angular/material/dialog';
import { CloseDialogComponent } from './close-dialog/close-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit, OnDestroy {

  @Input() rooms!: RoomInfo[];
  subscriptions: Subscription[] = [];
  isLoading = true;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  roomStatus(status: HouseKeeping): string {
    let resul = '';
    switch (status) {
      case 'DIRTY':
        resul = 'sucia';
        break;
      case 'CLEAN':
        resul = 'limpia';
        break;
      case 'PENDING_REVIEW':
        resul = 'revisada';
        break;

    }
    return resul;
  }

  openDialog(habitacion: RoomInfo): void {
    const dialogRef = this.dialog.open(CloseDialogComponent, {
      width: '600px',
      data: habitacion
    });
  }
}


