import { Injectable } from '@angular/core';
import { Todo } from "../Todo"
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];
  count: number;

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:5000/todos');
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>('http://localhost:5000/todos', {
      "title": todo.title,
      "description": todo.description,
      "active": todo.active
    });
  }

  deleteTodo(todo: Todo) {
    return this.http.delete('http://localhost:5000/todos/'+todo.sno);
  }

  toggleTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;

    return this.http.put('http://localhost:5000/todos/'+todo.sno, {
      "title": todo.title,
      "description": todo.description,
      "active": this.todos[index].active
    });
  }

  remainingTodos(): number {
    this.count = 0;
    this.todos.forEach((todo) => {
      if (todo.active == true) {
        this.count++;
      }
    })
    return this.count;
  }
}
