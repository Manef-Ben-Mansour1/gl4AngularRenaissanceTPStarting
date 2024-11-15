import { Injectable, computed, inject, signal } from '@angular/core';
import { Todo, TodoStatus } from '../model/todo';
import { LoggerService } from '../../services/logger.service';

let n = 1;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private loggerService = inject(LoggerService);

  todos = signal<Todo[]>([]);

  private waiting = computed(() =>
    this.todos().filter((todo) => todo.status === 'waiting')
  );
  private inProgress = computed(() =>
    this.todos().filter((todo) => todo.status === 'in progress')
  );
  private done = computed(() =>
    this.todos().filter((todo) => todo.status === 'done')
  );

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {}

  /**
   * elle retourne la liste des todos
   *
   * @returns Todo[]
   */
  getTodos(): Todo[] {
    return this.todos();
  }

  getTodosByStatus(status: TodoStatus): Todo[] {
    return status==='waiting'?
    this.waiting():status==='in progress'?
    this.inProgress():this.done();
  }

  /**
   *Elle permet d'ajouter un todo
   *
   * @param todo: Todo
   *
   */
  addTodo(todo: Todo): void {
    this.todos.update((todos) => [...todos, todo]);
  }

  /**
   * Delete le todo s'il existe
   *
   * @param todo: Todo
   * @returns boolean
   */
  deleteTodo(todo: Todo): boolean {
    const index = this.todos().indexOf(todo);
    if (index > -1) {
      this.todos.update((todos) => todos.filter((td) => td !== todo));
      return true;
    }
    return false;
  }

  /**
   * Logger la liste des todos
   */
  logTodos() {
    this.loggerService.logger(this.todos);
  }

  changerTodoStatus(todo: Todo) {
    const nouveauStatus = todo.status === 'waiting' ? 'in progress' : 'done';
   
      this.todos.update((todos) =>
        todos.map((td) => (td === todo ? { ...td, status: nouveauStatus } : td))
      ); 
  }

}
