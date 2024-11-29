import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Cv } from "../model/cv";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent {
  @Input() cvs: Cv[] | null = [];
  @Output() cvSelected = new EventEmitter<Cv>(); // Emit selected CV to parent

  // Method to emit the selected CV
  selectCv(cv: Cv): void {
    this.cvSelected.emit(cv); // Emit the selected CV to the parent component (CvComponent)
  }
}
