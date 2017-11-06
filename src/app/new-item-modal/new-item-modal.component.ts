import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDatepicker} from '@angular/material';
import {TodoListService} from '../todo-list.service';

@Component({
  selector: 'new-item-modal.component',
  templateUrl: 'new-item-modal.component.html',
  styleUrls: ['./new-item-modal.component.css']
})
export class NewItemModalComponent {
  selectedCategory: string;
  errorMessage: string;
  categories: any;

  constructor(
    private todoListService: TodoListService,
    public dialogRef: MatDialogRef<NewItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onValidateClick(): void {
    if (this.data.titre && this.data.date && this.data.category) {
      this.dialogRef.close(this.data);
    } else {
      this.errorMessage = "Vous devez remplir tous les champs obligatoires (*).";
    }
  }

  initCategories(): void {
    this.categories = this.todoListService.getCategories();
  }

}
