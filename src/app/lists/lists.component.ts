import { Component, OnInit } from '@angular/core';
import {TodoListWithItems, TodoListJSON, TodoListService, ItemJSON} from "../todo-list.service";
import {List} from "immutable";
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NewItemModalComponent} from '../new-item-modal/new-item-modal.component';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists = List<TodoListJSON>();
  selectedCategory: string;
  categories: any;


  constructor(private todoListService: TodoListService, private dialog: MatDialog) {
    this.initCategories();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(NewItemModalComponent, <MatDialogConfig>{
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initList();
      let data = {
        titre: result.titre,
        lieu: result.lieu,
        commentaire: result.commentaire
      };
      let list = this.todoListService.getLists()[0];
      this.todoListService.SERVER_CREATE_ITEM(list.id, result.titre, false, data);
    });
  }

  ngOnInit() {
  }

  getLists(): TodoListWithItems[] {
    return this.todoListService.getLists();
  }

  initList() {
    if (this.todoListService.getLists().length == 0) {
      this.createList("Main List");
    }
  }

  initCategories() {
    this.categories = [
      {
        name: "Rendez-vous",
        value: "RDV"
      },
      {
        name: "Évènement",
        value: "Event"
      },
      {
        name: "Appel",
        value: "Call"
      }
    ];
  }

  createList(name: string) {
    const localListID = this.todoListService.SERVER_CREATE_NEW_LIST(name, {
      color: "#FF0000",
      someOtherAttribute: "pourquoi pas un texte ?"
      // Add other data here...
    });
  }

  onSettingsClick() {
    console.log("Settings click");
  }

  onAlertClick() {
    console.log("Alert click");
  }
}
