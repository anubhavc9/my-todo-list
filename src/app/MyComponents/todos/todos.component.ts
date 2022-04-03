import { transition, trigger, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'app/services/todo.service';
import {Todo} from "../../Todo"

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style( { opacity: 1, transform: 'translateY(0px)'} ))
      ]),

      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(30px)' }),
        animate(200, style( { opacity: 0, transform: 'translateY(0px)'} ))
      ])
    ])
  ]
})
export class TodosComponent implements OnInit {
  
  addAlert: boolean = false;
  deleteAlert: boolean = false;
  
  constructor(public todoService: TodoService) { 
    this.todoService.getAllTodos().subscribe( todos => {
      this.todoService.todos = todos;
    });
  }

  ngOnInit(): void {
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe( todo => {
      this.todoService.todos.push(todo);
    })
    
    this.remainingTodos();

    // automatically disappearing alert
    this.addAlert = true;
    setTimeout(() => {
      this.addAlert = false;
    }, 2500);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe( response => {
      const index = this.todoService.todos.indexOf(todo);
      this.todoService.todos.splice(index, 1);
    })

    this.remainingTodos();

    // automatically disappearing alert
    this.deleteAlert = true;
    setTimeout(() => {
      this.deleteAlert = false;
    }, 2500);
  }

  toggleTodo(todo: Todo) {
    this.todoService.toggleTodo(todo).subscribe( response => {
      console.log(response);
    })

    this.remainingTodos();
  }

  remainingTodos() {
    return this.todoService.remainingTodos();
  }
}
