import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { catchError, Observable, of } from "rxjs";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent {
  cvs$: Observable<Cv[]> = this.cvService.getCvs();
  filteredCvs: Cv[] = []; // Liste filtrée à afficher
  activeTab: 'junior' | 'senior' = 'junior'; // Onglet actif
  selectedCv$: Observable<Cv> = this.cvService.selectCv$;
  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService
  ) {
    // Gestion des erreurs et récupération des CVs
    this.cvs$ = this.cvService.getCvs().pipe(
      catchError(() => {
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
        return of(this.cvService.getFakeCvs());
      })
    );

    // Logger et message de bienvenue
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenu dans notre CvTech');

    // Appliquer un filtre initial pour les juniors
    this.cvs$.subscribe((cvs) => {
      this.filterCvs(cvs);
    });
  }

  // Changer l'onglet actif et appliquer un filtre
  changeTab(tab: 'junior' | 'senior'): void {
    this.activeTab = tab;
    this.cvs$.subscribe((cvs) => {
      this.filterCvs(cvs);
    });
  }

  // Appliquer le filtre en fonction de l'onglet actif
  filterCvs(cvs: Cv[]): void {
    if (this.activeTab === 'junior') {
      this.filteredCvs = cvs.filter((cv) => cv.age < 40);
    } else {
      this.filteredCvs = cvs.filter((cv) => cv.age >= 40);
    }
  }
}
