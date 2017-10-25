import { Component, OnInit } from '@angular/core';
import {TodoListWithItems, TodoListJSON, TodoListService, ItemJSON} from "../todo-list.service";
import {List} from "immutable";
import {MatButtonModule} from '@angular/material';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists = List<TodoListJSON>();
  selectedCategory: string;
  categories: any;


  constructor(private todoListService: TodoListService) {
    this.initCategories();
    console.log(this.categories);
  }

  ngOnInit() {
  }

  getLists(): TodoListWithItems[] {
    return this.todoListService.getLists();
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
    this.todoListService.SERVER_CREATE_NEW_LIST(name);
  }

  onSettingsClick() {
    console.log("Settings click");
  }

  onAlertClick() {
    console.log("Alert click");
  }
}
