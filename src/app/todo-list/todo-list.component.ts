import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import {NewItemModalComponent} from '../new-item-modal/new-item-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() list: TodoListWithItems;
  @Input() clock: number;
  public currentList: TodoListWithItems;

  constructor(private todoListService: TodoListService) {
    this.list = this.todoListService.getLists()[0];
    this.currentList = Object.assign({}, this.list);
    this.today();
  }

  ngOnInit() {
  }

  today() {
    let today = Date.now();
    this.dateFilter(new Date(), new Date());
  }

  tomorrow() {
    let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.dateFilter(tomorrow, tomorrow);
  }

  inTwoDays() {
    let inTwoDays = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);
    this.dateFilter(inTwoDays, inTwoDays);
  }

  nextWeek() {
    let today = new Date();
    let nextWeekStart = new Date(new Date().getTime() + 168 * 60 * 60 * 1000);
    this.dateFilter(today, nextWeekStart);
  }

  dateFilter(start: Date, end: Date) {
    this.currentList.items = this.list.items.filter((item) => {
      let itemDate = new Date(item.data['date']);
      return itemDate.getFullYear() >= start.getFullYear() && itemDate.getMonth() >= start.getMonth()
          && itemDate.getDate() >= start.getDate() && itemDate.getFullYear() <= end.getFullYear()
          && itemDate.getMonth() <= end.getMonth() && itemDate.getDate() <= end.getDate();
    });
  }

  // createItem(label: string) {
  //   const id = this.todoListService.SERVER_CREATE_ITEM(this.list.id, label, false, {
  //     someData: "someValue",
  //     someNumber: 42,
  //     someArray: ["riri", "fifi", "loulou"],
  //     itemColor: "#FFFFFF"
  //     // Add other data here...
  //   });
  // }

  // delete() {
  //   this.todoListService.SERVER_DELETE_LIST(this.list.id);
  // }

  // getColor(): string {
  //   return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  // }

  // setColor(color: string) {
  //   console.log("setColor", color);
  //   this.todoListService.SERVER_UPDATE_LIST_DATA(
  //     this.list.id,
  //     Object.assign({}, this.list.data, {color})
  //   );
  // }

  onAlertClick() {
  }

  onEditClick() {
    this.todoListService.setEditing(!this.todoListService.isEditing());
  }

  onDeleteClick() {
    this.todoListService.setDeleting(!this.todoListService.isDeleting());
  }

}
