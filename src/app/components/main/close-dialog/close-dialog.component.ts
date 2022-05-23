import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomInfo } from 'src/app/room-info';


@Component({
  selector: 'app-close-dialog',
  templateUrl: './close-dialog.component.html',
  styleUrls: ['./close-dialog.component.css']
})
export class CloseDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CloseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomInfo
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
