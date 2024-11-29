import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  @Output() search = new EventEmitter<string>(); // Emits the search query

  searchControl = new FormControl(); // Reactive form control for the input

  constructor() {
    // Listen for input changes and emit the value
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms after the last input
        distinctUntilChanged() // Emit only if the value changes
      )
      .subscribe((query) => this.search.emit(query || '')); // Emit the search query
  }
}
