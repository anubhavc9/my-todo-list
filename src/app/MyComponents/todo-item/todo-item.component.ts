import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'app/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  // accepting two parameters that are passed from todos.component.html
  @Input() todo: Todo;
  @Input() i: number;

  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCheckbox: EventEmitter<Todo> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  // handling the click event from todo-item-componenet.html
  onClick(todo: Todo) {
    // to delete a particular todo, we need to manipulate the "todos" array. But we don't have the "todos" array here, so we need to emit an event
    this.todoDelete.emit(todo);
    console.log('onClick has been triggered');
  }

  onCheckboxClick(todo) {
    // we want to manipualte the todos array (add strike class), so we need to emit an event as we don't have the array here
    this.todoCheckbox.emit(todo); // listen for this event in todos.component/html
  }
}
