import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { Observable, of } from "rxjs";
import { CvService } from "../services/cv.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  activeTab: 'junior' | 'senior' = 'junior'; // Current tab
  searchQuery: string = ''; // Current search query
  allCvs: Cv[] = []; // All CVs fetched from the service
  filteredCvs: Cv[] = []; // CVs filtered by search and tab
  selectedCv$: Observable<Cv> = new Observable<Cv>(); // Observable for selected CV
  date = new Date();
  constructor(
    private cvService: CvService,
    private toastr: ToastrService
  ) {
    // Fetch all CVs on initialization
    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.allCvs = cvs;
        this.updateFilteredCvs(); // Apply initial filters
      },
      error: () => this.toastr.error("Erreur lors de la récupération des CVs."),
    });
  }

  // Change the active tab and update the filtered CVs
  changeTab(tab: 'junior' | 'senior'): void {
    this.activeTab = tab;
    this.updateFilteredCvs();
  }

  // Update the search query and filtered CVs
  onSearch(query: string): void {
    this.searchQuery = query;
    this.updateFilteredCvs();
  }

  // Apply filtering based on the active tab and search query
  private updateFilteredCvs(): void {
    this.filteredCvs = this.allCvs.filter((cv) => {
      const matchesTab =
        this.activeTab === 'junior' ? cv.age < 40 : cv.age >= 40;
      const matchesSearch =
        this.searchQuery === '' ||
        cv.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        cv.firstname.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }

  // Set the selected CV (you can call this method when a user selects a CV)
  selectCv(cv: Cv): void {
    this.selectedCv$ = of(cv); // Emit the selected CV
  }
}
