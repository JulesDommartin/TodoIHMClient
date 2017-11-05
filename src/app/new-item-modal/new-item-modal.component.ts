import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'new-item-modal.component',
  templateUrl: 'new-item-modal.component.html',
})
export class NewItemModalComponent {

  constructor(
    public dialogRef: MatDialogRef<NewItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
