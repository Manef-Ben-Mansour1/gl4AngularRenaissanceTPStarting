import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent
  }
];

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)  ]
})
export class TodoModule { }
