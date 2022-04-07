import { Injectable } from '@angular/core';
import { Todo } from '../Todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];
  count: number;

  constructor(private http: HttpClient) {}

  public BASE_URL: string = environment.baseUrl;

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.BASE_URL + '/todos');
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.BASE_URL + '/todos', {
      title: todo.title,
      description: todo.description,
      active: todo.active,
    });
  }

  deleteTodo(todo: Todo) {
    return this.http.delete(this.BASE_URL + '/todos/' + todo.sno);
  }

  toggleTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;

    return this.http.put(this.BASE_URL + '/todos/' + todo.sno, {
      title: todo.title,
      description: todo.description,
      active: this.todos[index].active,
    });
  }

  remainingTodos(): number {
    this.count = 0;
    this.todos.forEach((todo) => {
      if (todo.active == true) {
        this.count++;
      }
    });
    return this.count;
  }
}
