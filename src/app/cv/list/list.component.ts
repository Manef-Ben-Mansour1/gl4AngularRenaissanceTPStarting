import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cv } from '../model/cv';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() cvs: Cv[] | null = []; // Accept null or Cv array for safer handling
  @Output() cvSelected = new EventEmitter<Cv>(); // Rename the event to avoid conflicts

  onSelect(cv: Cv) {
    this.cvSelected.emit(cv); // Emit the selected CV object
  }
}
