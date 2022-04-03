import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from 'app/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  // declaring the variables used in the ngModel directive of the form attribute of the add-todo.component.html file
  title:string;
  desc:string;

  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter(); // will be handled in todos.components.ts
  @ViewChild('form') todoForm: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    const todo = {
      sno: 8,
      title: this.title, // title & desc values are coming from the form input in the "add-toodo.component.html" file
      description: this.desc,
      active: true
    }
    // need to emit the event from here as we don't have access to the "todos" array
    this.todoAdd.emit(todo);
    // clear input fields after adding a todo
    this.title = '';
    this.desc = '';
  }
}
