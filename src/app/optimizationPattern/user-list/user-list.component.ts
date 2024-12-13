import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, NgZone} from '@angular/core';
import {User} from "../users.service";
import { FormsModule } from '@angular/forms';


export const fibonnaci = (() => {
  const cache: { [key: number]: number } = {};
  return (n: number): number => {
    if (cache[n] !== undefined) {
      return cache[n];
    }
    if (n === 0 || n === 1) {
      return (cache[n] = 1);
    }
    return (cache[n] = fibonnaci(n - 1) + fibonnaci(n - 2));
  };
})();


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule]
})
export class UserListComponent {
  @Input() usersCluster: string = '';
  @Input() users: User[] | null = [];
  @Output() add = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}
  userFullName: string = '';
  addUser() {
    this.add.emit(this.userFullName);
    this.userFullName = '';
  }
  fibo(n: number): number {
    let fib: number = 0;
    this.ngZone.runOutsideAngular(() => {
      fib = fibonnaci(n); // Run outside Angular's zone
    });
    console.log({ n, fib });
    return fib;
  }
}