import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, 
  MatCheckboxModule, 
  MatFormFieldModule, 
  MatSelectModule, 
  MatDialogModule, 
  MatInputModule, 
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { NewItemModalComponent } from './new-item-modal/new-item-modal.component';

import { TodoListService } from "./todo-list.service";
import {HttpModule} from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';

const appRoutes: Routes = [
  {
    path: 'lists',
    // canActivate: [AuthService],
    component: ListsComponent,
    data: { /*title: ''*/ }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    ListsComponent,
    NewItemModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    RouterModule.forRoot(appRoutes, {useHash: true} )
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  entryComponents: [
    NewItemModalComponent
  ],
  providers: [TodoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
