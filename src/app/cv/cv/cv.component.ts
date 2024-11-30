import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CvService } from "../services/cv.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  activeTab: 'junior' | 'senior' = 'junior';
  searchQuery: string = ''; 
  allCvs: Cv[] = []; 
  filteredCvs: Cv[] = []; 
  selectedCv$: BehaviorSubject<Cv | null> = new BehaviorSubject<Cv | null>(null); 
  date = new Date();

  constructor(
    private cvService: CvService,
    private toastr: ToastrService
  ) {
    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.allCvs = cvs;
        this.updateFilteredCvs(); 
      },
      error: () => this.toastr.error("Erreur lors de la récupération des CVs."),
    });
  }

  changeTab(tab: 'junior' | 'senior'): void {
    this.activeTab = tab;
    this.updateFilteredCvs();
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.updateFilteredCvs();
  }

  private updateFilteredCvs(): void {
    this.filteredCvs = this.allCvs.filter((cv) => {
      const matchesTab =
        this.activeTab === 'junior' ? cv.age < 40 : cv.age >= 40;
      const matchesSearch =
        this.searchQuery === '' ||
        cv.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        cv.firstname.toLowerCase().includes(this.searchQuery.toLowerCase())||
        (cv.firstname + " " + cv.name).toLowerCase().includes(this.searchQuery.toLowerCase()); // Recherche dans le prénom + nom

        ;
      return matchesTab && matchesSearch;
    });
  }

  selectCv(cv: Cv): void {
    this.selectedCv$.next(cv); // Update the selected CV
  }
}
