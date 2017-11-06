import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NewItemModalComponent} from '../new-item-modal/new-item-modal.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() item: ItemJSON;
  @Input() listId: ListID;
  @Input() clock: number;

  constructor(private todoListService: TodoListService, private dialog: MatDialog) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
  }

  isEditing(): boolean {
    return this.todoListService.isEditing();
  }

  isDeleting(): boolean {
    return this.todoListService.isDeleting();
  }

  editItem() {
    let dialogRef = this.dialog.open(NewItemModalComponent, <MatDialogConfig>{
      data: {
        titre: this.item.data['titre'],
        lieu: this.item.data['lieu'],
        commentaire: this.item.data['commentaire'],
        date: this.item.data['date'],
        category: this.item.data['categorie']
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = {
          titre: result.titre,
          lieu: result.lieu,
          commentaire: result.commentaire,
          date: result.date,
          categorie: result.category
        };
        if (data.titre && data.date && data.categorie) {
          let list = this.todoListService.getLists()[0];
          this.todoListService.SERVER_UPDATE_ITEM_DATA(list.id, this.item.id, data);
        } else {
          console.error("Missing information");
        }
      }
    });
  }

  check(checked: boolean) {
    this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, checked);
  }

  deleteItem() {
    this.todoListService.SERVER_DELETE_ITEM(this.listId, this.item.id);
  }
}
